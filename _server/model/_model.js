const DB = require('./_DB.js');
const DC = require('../../_config/db-config');


function isMetaKeyValid(key) {
  let mainCols = ["ID", "slug", "created_at", "updated_at"];
  if (mainCols.indexOf(key) >= 0) {
    return false;
  }

  return true;
}

function selectMeta(table, _id, _key) {
  return `select meta._value from ${table}_meta meta where meta._id = ${_id} and meta._key = '${_key}'`;
}

function selectMetaAs(table, _id, _key, _as) {
  _as = (typeof _as === "undefined") ? _key : _as;
  return `(${selectMeta(table, _id, _key)}) as ${_as}`;
}

function sqlGet({
  table,
  param,
  field
}) {

  // console.log("sqlGet");
  // console.log("table", table);
  // console.log("param", param);
  // console.log("field", field);

  var where = "";
  for (var k in param) {
    if (k == "ID" || k == "slug") {
      where += ` AND main.${k} = '${param[k]}' `;
    } else {
      where += ` AND (${selectMeta(table, "main.ID", k)}) = '${param[k]}'  `;
    }
  }

  var order_by = (typeof param.order_by !== "undefined") ? `order by main.${param.order_by}` : ``;
  var limit = DB.prepareLimit(param.page, param.offset);

  var select = "main.*";
  for (var k in field) {
    var as = k.toLowerCase();
    if (typeof field[as] !== "undefined") {
      if (isMetaKeyValid(k)) {
        select += `, ${selectMetaAs(table, "main.ID", k, as)}`;
      }
    }
  }

  // ${getSearchQuery(params)}
  // console.log("select", select);
  // console.log("where", where);

  var sql = `SELECT ${select}
           FROM ${table} main 
           WHERE 1=1 ${where}
           ${order_by} ${limit} `;

  console.log("sql", sql);

  return sql;
}



const Entities = DC.Entities;

function addEntityId(field) {
  for (var k in Entities) {
    let id = Entities[k].id;
    if (typeof field[k] !== "undefined") {
      field[id] = "1";
    }
  }
  return field;
}

function addForeignEntity(res, field) {
  for (var k in Entities) {
    let id = Entities[k].id;
    let table = Entities[k].table;
    let isSingle = Entities[k].isSingle;
    if (typeof field[k] !== "undefined" && res[id] != null) {
      res[k] = get({
        isSingle: isSingle,
        table: table,
        param: {
          ID: res[id]
        },
        field: field[k]
      });
    }
    return res;
  }
}


// ################################################################
// TO EXPORT

const get = ({
  isSingle,
  table,
  param,
  field,
}) => {

  field = addEntityId(field);

  var sql = sqlGet({
    table: table,
    param: param,
    field: field
  });

  return DB.query(sql).then(function (res) {
    for (var i in res) {
      res[i] = addForeignEntity(res[i], field);
    }

    if (isSingle) {
      return res[0];
    } else {
      return res;
    }
  });
};

module.exports = {
  get
}
