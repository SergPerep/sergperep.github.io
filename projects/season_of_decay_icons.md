<script setup>
    import { ref } from 'vue'
    const baseUrl = "/img/season_of_decay_icons/"
    const icons = ref([
        { name: "bats", caption: ""},
        { name: "blade", caption: ""},
        { name: "book", caption: ""},
        { name: "cat", caption: ""},
        { name: "cauldron", caption: ""}, 
        { name: "chest", caption: ""}, 
        { name: "crow", caption: ""}, 
        { name: "crystal_ball", caption: ""}, 
        { name: "doll", caption: ""}, 
        { name: "frog", caption: ""},
        { name: "ghost", caption: ""},
        { name: "goat", caption: ""},
        { name: "gravestone", caption: ""},
        { name: "hand_of_magician", caption: ""},
        { name: "lips", caption: ""},
        { name: "mirror", caption: ""},
        { name: "octopus", caption: ""},
        { name: "ouija_pointer", caption: ""},
        { name: "owl", caption: ""},
        { name: "potion", caption: ""},
        { name: "pumpkin", caption: ""},
        { name: "pyre", caption: ""},
        { name: "skull", caption: ""},
        { name: "snake", caption: ""},
        { name: "spider", caption: ""},
        { name: "vynus_fly", caption: ""}, 
        { name: "witch_hat_01", caption: ""},
        { name: "witch_hat_02", caption: ""},
        { name: "wolf", caption: ""},
        ]);
</script>


# Icons: Season of decay

<ul class="icons-gallery">
    <li v-for="icon in icons"><img :src='baseUrl + icon.name + ".svg"'/></li>
</ul>

<style lang="scss">

.icons-gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;
    img {
        display: block;
    }
}

@media all and (width <= 900px) {
  .icons-gallery {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media all and (width <= 600px) {
  .icons-gallery {
    grid-template-columns: 1fr 1fr;
  }
}

</style>

