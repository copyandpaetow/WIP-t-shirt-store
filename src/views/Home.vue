<template>
  <article class="home default-view layout" v-if="!loadingState">
    <aside class="home--background default-background "></aside>

    <header class="header js-hide-on-search default-header">
      <styledHeadline
        class="header--headline__layout"
        headlineText="Your perfect t-shirt, in your perfect color"
      ></styledHeadline>
      <!--
      <div class="header--rotating-headline">
        <styledHeadline
          class="header--headline__layout"
          headlineText="is it ghostwhite?"
          :invertedColor="true"
          headlineType="h2"
        ></styledHeadline>
    </div> -->
      <p class="header--subline">
        You don't have to choose between the perfect fit or the perfect color
        anymore. <b>Just get both.</b>
      </p>
    </header>

    <section class="home--product sticky-wrapper layout layout--full">
      <div class="sticky-content js-hide-on-search layout--span3">
        <image-overlay
          :image_full="productData[2].urls.full"
          :image_regular="productData[2].urls.regular"
          :image_small="productData[2].urls.small"
          :image_thumb="productData[2].urls.thumb"
          :svg="productData[2].svg"
          :alt_description="productData[2].alt_description"
          :overlay_color="currentColor || ['white', '#ffffff']"
          :fullHeight="responsiveImageHeight"
          :aspectRatio="productData[2].width / productData[2].height"
          class="image-overlay z-index-1"
        />
      </div>
      <div
        class="non-sticky observe js-hide-on-search layout--span1__center"
        v-for="(color, index) in colors.preview1"
        :key="'colorsection1' + index"
      >
        <a @click="changeToPreviewColor(color)"
          ><styledHeadline
            class="non-sticky--links"
            :headlineText="
              index === 0 ? `is it ${color[0]}?` : `or ${color[0]}?`
            "
            :invertedColor="true"
            :id="`preview1-${index}`"
            headlineType="h1"
          ></styledHeadline
        ></a>
      </div>
      <div class="search-container layout--span1__center">
        <styledHeadline
          class="search--headline__layout"
          headlineText="In what color do you want to leave others breathless?"
          :invertedColor="true"
          headlineType="h1"
        ></styledHeadline>
        <search
          id="search-wrapper-1"
          class="search--input search__layout"
          :input="{
            label: null,
            placeholder: 'Your dream color?',
            id: 'home'
          }"
          :error="errorSearch"
          @searchresultevent="selectResult"
          @searchupdateevent="updateColor"
          @searchfocusevent="hideNonSearch"
          @searchblurevent="restoreNonSearch"
        />
        <p class="search--continue__layout js-show-on-search">
          or scroll down for more inspiration
        </p>
      </div>
    </section>

    <section class="home--feature layout--span1__center">
      <h1 class="feature--headline__layout">
        A T-shirt that has astonishing stamina
      </h1>
      <styledHeadline
        class="feature--headline__layout"
        headlineText="just like you?"
        headlineType="h2"
        :invertedColor="true"
      ></styledHeadline>
      <p class="feature--body big-text">
        We dont just make perfect t-shirts. We train them to become the worlds
        greatest. At the end of their training they could partake in the
        olympics. But that would be fair to the other athletes. This is why they
        last so long.
      </p>
    </section>

    <section class="home--product sticky-wrapper layout layout--full">
      <div class="sticky-content js-hide-on-search layout--span2__left">
        <image-overlay
          :image_full="productData[0].urls.full"
          :image_regular="productData[0].urls.regular"
          :image_small="productData[0].urls.small"
          :image_thumb="productData[0].urls.thumb"
          :svg="productData[0].svg"
          :alt_description="productData[0].alt_description"
          :overlay_color="currentColor || ['white', '#ffffff']"
          :fullHeight="responsiveImageHeight"
          :aspectRatio="productData[0].width / productData[0].height"
          class="image-overlay z-index-1"
        />
      </div>
      <div
        class="non-sticky observe js-hide-on-search layout--span1__center"
        v-for="(color, index) in colors.preview2"
        :key="'colorsection1' + index"
      >
        <a @click="changeToPreviewColor(color)"
          ><styledHeadline
            class="non-sticky--links"
            :headlineText="
              index === 0 ? `is it ${color[0]}?` : `or ${color[0]}?`
            "
            :invertedColor="true"
            :id="`preview2-${index}`"
            headlineType="h1"
          ></styledHeadline
        ></a>
      </div>
      <div class="search-container layout--span1__center">
        <styledHeadline
          class="search--headline__layout"
          headlineText="In what color do you want to rule the world?"
          :invertedColor="true"
          headlineType="h1"
        ></styledHeadline>
        <search
          id="search-wrapper-2"
          class="search--input search__layout"
          :input="{
            label: null,
            placeholder: 'the one color to rule them all?',
            id: 'home'
          }"
          :error="errorSearch"
          @searchresultevent="selectResult"
          @searchupdateevent="updateColor"
          @searchfocusevent="hideNonSearch"
          @searchblurevent="restoreNonSearch"
        />
        <p class="search--continue__layout js-show-on-search">
          or scroll down for more inspiration
        </p>
      </div>
    </section>

    <section class="home--feature layout--span1__center">
      <h1 class="feature--headline__layout">
        Ordering this t-shirt
      </h1>
      <styledHeadline
        class="feature--headline__layout"
        headlineText="won't take long"
        headlineType="h2"
        :invertedColor="true"
      ></styledHeadline>
      <p class="feature--body big-text">
        We get it, you are important and have to be somewhere else to show them
        how its done. This is why we sell only this one, perfect t-shirt in that
        color you like so much.
      </p>
    </section>

    <section class="home--product sticky-wrapper layout layout--full">
      <div class="sticky-content js-hide-on-search layout--span2__right">
        <image-overlay
          :image_full="productData[6].urls.full"
          :image_regular="productData[6].urls.regular"
          :image_small="productData[6].urls.small"
          :image_thumb="productData[6].urls.thumb"
          :svg="productData[6].svg"
          :alt_description="productData[6].alt_description"
          :overlay_color="currentColor || ['white', '#ffffff']"
          :fullHeight="responsiveImageHeight"
          :aspectRatio="productData[6].width / productData[6].height"
          class="image-overlay z-index-1"
        />
      </div>
      <div
        class="non-sticky observe js-hide-on-search layout--span1__center"
        v-for="(color, index) in colors.preview3"
        :key="'colorsection1' + index"
      >
        <a @click="changeToPreviewColor(color)"
          ><styledHeadline
            class="non-sticky--links"
            :headlineText="
              index === 0 ? `is it ${color[0]}?` : `or ${color[0]}?`
            "
            :invertedColor="true"
            :id="`preview3-${index}`"
            headlineType="h1"
          ></styledHeadline
        ></a>
      </div>
      <div class="search-container layout--span1__center">
        <styledHeadline
          class="search--headline__layout"
          headlineText="In what color do you want to define the new awesome?"
          :invertedColor="true"
          headlineType="h1"
        ></styledHeadline>
        <search
          id="search-wrapper-3"
          class="search--input search__layout"
          :input="{
            label: null,
            placeholder: 'type your awesome color here',
            id: 'home'
          }"
          :error="errorSearch"
          @searchresultevent="selectResult"
          @searchupdateevent="updateColor"
          @searchfocusevent="hideNonSearch"
          @searchblurevent="restoreNonSearch"
        />
        <p class="search--continue__layout js-show-on-search">
          or scroll down for more inspiration
        </p>
      </div>
    </section>

    <storeFooter class="footer__layout default-footer"></storeFooter>
  </article>
  <article class="home hero" v-else>
    <h1>loading</h1>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import search from "@/components/inputs/InputSearch.vue";
