<template>
  <section class="option-completion">
    <header class="option-completion--header">
      <h4 class="header--headline">
        Well done!
      </h4>
      <p class="header--subline">
        You added this sweet t-shirt to your shopping cart
      </p>
    </header>
    <div class="option-completion--product">
      <image-overlay
        :image_full="require('@/assets/images/kA9asUxmVka.png')"
        :image_regular="require('@/assets/images/kA9asUxmVka.png')"
        :image_small="require('@/assets/images/kA9asUxmVka.png')"
        :image_thumb="require('@/assets/images/kA9asUxmVka.png')"
        :svg="supportData[3].svg"
        :alt_description="supportData[3].alt_description"
        :overlay_color="currentColor || ['white', '#ffffff']"
        class="image-overlay product--image"
      />
      <div class="product--price">
        <styledHeadline
          :headlineText="`${product.amount * 20}`"
          :headlineType="responsiveHeadline"
          :invertedColor="true"
          class="product--headline"
        >
          <i>$</i></styledHeadline
        >

        <p class="product--shipping-label">+shipping</p>
      </div>
    </div>

    <div class="product--info">
      <p class="product--description">Color:</p>
      <p class="product--color">
        <b>{{ product.color[0] }}</b>
      </p>
      <p class="product--description">Size:</p>
      <p class="product--size">
        <b>{{ product.size }}</b>
      </p>
      <p class="product--description">Amount:</p>
      <p class="product--amount">
        <b>{{ product.amount }}</b>
      </p>
    </div>
    <div class="button-wrapper">
      <buttonSimple
        class="option-completion--cta"
        :buttonText="'view cart'"
        @simplebuttonevent="goTo('cart')"
      />
      <buttonSimple
        class="option-completion--cta2"
        :buttonText="'browse community favourites'"
        @simplebuttonevent="
          $emit('sizecontentreviewevent', { nextStep: 'community' })
        "
        buttonType="tertiary"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import buttonSimple from "@/components/buttons/ButtonSimple.vue";
import imageOverlay from "@/components/overlay/ImageOverlay.vue";
import modalLayout from "@/components/modal/modalLayout.vue";
import styledHeadline from "@/components/headline/headline.vue";

export default {
  components: {
    imageOverlay,
    buttonSimple,
    styledHeadline
  },
  props: {
    product: {
      type: Object,
      default: () => ({
        amount: 1,
        size: "M",
        color: ["darkslategray", "#2F4F4F"]
      })
    }
  },
  name: "sizeOptions",
  data() {
    return {
      communityColors: [["darkslategray", "#2F4F4F"], ["lavender", "#E6E6FA"]]
    };
  },

  methods: {
    changeToCommunityColor(color) {
      this.$store
        .dispatch("productModule/COLORS_setCurrent", color)
        .then(() => {
          this.goTo("store", {
            color: color[0],
            colorArray: color
          });
        });
    },
    //navigation
    goTo(locationName, paramObject) {
      this.$router.push({
        name: locationName,
        params: paramObject
      });
    }
  },
  computed: {
    ...mapGetters({
      supportData: "productModule/getSupport",
      currentColor: "productModule/getCurrentColor",
      allColors: "productModule/getColorPalette"
    }),
    responsiveHeadline() {
      return window.innerWidth > 700 ? "h2" : "h1";
    },
    randomColor() {
      const colorValues = Object.getOwnPropertyNames(this.allColors);
      const randomValue =
        colorValues[Math.floor(Math.random() * colorValues.length)];
      const color = this.allColors[randomValue];

      return [randomValue, color];
    }
  }
};
</script>

<style scoped>
.option-completion {
  /* Positioning */
  display: grid;
  grid-row-gap: var(--halfbase);
  grid-auto-flow: row;
  /* Box-model */
  max-width: 30rem;
  /* Typography */

  /* Visual */

  /* Misc */
}

.option-completion--product {
  /* Positioning */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: column;
  grid-column-gap: var(--halfbase);
  /* Box-model */

  /* Typography */

  /* Visual */

  /* Misc */
}

.product--image {
  /* Positioning */
  grid-column: 1/2;
  justify-self: end;
  /* Box-model */
  max-width: 6rem;
  /* Typography */

  /* Visual */

  /* Misc */
}

@media (min-width: 22.5em) {
  .option-completion {
    /* Positioning */
    grid-row-gap: var(--1base);
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
  .option-completion--product {
    /* Positioning */
    grid-template-columns: 1fr 0.75fr;
    /* Box-model */
    /* Typography */
    /* Visual */
    /* Misc */
  }
  .product--image {
    /* Positioning */
    /* Box-model */
    max-width: 10rem;
    /* Typography */
    /* Visual */
    /* Misc */
  }
}

.product--price {
  /* Positioning */
  grid-column: 2/3;
  align-self: end;
  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

.product--headline {
  /* Positioning */
  /* Box-model */
  padding: 0;
  /* Typography */
  /* Visual */
  /* Misc */
}

.product--info {
  /* Positioning */
  display: grid;
  grid-template-columns: 0.61fr 1fr;
  grid-auto-rows: min-content;
  grid-column-gap: var(--1base);
  /* Box-model */
  padding: var(--halfbase);
  /* Typography */

  /* Visual */
  border: 1px solid var(--grey-800);
  /* Misc */
}

@media (min-width: 48em) {
  .product--image {
    /* Positioning */
    grid-column: 1/2;
    grid-row: 1/3;
    /* Box-model */
    min-width: 15rem;
    max-width: 15rem;
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .product--price {
    /* Positioning */
    grid-column: 2/3;
    grid-row: 1/2;
    /* Box-model */
    /* Typography */

    /* Visual */

    /* Misc */
  }

  .product--info {
    /* Positioning */
    grid-column: 2/3;
    grid-row: 2/3;

    /* Box-model */
    height: min-content;
    /* Typography */

    /* Visual */

    /* Misc */
  }
}

.button-wrapper {
  /* Positioning */
  display: grid;
  grid-auto-flow: column;
  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}

.option-completion--cta {
  /* Positioning */
  grid-column: 2/3;
  /* Box-model */
  /* Typography */

  /* Visual */

  /* Misc */
}
</style>
