
   
<template>
  <AppContainer>
    <!-- ---------------------------------------------------->
    <!-- COMPANY CARDS-->
    <div class="container">
      <div class="row">
        <h3 class="teal-text">Connection Request</h3>
        <ul class="pagination">
          <li class="disabled">
            <a href="#">
              <i class="material-icons">chevron_left</i>
            </a>
          </li>
          <li class="active">
            <a href="#">1</a>
          </li>
          <li class="waves-effect">
            <a href="#">2</a>
          </li>
          <li class="waves-effect">
            <a href="#">3</a>
          </li>
          <li class="waves-effect">
            <a href="#">4</a>
          </li>
          <li class="waves-effect">
            <a href="#">5</a>
          </li>
          <li class="waves-effect">
            <a href="#">
              <i class="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
        <div v-for="(d,i) in companies" :class="`col s6 m4 l3`" :key="`company_${i}`">
          <div class="card">
            <div
              class="card-image small"
              :style="{
                height:'200px', 
                backgroundImage: 'url(' + require(`../image/${d.img_url}`) + ')',
                backgroundSize:d.img_size,
                backgroundPosition:'center center',
                backgroundRepeat:'no-repeat'
              }"
            >
              <a
                class="btn-floating halfway-fab waves-effect waves-light green tooltipped"
                data-position="top"
                data-tooltip="Click to approve connection request"
              >
                <i class="material-icons">check</i>
              </a>
            </div>
            <div class="card-content left-align grey lighten-4">
              <span class="card-title">{{d.name}}</span>
              <p>{{d.desc}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- COMPANY CARDS-->
    <!-- ---------------------------------------------------->
    <!-- EVENT CARDS-->
    <div class="container">
      <div class="row">
        <h3 class="teal-text">Event Request</h3>
        <ul class="pagination">
          <li class="disabled">
            <a href="#">
              <i class="material-icons">chevron_left</i>
            </a>
          </li>
          <li class="active">
            <a href="#">1</a>
          </li>
          <li class="waves-effect">
            <a href="#">2</a>
          </li>
          <li class="waves-effect">
            <a href="#">3</a>
          </li>
          <li class="waves-effect">
            <a href="#">
              <i class="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
        <div v-for="(d,i) in events" :class="`col s12 m6 l4`" :key="`event_${i}`">
          <div class="card">
            <div class="card-content left-align">
              <span class="left-align card-title">{{d.title}}</span>
              <div>
                <i class="tiny material-icons pad-right-5">widgets</i>
                by
                <a href="#">{{d.requested_by}}</a>
              </div>
              <div>
                <i class="tiny material-icons pad-right-5">date_range</i>
                <span>{{d.date}}</span>
              </div>
              <div>
                <i class="tiny material-icons pad-right-5">access_time</i>
                <span>{{d.time}}</span>
              </div>
              <p class="grey-text left-align">
                <br>
                {{d.desc}}
              </p>
            </div>
            <div class="card-action">
              <button class="btn waves-effect waves-light green white-text">Approve</button>
              <button class="btn waves-effect waves-light red white-text">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- EVENT CARDS-->
    <!-- ---------------------------------------------------->
  </AppContainer>
</template>

 <!-- <h3>Home</h3> -->
    <!-- <LoaderCircular :loading="loading" size="small"></LoaderCircular>
    {{user}}
    <div class="container">
      <div class="row">
        <div class="col s12">
          <div class="card-panel teal lighten-2">test</div>
        </div>
      </div>
    </div>-->
    
<script>
import * as ApiHelper from "../../_helper/api-helper";

export default {
  name: "default",
  data() {
    return {
      companies: [
        {
          name: "Shell",
          img_url: "shell.png",
          img_size: "70%",
          desc:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam repudiandae."
        },
        {
          name: "HSBC",
          img_url: "hsbc.png",
          img_size: "90%",
          desc:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam repudiandae."
        },
        {
          name: "Maxis",
          img_url: "maxis.png",
          img_size: "90%",
          desc:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam repudiandae."
        },
        {
          name: "Telekom Malaysia",
          img_url: "tm.png",
          img_size: "90%",
          desc:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam repudiandae."
        }
      ],
      events: [
        {
          title: "Career Seminar",
          requested_by: "Petronas",
          date: "July 18, 2019",
          time: "3:30 PM",
          desc:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam repudiandae."
        },
        {
          title: "Gamuda Career Fair",
          requested_by: "Gamuda",
          date: "September 21, 2019",
          time: "10:00 AM",
          desc:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam repudiandae."
        },
        {
          title: "Exhibition",
          requested_by: "Petronas",
          date: "August 1, 2019",
          time: "12:00 PM",
          desc:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam repudiandae."
        }
      ],
      user: {},
      loading: false
    };
  },
  created() {},
  mounted() {
    // this.loading = true;
    // ApiHelper.graphql(
    //   `query{
    //     user(ID:136){
    //       ID user_email first_name last_name
    //     }
    //   }`
    // ).then(data => {
    //   this.user = data.user;
    //   this.loading = false;
    //   console.log(data);
    // });
  },
  methods: {}
};
</script>
