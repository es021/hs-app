var Mysql = require("promise-mysql");
const {
  User,
  Company
} = require('../../_config/db-config');
const {
  Secret
} = require('../secret/secret.js');

var DB = function (env) {
  var config = {};
  if (env === "DEV") {
    config = {
      connectionLimit: 100,
      host: Secret.DB_HOST,
      user: Secret.DB_USER,
      password: Secret.DB_PASS_DEV,
      database: Secret.DB_DATABASE
    };
  } else if (env === "PROD") {
    config = {
      connectionLimit: 100,
      host: Secret.DB_HOST,
      user: Secret.DB_USER,
      password: Secret.DB_PASS_PROD,
      database: Secret.DB_DATABASE
    };
  }

  this.con = Mysql.createPool(config);

  //   this.con.connect(function (err) {
  //     if (err) {
  //       throw err;
  //     } else {
  //       console.log("DB Connected");
  //     }
  //   });

};

/**** CF *******/
DB.prototype.cfMapSelect = function (entity, entity_id, cf) {
  var cf_where = (typeof cf === "undefined") ? "1=1" : `cf= '${cf}'`;
  return `SELECT cf from cf_map where entity = '${entity}' and entity_id = ${entity_id} and ${cf_where}`;
};

DB.prototype.getCF = function (entity, entity_id) {
  var sql = this.cfMapSelect(entity, entity_id);
  return this.query(sql).then(function (res) {
    var toRet = res.map((d, i) => d.cf);
    return toRet;
  });
};

DB.prototype.updateCF = function (entity, entity_id, cf, isDelete = true) {
  //console.log("updateCF");
  var insertAction = () => {
    var ins = `INSERT INTO cf_map (entity, entity_id, cf) VALUES `;
    // make cf to array
    if (typeof cf == "string") {
      cf = [cf];
    }

    cf.map((_cf, i) => {
      if (i > 0) {
        ins += ",";
      }
      ins += `('${entity}', ${entity_id} ,'${_cf}') `;
    });

    return this.query(ins).then((res) => res);
  }

  if (isDelete) {
    var del = `DELETE from cf_map where entity = '${entity}' and entity_id = ${entity_id}`;
    return this.query(del).then((res) => {
      insertAction();
    });
  } else {
    return insertAction();
  }
};
/**** CF *******/

DB.prototype.query = function (query) {
  return this.con.query(query);
};

DB.prototype.escStr = function (str) {
  if (typeof str !== "string") {
    return str;
  }

  return str.replace(
    /[\0\x08\x09\x1a\n\r"'\\\%]/g,
    function (char) {
      switch (char) {
        case "\0":
          return "\\0";
        case "\x08":
          return "\\b";
        case "\x09":
          return "\\t";
        case "\x1a":
          return "\\z";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "\"":
        case "'":
        case "\\":
          return "\\" + char; // prepends a backslash to backslash, percent,
          // and double/single quotes
        case "%":
          return "%";
      }
    });
};

DB.prototype.getByID = function (table, ID, ID_key = "ID") {
  var sql = `select * from ${table} where ${ID_key} = '${ID}'`;

  return this.query(sql).then(function (res) {
    return res[0];
  });
};

DB.prototype.insert = function (table, data, ID_key = "ID", onDuplicate = null) {
  var DB = this;
  var key = "(";
  var val = "(";
  for (var k in data) {
    key += `${k},`;
    val += `'${this.escStr(data[k])}',`;
  }
  key = key.substring(-1, key.length - 1) + ')';
  val = val.substring(-1, val.length - 1) + ')';

  var sql = `INSERT INTO ${table} ${key} VALUES ${val}`;
  if (onDuplicate !== null) {
    sql += ` ON DUPLICATE KEY UPDATE ${onDuplicate}`;
  }

  return this.query(sql).then(function (res) {
    var insertId = (ID_key == "ID") ? res.insertId : data[ID_key];
    return DB.getByID(table, insertId, ID_key);
  });
};

DB.prototype.update = function (table, data, ID_key = "ID") {
  var DB = this;
  var ID = data[ID_key];

  if (typeof data.cf !== "undefined") {
    var cf = data.cf;
    var isDeleteCf = true;
    var entity = null;
    // trigger from manage-company
    //console.log("DB UPDATE", table);
    //console.log("data.skip_delete_cf", data.skip_delete_cf);
    //console.log(data);
    switch (table) {
      case Company.TABLE:
        entity = "company";
        break;
      case User.TABLE:
        entity = "user";
        // during login jgn delete yang lama pliss
        if (data.skip_delete_cf == true) {
          isDeleteCf = false;
        }
        break;
    }

    if (entity !== null) {
      delete(data["cf"]);

      //only ID left, then return
      if (Object.keys(data).length == 1) {
        return this.updateCF(entity, ID, cf, isDeleteCf);
      } else {
        this.updateCF(entity, ID, cf, isDeleteCf);
      }

    }
  }


  if (ID === null || ID == "" || typeof ID === "undefined" || ID <= 0) {
    return;
  }

  var key_val = "";

  for (var k in data) {
    if (k !== ID_key) {
      key_val += `${k} = '${this.escStr(data[k])}',`;
    }
  }

  key_val = key_val.substring(-1, key_val.length - 1);

  if (key_val == "") {
    return false;
  }

  var sql = `UPDATE ${table} SET ${key_val} WHERE ${ID_key} = '${ID}'`;
  //console.log(sql);
  return this.query(sql).then(function (res) {
    return DB.getByID(table, ID, ID_key);
  });
};

// only works with table with primary key of is ID
// return affected rows
DB.prototype.delete = function (table, ID, ID_key = "ID") {
  if (ID === null || ID == "" || typeof ID === "undefined" || ID <= 0) {
    return;
  }

  var sql = `DELETE FROM ${table} WHERE ${ID_key} = '${ID}'`;
  //console.log(sql);

  return this.query(sql).then(function (res) {
    //console.log("finish delete", res);
    return res.affectedRows;
  });
};

DB.prototype.prepareLimit = function (page, offset) {
  var start = (page - 1) * offset;
  var limit = (typeof page !== "undefined" && typeof offset !== "undefined") ?
    `LIMIT ${start},${offset}` : "";
  return limit;
};

if (process.env.NODE_ENV === "production") {
  module.exports = new DB("PROD");
} else {
  module.exports = new DB("DEV");
}

// [a] | a ==> ('a','b')
DB.prototype.prepareInQuery = function (params) {
  if (typeof params === "string") {
    params = [params];
  }

  var q = "(";
  params.map((d, i) => {
    q += ` '${d}' `;
    if (i < params.length - 1) {
      q += ", ";
    }
  });

  q += " )";

  return q;
}

//_helper function


//function dbSuccessHandler(res) {
//    console.log(res[0]);
//    console.log();
//
//    for (var i in res) {
//
//    }
//    return res[0];
//}
//
//function dbErrorHandler(err) {
//    console.log(err);
//    return err;
//
//}



//DB.prototype.query = function (sql, success, error) {
//    this.query(sql, function (err, res) {
//        if (err) {
//            error(err);
//        } else {
//            console.log(res);
//            success(res);
//        }
//    });
//};
