const DB = require('./DB.js');
const {
    Notifications,
    NotificationsEnum
} = require('../../_config/db-config');

class NotificationExec {
    getQuery(params) {
        var id_where = (typeof params.ID === "undefined") ? "1=1" : `${Notifications.ID} = ${params.ID}`;
        var user_id_where = (typeof params.user_id === "undefined") ? "1=1" : `${Notifications.USER_ID} = ${params.user_id}`;
        var is_read_where = (typeof params.is_read === "undefined") ? "1=1" : `${Notifications.IS_READ} = '${params.is_read}'`;
        var cf_where = (typeof params.cf === "undefined") ? "1=1" : `${Notifications.CF} = '${params.cf}'`;
        var order_by = "ORDER BY " + ((typeof params.order_by === "undefined") ? `${Notifications.CREATED_AT} desc` : `${params.order_by}`);
        var limit = DB.prepareLimit(params.page, params.offset);


        let sqlBody = ` from ${Notifications.TABLE} 
            where ${id_where} 
            and ${user_id_where} 
            and ${cf_where} 
            and ${is_read_where} `;

        if(params.ttl == "1"){
            return `select count(*) as ttl ${sqlBody}`;
        }

        return `select * ${sqlBody} ${order_by} ${limit}`;
    }

    notifications(params, field, extra = {}) {
        const {
            UserExec
        } = require('./user-query.js');
        const {
            CompanyExec
        } = require('./company-query.js');

        var sql = this.getQuery(params);
        //console.log(sql)
        var toRet = DB.query(sql).then(function (res) {

            for (var i in res) {

                if (typeof field["img_obj"] !== "undefined") {
                    let img_entity = res[i]["img_entity"];
                    let img_id = res[i]["img_id"]

                    let param = {
                        ID: img_id
                    }
                    let imgObj = {};
                    if (img_entity == NotificationsEnum.IMG_ENTITY_USER) {
                        imgObj = UserExec.user(param, field["img_obj"]);

                    } else if (img_entity == NotificationsEnum.IMG_ENTITY_COMPANY) {
                        imgObj = CompanyExec.company(param, field["img_obj"]);
                    }
                    res[i]["img_obj"] = imgObj;
                }

            }

            if (extra.single) {
                return res[0];
            }

            return res;

        });
        return toRet;
    }
}

NotificationExec = new NotificationExec();

module.exports = {
    NotificationExec
};