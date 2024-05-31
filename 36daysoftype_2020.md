<script setup>
    import { ref } from 'vue'
    const baseUrl = "img/36daysoftype_2020/"
    const edition_1 = ref([
        { name: "a", caption: 'A is for ambitions that kill joy'},
        { name: "b", caption: 'B is for bunnies in a magic hat'},
        { name: "c", caption: 'C is for cellar door in Donnie Darko movie'},
        { name: "d", caption: 'D is for a distance between you and your reflection'},
        { name: "e", caption: 'E is for entropy that opposes the order'},
        { name: "f", caption: 'F is for fame that is bright and meaningless'},
        { name: "g", caption: 'G is for a gesture that makes sphinxes cry'},
        { name: "h", caption: 'H is for the humor that keeps me away from the terrors of the day'},
        { name: "i", caption: 'I is one of identities that I carry with me'},
        { name: "j", caption: 'J is for job that is never done'},
        { name: "k", caption: 'K is for knife that cuts through the time'},
        { name: "l", caption: 'L is for lies we tell to avoid embarrassment'},
        { name: "m", caption: 'M is for moth that fills our chests and promises misery'},
        { name: "n", caption: 'N is for a note that someone sticks on a fridge to cheer you up in the morning'},
        { name: "o", caption: 'O is for an oak tree that burns at a crossroad'},
        { name: "p", caption: 'P is for power of letting go'},
        { name: "q", caption: 'Q is for a queen looking in a broken mirror'},
        { name: "r", caption: 'R is for reason we can’t find'},
        { name: "s", caption: 'S is for symptoms of spiritual decay'},
        { name: "t", caption: 'T is for the thirst one cannot satisfy'},
        { name: "u", caption: 'U is for umbrella that is blown away by storm wind'},
        { name: "v", caption: 'V is for a vault filled with childhood memories and fictional trophies'},
        { name: "w", caption: 'W is a world that is empty'},
        { name: "x", caption: 'X is for x-ray of human lungs'},
        { name: "y", caption: 'Y is for yogurt on which you probably shouldn’t spend so much money'},
        { name: "z", caption: 'Z is for a zombie suite that you wear casually on weekdays'},
        { name: "0", caption: '0 is for the void that eats you up from the inside'},
        { name: "1", caption: '1 is for the only one you need'},
        { name: "2", caption: '2 is for two kings who adore each other'},
        { name: "3", caption: '3 is for a secret code of three knocks at a door'},
        { name: "4", caption: '4 is for four horsemen who don’t say much'},
        { name: "5", caption: '5 is for five blades of the morning star'},
        { name: "6", caption: '6 is for six rules that you need to violate to break free'},
        { name: "7", caption: '7 is for seven keys of luck that tend to be always lost in a living room couch'},
        { name: "8", caption: '8 is for eight hours of work that is torture'},
        { name: "9", caption: '9 is for nine planets of the Solar System but one of them is an imposter'},
        ]);

    const edition_2 = ref([
        { name: "a", caption: 'A is for another start'},
        { name: "b", caption: 'B is for beasts that live under the bed'},
        { name: "c", caption: 'C is for the crown of pride that is just a fort wall covering a head'},
        { name: "d", caption: 'D is for doors that are neither open nor closed'},
        { name: "e", caption: 'E is for endless sleep in the summer night'},
        { name: "f", caption: 'A is for another start'},
        { name: "g", caption: 'G is for the guests who leave too early'},
        { name: "h", caption: 'Н is for heresy'},
        { name: "i", caption: 'I is for indirect kiss'},
        { name: "j", caption: 'I is for a jaguar who infiltrated the golden city'},
        { name: "k", caption: 'K is for a knot that can’t be untied'},
        { name: "l", caption: 'L is for a longest night full of scary salesmen'},
        { name: "m", caption: 'M is for an ancient memories that lurk in the back of your mind'},
        { name: "n", caption: 'N is for the neon lights in a gas station cafe'},
        { name: "o", caption: 'O is for an order in a row of random events'},
        { name: "p", caption: 'P is for pillars of the success that don’t have ground to stand on'},
        { name: "q", caption: 'Q is for questions that don’t have answers'},
        { name: "r", caption: 'R is for a robot that I am not'},
        { name: "s", caption: 'S is for sap of a burning tree'},
        { name: "t", caption: 'T is for a tremor caused by boiling blood'},
        { name: "u", caption: 'U is for an utopia that lives in a mind of perfectionists'},
        { name: "v", caption: 'V is for vanity of being a dreamer'},
        { name: "w", caption: 'W is for warning signs of spiritual decay'},
        { name: "x", caption: 'X is for xylophone in ghost melodies'},
        { name: "y", caption: 'Y is for an youthful soul that is trapped in a decaying body'},
        { name: "z", caption: 'Z is for zinc that protects you from moonburn'},
        { name: "0", caption: '0 is for endlessness and emptiness of the universe'},
        { name: "1", caption: 'One is for the lonely one who is lost in mist and trees'},
        { name: "2", caption: '2 is for two twin brothers who look alike but disagree in everything'},
        { name: "3", caption: '3 is for trinity of despair'},
        { name: "4", caption: '4 is for forever home'},
        { name: "5", caption: '5 is for a pinky promise'},
        { name: "6", caption: '6 is for the six candles above the dying man face'},
        { name: "7", caption: '7 is for seven imaginary friends that never have time to call back'},
        { name: "8", caption: '8 is for eight symbols of a password that opens photoarchive of your long lost brother'},
        { name: "9", caption: '9 is for nine channels of an old TV where everybody speaks Russian'}
    ]);
</script>

# 36daysoftype 2020

<img class="cover" src="/img/36daysoftype_2020/36daysoftype_cover.svg"/>

[36daysoftype](https://www.36daysoftype.com/) is a marathon for desingers, illustartors and animators. Each day participants design a spicific Latin letter or digit and post it on socials. At the end of the challenge the participant has collection of 36 characters.


<ul class="gallery">
    <li v-for="char in edition_1">
        <img :src="baseUrl + 'edition_1\\' + char.name + '.svg'"/>
        <p>{{char.caption}}</p>
    </li>
</ul>

## Edition 2

I wanted to redo characters that I have designed before, here is the result:

<ul class="gallery">
    <li v-for="char in edition_2">
        <img :src="baseUrl + 'edition_2\\' + char.name + '.svg'"/>
        <p>{{char.caption}}</p>
    </li>
</ul>

<style>
    .cover{
        //border: 1px solid #00000060;
        border-radius: 4px;
        //background: #f0f0f0;
    }
    p{
        max-width: 600px;
    }
    .gallery {
        background: #fff;
        display:flex; 
        flex-wrap: wrap;
        column-gap: 15px;
        list-style-type: none;
        padding: 0;
        justify-content: space-between;
    }

    .gallery li{
        width: calc(25% - 15px);
        padding: 0;
        //border: 1px solid black;
    }

    .gallery img{
        display: block
    }

</style>
