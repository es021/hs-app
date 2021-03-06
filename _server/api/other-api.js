const { getAxiosGraphQLQuery } = require('../../_helper/api-helper');
const axios = require('axios');
const obj2arg = require('graphql-obj2arg');

class MetaAPI {
    add(key, value, source) {
        var query = `mutation{add_meta(meta_key:"${key}",meta_value:"${value}",source:"${source}"){ ID }}`;
        return getAxiosGraphQLQuery(query).then((res) => {
            return res.data.data.add_meta;
        }, (err) => {
            return err;
        });
    }
}
MetaAPI = new MetaAPI();

class CfsApi {
    getAllCf(){
        var query = `query{ cfs(is_active :1) { ID name country time }}`;
        return getAxiosGraphQLQuery(query).then((res) => {
            return res.data.data.cfs;
        }, (err) => {
            return err;
        });
    } 
}
CfsApi = new CfsApi();

class LogApi {
    add(event, data = null, user_id = null) {
        var param = { event: event };
        if (data != null) {
            param["data"] = "" + data;
        }
        if (user_id != null) {
            param["user_id"] = user_id;
        }

        var query = `mutation{add_log(${obj2arg(param, { noOuterBraces: true })}){ ID }}`;
        return getAxiosGraphQLQuery(query).then((res) => {
            return res.data.data.add_log;
        }, (err) => {
            return err;
        });
    }
}
LogApi = new LogApi();

module.exports = { MetaAPI, LogApi, CfsApi };
