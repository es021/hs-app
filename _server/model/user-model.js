const DB = require('./_DB.js');
const DbConfig = require('../../_config/db-config.js');
// const {
//   RequiredFieldStudent
// } = require('../../_config/registration-config.js');

// ##################################################################################
// ##################################################################################

function getSearchMeta(field, search_params, meta_key) {
  if (typeof search_params !== "undefined") {
    return `(${selectMetaMain(field, meta_key)}) like '%${search_params}%'`;
  } else {
    return "1=1";
  }
}

function getSearchWorkAvailability(field, av_month, av_year) {
  if (typeof av_month === "undefined" || typeof av_year === "undefined") {
    return "1=1";
  }

  return `CONCAT((${selectMetaMain(field, DbConfig.UserMeta.AVAILABLE_YEAR)}),
                (${selectMetaMain(field, DbConfig.UserMeta.AVAILABLE_MONTH)}))
                <= '${av_year}${av_month}'`;
}

function getSearchLookingFor(field, search_params) {
  return getSearchMeta(field, search_params, DbConfig.UserMeta.LOOKING_FOR);
}

function getSearchUniversity(field, search_params) {
  return getSearchMeta(field, search_params, DbConfig.UserMeta.UNIVERSITY);
}

function getSearchMajor(field, search_params) {
  return getSearchMeta(field, search_params, DbConfig.UserMeta.MAJOR);
}

function getSearchStudyPlace(field, search_params) {
  return getSearchMeta(field, search_params, DbConfig.UserMeta.STUDY_PLACE);
}

function getSearchMinor(field, search_params) {
  return getSearchMeta(field, search_params, DbConfig.UserMeta.MINOR);
}

function getSearchName(field, search_params) {
  return `CONCAT((${selectMetaMain(field, DbConfig.UserMeta.FIRST_NAME)}),
                (${selectMetaMain(field, DbConfig.UserMeta.LAST_NAME)}))
                like '%${search_params}%'`;
}

function getSearchEmail(field, search_params) {
  return `(${selectUserField(field, DbConfig.User.EMAIL)}) like '%${search_params}%'`;
}

function getSearchNameOrEmail(field, search_name, search_email) {
  var name = (typeof search_name === "undefined") ? "" : getSearchName(field, search_name);
  var email = (typeof search_email === "undefined") ? "" : getSearchEmail(field, search_email);
  if (name == "" && email == "") {
    return `1=1`;
  } else if (name == "" && email != "") {
    return email;
  } else if (name != "" && email == "") {
    return name;
  } else {
    return `(${name} or ${email})`
  }
}

function getSearchQuery(params) {
  var query = "";

  // external search query ------------------------------------------
  // both is injected
  var name = (typeof params.search_user === "undefined") ? "" :
    `CONCAT((${selectMetaMain("u.ID", DbConfig.UserMeta.FIRST_NAME)}),' ',
            (${selectMetaMain("u.ID", DbConfig.UserMeta.LAST_NAME)}))
            like '%${params.search_user}%'`;

  var email = (typeof params.search_user === "undefined") ? "" :
    `u.${DbConfig.User.EMAIL} like '%${params.search_user}%'`;

  if (name != "" && email != "") {
    query += `and (${name} or ${email})`;
  }

  // has feedback?
  if (typeof params.has_feedback !== "undefined" && params.has_feedback) {
    var feedbackMeta = `(${selectMetaMain("u.ID", DbConfig.UserMeta.FEEDBACK)})`;
    query += `and (${feedbackMeta} != '' AND ${feedbackMeta} IS NOT NULL)`;
  }

  // search degree
  query += (typeof params.search_degree === "undefined") ? "" :
    ` and CONCAT((${selectMetaMain("u.ID", DbConfig.UserMeta.MAJOR)}),
            (${selectMetaMain("u.ID", DbConfig.UserMeta.MINOR)}))
            like '%${params.search_degree}%'`;

  // search university
  query += (typeof params.search_university === "undefined") ? "" :
    ` and (${selectMetaMain("u.ID", DbConfig.UserMeta.UNIVERSITY)}) like '%${params.search_university}%'`;

  return query;
}


