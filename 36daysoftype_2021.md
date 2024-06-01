<script setup>
    import { ref } from 'vue'
    import { withBase } from 'vitepress';
    const baseUrl = "/img/36daysoftype_2021/";
    const chars = ref([
        { name: "a", caption: 'A is for the art of ways and byways'},
        { name: "b", caption: 'B is for the bus station at the edge of the world'},
        { name: "c", caption: 'C is for a crematorium for imaginary friends'},
        { name: "d", caption: 'D is for the desert filled with dust and moths'},
        { name: "e", caption: 'E is for the envy that smells like rot'},
        { name: "f", caption: 'F is for fungus that waking up the dead'},
        { name: "g", caption: 'G is for ghosts of a family tree'},
        { name: "h", caption: 'H is for habits that die hard'},
        { name: "i", caption: 'I is for immaturity of desires'},
        { name: "j", caption: 'J is for jars filled with formaldehyde'},
        { name: "k", caption: 'K is for kinks that involve smoke and mirrors'},
        { name: "l", caption: 'L is for larva swarming under the bark'},
        { name: "m", caption: 'M is for a monopoly on production and distribution of cursed videotapes'}, // edit
        { name: "n", caption: 'N is for nails that pierce a straw doll'}, // maybe
        { name: "o", caption: 'O is for owls that smoke pot'},
        { name: "p", caption: 'P is for paperwork mandatory for time travel'},
        { name: "q", caption: 'Q is for the quest for happiness'},
        { name: "r", caption: 'R is for robots that have feelings'},
        { name: "s", caption: 'S is for serotonin saved for a rainy day'},
        { name: "t", caption: 'T is for a talent show with faked authenticity'}, // edit
        { name: "u", caption: 'U is for union of week and cowardly'},
        { name: "v", caption: 'V is for vampires that suck blood but are also vegan'}, // edit
        { name: "w", caption: 'W is for water that tastes funny'},
        { name: "x", caption: 'X is for the ex that can’t let go'},
        { name: "y", caption: 'Y is for yesterday that is non-refundable'},
        { name: "z", caption: 'Z is for zombies in a human resources department'},
        { name: "0", caption: '0 is for zero chances to beat aging'}, // edit
        { name: "1", caption: '1 is for one heart to swallow'}, // edit
        { name: "2", caption: '2 is for two snakes eating each other'},
        { name: "3", caption: '3 is for three weavers hosting an interdimensional tv-show'}, //edit
        { name: "4", caption: '4 is for four horsemen banned from driving'}, // edit
        { name: "5", caption: '5 is for five fingers of a corpse for crows to feast on'}, //edit
        { name: "6", caption: '6 is for six feet to burry previous version of yourself'}, //edit
        { name: "7", caption: '7 is for seven spikes on a crown of blind king'}, // edit
        { name: "8", caption: '8 is for eight juicy moths in the jar'}, //edit
        { name: "9", caption: '9 is for nine doors hidden deep in the woods'}, //edit
    ]);
    const imageSource = "./img/36daysoftype_2021/a.svg";
</script>

# 36daysoftype 2021

<ul class="font-gallery">
    <li v-for="char in chars">
        <img :src='baseUrl + char.name + ".svg"'/>
        <p>{{char.caption}}</p>
    </li>
</ul>

<style lang="scss">
    @use '.vitepress/theme/sass/font-gallery';
</style>
