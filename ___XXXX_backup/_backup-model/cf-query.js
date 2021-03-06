const DB = require('./DB.js');
const {
    CFS,
    CFSMeta
} = require('../../_config/db-config');

class CFQuery {
    getCfInList(field, entity, cf) {
        if (typeof cf === "undefined") {
            return "1=1";
        }

        // user or company
        if (typeof entity === "undefined") {
            return "1=1";
        }

        let toRet = `'${cf}' IN (select ms.cf from cf_map ms 
            where ms.entity = '${entity}'
            and ms.entity_id = ${field})`;

        return toRet;
    }
    getCF(params, field) {
        var order_by = "ORDER BY cf_order desc";
        var is_active = (typeof params.is_active === "undefined") ? "1=1" : `is_active = '${params.is_active}'`;
        var is_load = (typeof params.is_load === "undefined") ? "1=1" : `is_load = '${params.is_load}'`;

        let selMeta = "";
        for (var i in CFSMeta) {
            let col = CFSMeta[i];

            if (typeof field[col] !== "undefined") {
                selMeta += ` , (SELECT m.meta_value FROM ${CFSMeta.TABLE} m WHERE m.cf_name = c.name AND m.meta_key = '${col}') as ${col} `;
            }
        }

        return `select c.* ${selMeta} from ${CFS.TABLE} c
            where ${is_active} AND ${is_load} ${order_by}`;

        // var id_where = (typeof params.ID === "undefined") ? "1=1" : `ID = "${params.ID}"`;
        // var can_login_where = (typeof params.can_login === "undefined") ? "1=1" : `can_login = '${params.can_login}'`;
        // var can_register_where = (typeof params.can_register === "undefined") ? "1=1" : `can_register = '${params.can_register}'`;

        // return `select * from ${CFS.TABLE} where ${id_where} and ${can_login_where} and ${can_register_where} ${order_by}`;
    }
}

CFQuery = new CFQuery();

class CFExec {
    cfs(params, field, extra = {}) {
        var sql = CFQuery.getCF(params, field);
        //console.log(sql);
        var toRet = DB.query(sql).then(function (res) {
            if (extra.single && res !== null) {
                return res[0];
            } else {
                return res;
            }

        });
        return toRet;
    }
}

CFExec = new CFExec();

module.exports = {
    CFQuery,
    CFExec
};