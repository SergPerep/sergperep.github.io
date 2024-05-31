<script setup>
    import { ref } from 'vue'
    const baseUrl = "img/36daysoftype_2021/";
    const chars = ref([
        { name: "a", caption: 'A is for an altar for erotic confessions'},
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
        { name: "m", caption: 'M is for a monopoly on production and distribution of cursed videotapes'},
        { name: "n", caption: 'N is for nails that pierce a straw doll'},
        { name: "o", caption: 'O is for owls that smoke pipe'},
        { name: "p", caption: 'P is for paperwork that is required for time travel'},
        { name: "q", caption: 'Q is for the quest for happiness'},
        { name: "r", caption: 'R is for robots that have feelings'},
        { name: "s", caption: 'S is for serotonin saved for a rainy day'},
        { name: "t", caption: 'T is for a talent show with faked authenticity'},
        { name: "u", caption: 'U is for union of week and cowardly'},
        { name: "v", caption: 'V is for vampires that suck blood but are also vegan'},
        { name: "w", caption: 'W is for water that tastes funny'},
        { name: "x", caption: 'X is for the ex that still can’t let go'},
        { name: "y", caption: 'Y is for yesterday that is not refundable'},
        { name: "z", caption: 'Z is for zombies in a human resources department'},
        { name: "0", caption: '0 is for zero chances to beat aging'},
        { name: "1", caption: '1 is for one heart to swallow'},
        { name: "2", caption: '2 is for two snakes eating each other'},
        { name: "3", caption: '3 is for three weavers hosting an interdimensional tv-show'},
        { name: "4", caption: '4 is for four horsemen banned from driving'},
        { name: "5", caption: '5 is for five fingers of a corpse for crows to feast on'},
        { name: "6", caption: '6 is for six feet to burry previous version of yourself'},
        { name: "7", caption: '7 is for seven spikes on a crown of blind king'},
        { name: "8", caption: '8 is for eight juicy moths in the jar'},
        { name: "9", caption: '9 is for nine doors hidden deep in the woods'},
    ]);
</script>

# 36daysoftype 2021

<ul class="gallery">
    <li v-for="char in chars">
        <img :src='baseUrl + char.name + ".svg"'/>
        <p>{{char.caption}}</p>
    </li>
</ul>