function selectRole(user_id, meta_key, as) {
  return `(select SUBSTRING_INDEX(SUBSTRING_INDEX((${selectMetaMain(user_id, meta_key)}),'\"',2),'\"',-1)) as ${as}`;
}

function selectUserField(user_id, field) {
  return `select u.${field} from wp_cf_users u where u.ID = ${user_id}`;
}

function selectMetaMain(user_id, meta_key) {
  return `select m.meta_value from wp_cf_usermeta m where m.user_id = ${user_id} and m.meta_key = '${meta_key}'`;
}

function selectMeta(user_id, meta_key, as) {
  as = (typeof as === "undefined") ? meta_key : as;

  if (meta_key === DbConfig.UserMeta.ROLE) {
    return selectRole(user_id, meta_key, as);
  }

  return `(${selectMetaMain(user_id, meta_key)}) as ${as}`;
}

function getUser(field, params, meta_cons) {
  //console.log(params);
  // create basic conditions
  var id_condition = (typeof params.ID !== "undefined") ? `u.ID = ${params.ID}` : `1=1`;
  var email_condition = (typeof params.user_email !== "undefined") ? `u.user_email = '${params.user_email}'` : `1=1`;
  var role_condition = (typeof params.role !== "undefined") ? `(${selectMetaMain("u.ID", DbConfig.UserMeta.ROLE)}) LIKE '%${params.role}%' ` : `1=1`;
  var order_by = (typeof params.order_by !== "undefined") ? `order by u.${params.order_by}` : `order by u.${DbConfig.User.ID} desc`;

  var cf_where = (typeof params.cf === "undefined") ? "1=1" :
    `(${DB.cfMapSelect("user", "u.ID", params.cf)}) = '${params.cf}'`;

  var new_only_where = (typeof params.new_only === "undefined" || !params.new_only) ? "1=1" :
    `u.user_email not like '%test.%'`;

  // add meta condition
  var meta_condition = " 1=1 ";
  var i = 0;
  if (typeof meta_cons !== "undefined") {
    meta_condition = "";
    for (var key in meta_cons) {
      if (i > 0) {
        meta_condition += " AND ";
      }
      meta_condition += `(${selectMetaMain("u.ID", key)}) = '${meta_cons[key]}' `;
      i++;
    }
  }

  // set limit 
  var limit = DB.prepareLimit(params.page, params.offset);

  // create meta selection
  var meta_sel = "";
  for (var k in DbConfig.UserMeta) {
    var meta_key = k.toLowerCase();
    if (typeof field[meta_key] !== "undefined") {
      meta_sel += `, ${selectMeta("u.ID", DbConfig.UserMeta[k], meta_key)}`;
    }
  }

  var sql = `SELECT u.* ${meta_sel}
           FROM wp_cf_users u WHERE 1=1 ${getSearchQuery(params)}
           AND ${id_condition} AND ${meta_condition} 
           AND ${email_condition} AND ${role_condition} 
           AND ${cf_where} AND ${new_only_where}
           ${order_by} ${limit} `;

  return sql;
}


function getUserHelper(type, params, field, metaCons) {
  const CompanyModel = require('./company-model.js');

  // extra field that need role value to find
  if (field["sessions"] !== "undefined" ||
    field["queues"] !== "undefined" ||
    field["prescreens"] !== "undefined" ||
    field["registered_prescreens"] !== "undefined") {
    field["role"] = 1;
    field["rec_company"] = 1;
  }

  if (field["is_active"] !== "undefined") {
    field["user_status"] = 1;
  }

  // if (field["is_profile_completed"] !== "undefined") {
  //   for (var i in RequiredFieldStudent) {
  //     field[RequiredFieldStudent[i]] = 1;
  //   }
  // }

  var isSingle = (type === "single");
  var sql = "";
  if (isSingle) {
    sql = getUser(field, params, metaCons);
  } else {
    sql = getUser(field, params, metaCons);
  }

  var toRet = DB.query(sql).then(function (res) {
    for (var i in res) {

      var user_id = res[i]["ID"];
      var company_id = res[i]["rec_company"];
      var role = res[i]["role"];
      var user_status = res[i]["user_status"];

      // company ****************************************************
      if (typeof field["company"] !== "undefined") {
        res[i]["company"] = CompanyModel.company(company_id, field["company"]);
      }

    }

    if (type === "single") {
      return res[0];
    } else {
      return res;
    }

  });

  return toRet;
}

