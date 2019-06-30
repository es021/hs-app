
   
<template>
  <AppContainer>
    <div class="container">
      <div class="row">
        <h3 class="teal-text">Companies</h3>
        <h4 class="">Connection Request</h4>
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
                backgroundImage: 'url(' + require(`../../image/${d.img_url}`) + ')',
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
  </AppContainer>
</template>

    
<script>
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
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