import imageOverlay from "@/components/overlay/ImageOverlay";
import storeFooter from "@/components/footer/footer.vue";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    search,
    imageOverlay,
    storeFooter,
    styledHeadline
  },
  props: [],
  name: "home",
  data() {
    return {
      errorSearch: "",
      selectedColor: "",
      showTransitionMessage: "",
      colors: {
        preview1: [
          ["tomato", "#FF6347"],
          ["lemonchiffon", "#FFFACD"],
          ["mediumspringgreen", "#00FA9A"]
        ],
        preview2: [
          ["firebrick", "#B22222"],
          ["gold", "#FFD700"],
          ["lightsteelblue", "#B0C4DE"]
        ],
        preview3: [
          ["sandybrown", "#F4A460"],
          ["lavenderblush", "#FFF0F5"],
          ["dimgray", "#696969"]
        ]
      },
      currentColor: ["ghostwhite", "#F8F8FF"]
    };
  },
  methods: {
    hideNonSearch() {
      let objectsToHide = document.querySelectorAll(".js-hide-on-search");
      objectsToHide.forEach(object => {
        object.style.opacity = 0;
      });
      let objectsToShow = document.querySelectorAll(".js-show-on-search");
      objectsToShow.forEach(object => {
        object.style.opacity = 1;
      });
    },
    restoreNonSearch() {
      let hiddenObjects = document.querySelectorAll(".js-hide-on-search");
      hiddenObjects.forEach(object => {
        object.style.opacity = 1;
      });
      let objectsToHide = document.querySelectorAll(".js-show-on-search");
      objectsToHide.forEach(object => {
        object.style.opacity = 0;
      });
    },
    addColor(entry) {
      let index = entry.id.split("-")[1];
      let colorArray = entry.id.split("-")[0];

      this.currentColor = this.colors[colorArray][index];
    },
    //navigation
    goTo(locationName, paramObject) {
      this.$router.push({
        name: locationName,
        params: paramObject
      });
    },

    changeToPreviewColor(color) {
      this.$store
        .dispatch("productModule/COLORS_setCurrent", color)
        .then(() => {
          this.goTo("store", {
            color: color[0],
            colorArray: color
          });
        });
    },

    selectResult(result) {
      console.log(result);
      if (!result) {
        setTimeout(() => {
          this.errorSearch = "";
        }, 5000);
        this.errorSearch = "Sadly, we dont have this color";
        this.clearInput();
        return;
      }
      this.selectedColor = result;

      this.$store
        .dispatch("productModule/COLORS_setCurrent", this.selectedColor)
        .then(() => {
          setTimeout(() => {
            this.goTo("store", {
              color: this.selectedColor[0],
              colorArray: this.selectedColor
            });
          }, 2000);
          this.showTransitionMessage = `Well done, lets get you the best ${
            this.selectedColor[0]
          } t-shirts there are`;
        });
    },
    clearInput() {
      this.selectedColor = "";
    },
    updateColor(color) {
      this.selectedColor = color;
    }
  },
  computed: {
    ...mapGetters({
      loadingState: "initModule/getLoadingState",
      supportData: "productModule/getSupport",
      productData: "productModule/getProduct"
    }),
    responsiveImageHeight() {
      if (window.innerHeight > 340) {
        return 85;
      }
      if (window.innerHeight > 700) {
        return 90;
      }
      return 100;
    }
  },
  mounted() {
    const observeColors = document.querySelectorAll(".observe");
    const options = {
      rootMargin: "0px",
      threshold: [0.4]
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.addColor(entry.target.children[0].children[0]);
        } else {
          //
        }
      });
    }, options);

    observeColors.forEach(color => {
      observer.observe(color);
    });
  },
  destroyed() {
    //observer.unobserve;
  }
};
</script>

