const DB = require('./_DB.js');
const {
  Queue,
  Company,
  CompanyEnum,
  QueueEnum,
  Session,
  SessionEnum,
  Prescreen,
  SessionRequest,
  SessionRequestEnum,
  PrescreenEnum,
  Vacancy
} = require('../../_config/db-config');


function getSearchName(field, search_params) {
  return `(select com.name from ${Company.TABLE} com where com.ID = field) like '%${search_params}%'`;
}

function getCompany(params, field) {
  var type_where = (typeof params.type === "undefined") ? "1=1" :
    `c.${Company.TYPE} LIKE '%${params.type}%'`;

  var id_where = (typeof params.ID === "undefined") ? "1=1" :
    `c.${Company.ID} = '${params.ID}'`;

  var cf_where = (typeof params.cf === "undefined") ? "1=1" :
    `(${DB.cfMapSelect("company", "c.ID", params.cf)}) = '${params.cf}'`;

  var ps_where = (typeof params.accept_prescreen === "undefined") ? "1=1" :
    `c.${Company.ACCEPT_PRESCREEN} = '${params.accept_prescreen}'`;

  var include_sponsor = "c.sponsor_only = 0";
  if ((typeof params.ID === "undefined")) {
    if (typeof params.include_sponsor !== "undefined") {
      include_sponsor = "1=1";
    }
  } else {
    include_sponsor = "1=1";
  }

  var ignore_type = (typeof params.ignore_type === "undefined") ? "1=1" : `c.type NOT IN ${params.ignore_type}`;

  var order_by = (typeof params.order_by === "undefined") ?
    `order by c.${Company.SPONSOR_ONLY} desc, c.${Company.TYPE} asc` :
    `order by ${params.order_by}`;

  var sql = `select c.*, c.img_position as img_pos from ${Company.TABLE} c where 1=1 
            and ${ignore_type} and ${id_where} 
            and ${include_sponsor} and ${type_where} 
            and ${cf_where} and ${ps_where}
            ${order_by}`;

  //console.log(sql);
  return sql;
}



function getCompanyHelper(type, params, field) {
  const UserModel = require('./user-model.js');

  var isSingle = (type === "single");
  var sql = getCompany(params, field);

  return DB.query(sql).then(function (res) {

    for (var i in res) {

      var company_id = res[i]["ID"];
      //Add recruiters ***********************************
      if (typeof field["recruiters"] !== "undefined") {
        res[i]["recruiters"] = UserModel.recruiters(company_id, field["recruiters"]);
      }
    }

    if (isSingle) {
      return res[0];
    } else {
      return res;
    }
  });
}


module.exports = {
  company: (id, field) => {
    let param = {};
    if (typeof id === "object" && id != null) {
      param = id;
    } else {
      param = {
        ID: id
      }
    }
    return getCompanyHelper("single", param, field);
  },
  companies: (arg, field) => {
    return getCompanyHelper(false, arg, field);
  }
};
