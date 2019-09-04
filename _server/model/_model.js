const DB = require('./_DB.js');
const {} = require('../../_config/db-config');


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
    var meta_key = k.toLowerCase();
    if (typeof field[meta_key] !== "undefined") {
      select += `, ${selectMetaAs(table, "main.ID", k, meta_key)}`;
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


module.exports = {
  get: ({
    isSingle,
    table,
    param,
    field,
  }) => {

    var sql = sqlGet({
      table: table,
      param: param,
      field: field
    });


    return DB.query(sql).then(function (res) {
      for (var i in res) {
        // var company_id = res[i]["ID"];
        // //Add recruiters ***********************************
        // if (typeof field["recruiters"] !== "undefined") {
        //   res[i]["recruiters"] = UserModel.recruiters(company_id, field["recruiters"]);
        // }
      }

      if (isSingle) {
        return res[0];
      } else {
        return res;
      }
    });
  }
};