<style scoped>
.header--subline {
  /* Positioning */
  /* Box-model */
  /* Typography */
  font-size: var(--h3--fontsize__fixed);
  /* Visual */
  /* Misc */
}

.sticky-wrapper {
  /* Positioning */
  position: relative;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: 5vh;
  /* Box-model */
  min-height: 300vh;
  /* Typography */
  /* Visual */
  /* Misc */
}

.sticky-content {
  /* Positioning */
  position: sticky;
  top: var(--navbar__height);
  /* Box-model */
  overflow: hidden;
  z-index: 5;
  top: calc(var(--navbar__height) + 1.5%);
  width: 100%;
  /* Typography */

  /* Visual */

  /* Misc */
}

.non-sticky--links {
  word-break: break-all;
}

.non-sticky {
  /* Positioning */
  position: relative;
  /* Box-model */
  width: 100%;
  height: 75vh;
  z-index: 6;
  overflow: hidden;
  padding: var(--4base) 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.search-container {
  /* Positioning */
  position: relative;
  display: grid;
  grid-template-rows: min-content min-content 20rem min-content;
  grid-row-gap: 3vh;
  /* Box-model */
  width: 100%;
  height: calc(100vh - var(--navbar__height));
  padding: var(--4base) 0;
  z-index: 6;
  overflow: hidden;
  /* Typography */

  /* Visual */
  /* Misc */
}

.home--feature {
  /* Positioning */

  /* Box-model */
  padding: var(--4base) 0;
  /* Typography */

  /* Visual */

  /* Misc */
}

.feature--headline__layout {
  padding-bottom: 0;
}

.feature--body {
  padding: var(--2base) 0;
}

/*Utility*/
.search--continue__layout {
  opacity: 0;
}

.js-hide-on-search,
.js-show-on-search {
  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