function updateUserMeta(user_id, data) {
  var meta_key_in = "";
  var meta_pair_case = "";

  //to check not exist user meta
  var meta_key = [];

  for (var k in data) {
    meta_key.push(k);
    meta_key_in += `'${k}',`;
    meta_pair_case += ` WHEN '${k}' THEN '${DB.escStr(data[k])}' `;
  }

  var where = `WHERE meta_key IN (${meta_key_in.slice(0, -1)}) and user_id = '${user_id}'`;

  var check_sql = `SELECT * FROM wp_cf_usermeta ${where}`;

  var update_sql = `UPDATE wp_cf_usermeta
          SET meta_value = CASE meta_key 
          ${meta_pair_case} 
          END ${where}`;

  //check what does not exist
  return DB.query(check_sql).then((res) => {

    var key_check = res.map((d, i) => d["meta_key"]);

    //insert what does not exist
    var insert_val = "";
    meta_key.map((d, i) => {
      if (key_check.indexOf(d) <= -1) {
        insert_val += `('${user_id}','${d}','${DB.escStr(data[d])}'),`;
      }
    });

    if (insert_val !== "") {
      var insert_sql = `INSERT INTO wp_cf_usermeta (user_id,meta_key,meta_value) VALUES ${insert_val.slice(0, -1)}`;

      return DB.query(insert_sql).then((res) => {
        //only then update what's left
        return DB.query(update_sql);
      });
    }
    // if not need to insert just update
    else {
      return DB.query(update_sql);
    }
  });
}


// ##############################################################################################
// ##############################################################################################

module.exports = {
  user: (params, field) => {
    return getUserHelper("single", params, field);
  },
  users: (params, field) => {
    return getUserHelper(false, params, field);
  },
  recruiters: (company_id, field) => {
    var metaCons = {};
    metaCons[DbConfig.UserMeta.REC_COMPANY] = company_id;
    return getUserHelper(false, {}, field, metaCons);
  },

  editUser: (arg) => {
    var ID = arg.ID;

    //update User table
    var toUpdateUser = {
      trigger_update: (new Date()).getTime() // this is needed to trigger updated at
    };
    var toUpdateUserMeta = {};
    //console.log(arg);

    var userVal = Object.keys(DbConfig.User).map(function (key) {
      return DbConfig.User[key];
    });

    var userMetaVal = Object.keys(DbConfig.UserMeta).map(function (key) {
      return DbConfig.UserMeta[key];
    });

    for (var k in arg) {
      var v = arg[k];

      //change key here
      //handle for image props
      if (k === "img_url") {
        k = DbConfig.UserMeta.IMG_URL;
      }
      if (k === "img_size") {
        k = DbConfig.UserMeta.IMG_SIZE;
      }
      if (k === "img_pos") {
        k = DbConfig.UserMeta.IMG_POS;
      }

      if (userVal.indexOf(k) > -1) {
        toUpdateUser[k] = v;
      }

      if (userMetaVal.indexOf(k) > -1) {
        toUpdateUserMeta[k] = v;
      }
    }

    console.log(toUpdateUserMeta);
    console.log(toUpdateUser);

    return DB.update(DbConfig.User.TABLE, toUpdateUser).then((res) => {
      if (Object.keys(toUpdateUserMeta).length >= 1) {
        return updateUserMeta(ID, toUpdateUserMeta);
      } else {
        return res;
      }
    });
  }
};

// ##############################################################################################
// ##############################################################################################

