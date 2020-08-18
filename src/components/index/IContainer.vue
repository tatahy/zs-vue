<template>
  <div>
    <!-- controls
    indicators 
    background="#ababab"
    -->
    <b-carousel
      id="carousel-1"
      class="text-center "
      v-model="slide"
      :interval="4000"
      no-animation
      indicators
      background="transparent"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Slides with img slot -->
      <!-- width="1024"
            height="480" -->
      <b-carousel-slide content-visible-up="md" caption="电磁泵">
        <template v-slot:img>
          <img
            class="img-fluid h-100"
            width="1024"
            height="480"
            src="@/assets/lmtd.jpg"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>

      <b-carousel-slide text="熔化保温炉+电磁泵" class="text-center">
        <template v-slot:img>
          <!-- <div class="d-flex justify-content-center"> -->
          <!-- 
           width="1024"
            height="480"-->
          <img 
            class="img-fluid h-100" 
            width="1024"
            height="480"
            src="@/assets/moven-lmtd.jpg" 
            alt="image slot"           
          />
          <!-- </div> -->
        </template>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <!-- <b-carousel-slide >
        <template v-slot:img>
          <img 
            class="img-fluid h-100" 
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55" 
            alt="image slot"           
          />
        </template>
      </b-carousel-slide> -->
      
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=55">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <!-- <b-carousel-slide
        content-visible-up="md"
        caption="Blank Image"
        img-blank
        img-alt="Blank image"
        background="#ababab"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>-->
    </b-carousel> 

    <!-- <p class="mt-4">
      Slide #: {{ slide }}
      <br />
      Sliding: {{ sliding }}
    </p>-->
  </div>
</template>

<script>
import { 
  BCarousel,
  BCarouselSlide, 
  // BImg 
} from "bootstrap-vue";

export default {
  name: "IContainer",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    getImg(name){
      const srcPre='@/assets/'
      return srcPre+name;
    },
  },
  components: {
    BCarousel,
    BCarouselSlide,
    // BImg,
  },
};
</script>

<style scoped>
</style>
