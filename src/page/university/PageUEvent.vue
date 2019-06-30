
   
<template>
  <AppContainer>
    <div class="container">
      <div class="row">
        <h3 class="teal-text">Events</h3>
        <h4 class>Event Requests</h4>
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
  </AppContainer>
</template>

<script>
export default {
  name: "default",
  data() {
    return {
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
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