/**
 * 
class UserModel {
  hasFeedback(user_id) {
    var sql = `select (${UserQuery.selectMetaMain(user_id, "feedback")}) as feedback`;
    return DB.query(sql).then((res) => {
      try {
        var feedback = res[0].feedback;
        if (feedback != "" && feedback != null && typeof feedback !== "undefined") {
          return 1;
        }
      } catch (err) {};
      return 0;
    });
  }

  updateUserMeta(user_id, data) {
    var meta_key_in = "";
    var meta_pair_case = "";

    //to check not exist user meta
    var meta_key = [];

    for (var k in data) {
      meta_key.push(k);
      meta_key_in += `'${k}',`;
      meta_pair_case += ` WHEN '${k}' THEN '${DB.escStr(data[k])}' `;
    }

    var where = `WHERE meta_key IN (${meta_key_in.slice(0, -1)}) and user_id = '${user_id}'`;

    var check_sql = `SELECT * FROM wp_cf_usermeta ${where}`;

    var update_sql = `UPDATE wp_cf_usermeta
            SET meta_value = CASE meta_key 
            ${meta_pair_case} 
            END ${where}`;

    //check what does not exist
    return DB.query(check_sql).then((res) => {

      var key_check = res.map((d, i) => d["meta_key"]);

      //insert what does not exist
      var insert_val = "";
      meta_key.map((d, i) => {
        if (key_check.indexOf(d) <= -1) {
          insert_val += `('${user_id}','${d}','${DB.escStr(data[d])}'),`;
        }
      });

      if (insert_val !== "") {
        var insert_sql = `INSERT INTO wp_cf_usermeta (user_id,meta_key,meta_value) VALUES ${insert_val.slice(0, -1)}`;

        return DB.query(insert_sql).then((res) => {
          //only then update what's left
          return DB.query(update_sql);
        });
      }
      // if not need to insert just update
      else {
        return DB.query(update_sql);
      }
    });
  }

  editUser(arg) {

    console.log(arg);

    var ID = arg.ID;

    //update User table
    var updateUser = {
      trigger_update: (new Date()).getTime() // this is needed to trigger updated at
    };
    var updateUserMeta = {};
    //console.log(arg);

    var userVal = Object.keys(User).map(function (key) {
      return User[key];
    });

    var userMetaVal = Object.keys(UserMeta).map(function (key) {
      return UserMeta[key];
    });

    for (var k in arg) {
      var v = arg[k];

      //change key here
      //handle for image props
      if (k === "img_url") {
        k = DbConfig.UserMeta.IMG_URL;
      }
      if (k === "img_size") {
        k = DbConfig.UserMeta.IMG_SIZE;
      }
      if (k === "img_pos") {
        k = DbConfig.UserMeta.IMG_POS;
      }

      if (userVal.indexOf(k) > -1) {
        updateUser[k] = v;
      }

      if (userMetaVal.indexOf(k) > -1) {
        updateUserMeta[k] = v;
      }
    }


    console.log(updateUserMeta);
    console.log(updateUser);

    //if there is nothing to update from user table,
    //update user meta only
    // if (Object.keys(updateUser).length < 3) { // include ID and user status
    //     console.log("update user meta only");
    //     return updateUserMeta(ID, updateUserMeta);
    // }

    //update user only
    // if (Object.keys(updateUserMeta).length >= 1) {
    //     console.log("update user only");
    //     return DB.update(DbConfig.User.TABLE, updateUser).then((res) => {
    //         return res;
    //     });
    // }

    // //update both
    console.log("update both");
    return DB.update(DbConfig.User.TABLE, updateUser).then((res) => {
      if (Object.keys(updateUserMeta).length >= 1) {
        return updateUserMeta(ID, updateUserMeta);
      } else {
        return res;
      }
    });

  }

  getUserHelper(type, params, field, metaCons) {
    const {
      CompanyExec
    } = require('./company-query.js');
    const {
      QueueExec
    } = require('./queue-query.js');
    const {
      PrescreenExec
    } = require('./prescreen-query.js');
    const {
      ZoomExec
    } = require('./zoom-query.js');
    const {
      SessionExec
    } = require('./session-query.js');
    const {
      SessionRequestExec
    } = require('./session-request-query.js');
    const {
      GroupSessionExec
    } = require('./group-session-query.js');
    const {
      AvailabilityExec
    } = require('./availability-query.js');

    // extra field that need role value to find
    if (field["sessions"] !== "undefined" ||
      field["queues"] !== "undefined" ||
      field["prescreens"] !== "undefined" ||
      field["registered_prescreens"] !== "undefined") {
      field["role"] = 1;
      field["rec_company"] = 1;
    }

    if (field["is_active"] !== "undefined") {
      field["user_status"] = 1;
    }

    if (field["is_profile_completed"] !== "undefined") {
      for (var i in RequiredFieldStudent) {
        field[RequiredFieldStudent[i]] = 1;
      }
    }

    var isSingle = (type === "single");
    var sql = "";
    if (isSingle) {
      sql = UserQuery.getUser(field, params, metaCons);
    } else {
      sql = UserQuery.getUser(field, params, metaCons);
    }

    var toRet = DB.query(sql).then(function (res) {
      for (var i in res) {

        var user_id = res[i]["ID"];
        var company_id = res[i]["rec_company"];
        var role = res[i]["role"];
        var user_status = res[i]["user_status"];

        // is_profile_completed ****************************************************
        if (field["is_profile_completed"] !== "undefined") {
          res[i]["is_profile_completed"] = true;
          // kalau ada yang required tak isi trus false
          for (var j in RequiredFieldStudent) {
            var reqKey = RequiredFieldStudent[j]
            var reqVal = res[i][reqKey]
            if (reqVal == null || reqVal == "") {
              //console.log(reqKey)
              res[i]["is_profile_completed"] = false;
              break;
            }
          }
        }

        // is_active ****************************************************
        if (field["is_active"] !== "undefined") {
          res[i]["is_active"] = user_status == UserEnum.STATUS_ACT;
        }

        // Cf ****************************************************
        if (typeof field["cf"] !== "undefined") {
          res[i]["cf"] = DB.getCF("user", user_id);
        }

        // group_session_joins ****************************************************
        if (typeof field["group_session_joins"] !== "undefined") {
          var par = {};
          par[GroupSessionJoin.USER_ID] = user_id;
          res[i]["group_session_joins"] = GroupSessionExec.group_session_joins(par, field["group_session_joins"]);
        }

        // group_sessions ****************************************************
        if (typeof field["group_sessions"] !== "undefined") {
          var par = {};
          par["user_id"] = user_id;

          par["discard_removed"] = true;
          par["discard_removed_user_id"] = user_id;

          // order yg join url ada dulu, then by expired
          par["order_by"] = "main.is_expired asc, main.is_canceled asc, main.join_url desc";
          res[i]["group_sessions"] = GroupSessionExec.group_sessions(par, field["group_sessions"]);
        }

        // sessions ****************************************************
        if (typeof field["sessions"] !== "undefined") {
          var par = {
            status: [SessionEnum.STATUS_ACTIVE, SessionEnum.STATUS_NEW]
          };
          if (role === UserEnum.ROLE_STUDENT) {
            par["participant_id"] = user_id;
          }
          if (role === UserEnum.ROLE_RECRUITER) {
            par["host_id"] = user_id;
          }

          res[i]["sessions"] = SessionExec.sessions(par, field["sessions"]);
        }

        // zoom_invites ****************************************************
        if (typeof field["zoom_invites"] !== "undefined") {
          var par = {
            is_expired: false,
            user_id: user_id
          };
          res[i]["zoom_invites"] = ZoomExec.zoom_invites(par, field["zoom_invites"]);
        }

        // session_requests ****************************************************
        if (typeof field["session_requests"] !== "undefined") {

          // list all pending and then all rejected
          var par = {
            order_by: `${SessionRequest.STATUS}, ${SessionRequest.CREATED_AT} asc`
          };

          if (role === UserEnum.ROLE_STUDENT) {
            //par["status"] = [SessionRequestEnum.STATUS_PENDING, SessionRequestEnum.STATUS_REJECTED];
            par["status"] = [SessionRequestEnum.STATUS_PENDING];
            par["student_id"] = user_id;
          }
          if (role === UserEnum.ROLE_RECRUITER) {
            par["status"] = [SessionRequestEnum.STATUS_PENDING];
            par["company_id"] = company_id;
          }

          res[i]["session_requests"] = SessionRequestExec.session_requests(par, field["session_requests"]);
        }


        // queues ****************************************************
        if (typeof field["queues"] !== "undefined") {
          var par = {
            status: QueueEnum.STATUS_QUEUING
          };
          if (role === UserEnum.ROLE_STUDENT) {
            par["student_id"] = user_id;
          }
          if (role === UserEnum.ROLE_RECRUITER) {
            par["company_id"] = company_id;
          }

          res[i]["queues"] = QueueExec.queues(par, field["queues"]);
        }

        // booked_at ****************************************************
        if (typeof field["booked_at"] !== "undefined" &&
          typeof params.company_id !== "undefined") {
          var par = {};
          // this company_id come from student-listing exec
          par[Availability.COMPANY_ID] = params.company_id;
          par[Availability.IS_BOOKED] = 1;
          par[Availability.USER_ID] = user_id;
          par["is_for_booked_at"] = true
          par["order_by"] = "av.timestamp desc"
          res[i]["booked_at"] = AvailabilityExec.availabilities(par, field["booked_at"]);
        }

        // prescreens_by_company ****************************************************
        if (typeof field["prescreens_for_student_listing"] !== "undefined" &&
          typeof params.company_id !== "undefined") {
          var par = {
            status: PrescreenEnum.STATUS_WAIT_CONFIRM,
            status_2: PrescreenEnum.STATUS_APPROVED,
            status_3: PrescreenEnum.STATUS_STARTED,
            order_by: `${Prescreen.STATUS} asc, ${Prescreen.APPNMENT_TIME} asc`,
            discard_removed: true,
            discard_removed_user_id: user_id,
            student_id: user_id,
            company_id: params.company_id,
          };
          res[i]["prescreens_for_student_listing"] = PrescreenExec.prescreens(par, field["prescreens_for_student_listing"]);
        }

        // prescreens ****************************************************
        if (typeof field["prescreens"] !== "undefined") {
          // New SI Flow
          var par = {
            status: PrescreenEnum.STATUS_WAIT_CONFIRM,
            status_2: PrescreenEnum.STATUS_APPROVED,
            status_3: PrescreenEnum.STATUS_REJECTED,
            status_4: PrescreenEnum.STATUS_STARTED,
            status_5: PrescreenEnum.STATUS_ENDED,
            order_by: `${Prescreen.STATUS} asc, ${Prescreen.APPNMENT_TIME} asc`,
            discard_removed: true,
            discard_removed_user_id: user_id
          };
          if (role === UserEnum.ROLE_STUDENT) {
            par["student_id"] = user_id;
          }
          if (role === UserEnum.ROLE_RECRUITER) {
            par["company_id"] = company_id;
          }

          res[i]["prescreens"] = PrescreenExec.prescreens(par, field["prescreens"]);
        }

        // registered_prescreens ****************************************************
        if (typeof field["registered_prescreens"] !== "undefined") {
          var par = {};
          if (role === UserEnum.ROLE_STUDENT) {
            par["student_id"] = user_id;
          }
          if (role === UserEnum.ROLE_RECRUITER) {
            par["company_id"] = company_id;
          }

          res[i]["registered_prescreens"] = PrescreenExec.prescreens(par, field["registered_prescreens"]);
        }

        // company ****************************************************
        if (typeof field["company"] !== "undefined") {
          res[i]["company"] = CompanyExec.company(company_id, field["company"]);
        }

        // doc_links ****************************************************
        if (typeof field["doc_links"] !== "undefined") {
          res[i]["doc_links"] = DocLinkExec.doc_links({
            user_id: user_id,
            order_by: "label"
          }, field["doc_links"]);
        }

        // skills ****************************************************
        if (typeof field["skills"] !== "undefined") {
          res[i]["skills"] = SkillExec.skills({
            user_id: user_id
          }, field["skills"]);
        }
      }

      if (type === "single") {
        return res[0];
      } else {
        return res;
      }

    });

    return toRet;
  }

  recruiters(company_id, field) {
    var metaCons = {};
    metaCons[DbConfig.UserMeta.REC_COMPANY] = company_id;
    return getUserHelper(false, {}, field, metaCons);
  }

  getUserHelperSimple(type, params, field) {
    let sql = "";

    return DB.query(sql).then(function (res) {
      for (var i in res) {}
      if (type == "single") {
        return res[0];
      } else {
        return res;
      }
    });
  }

  user(params, field) {
    console.log("user");
    return getUserHelperSimple("single", params, field);
  }

  users(params, field) {
    return getUserHelperSimple(false, params, field);
  }
}

 */
