<script setup>
import { ref } from "vue";

const baseUrl = "/img/holiday_cards/";

const originalCards = [
    { name: "busy_office_cat", desc: "Birthday card for Nurlan", date: new Date("August 1, 2024")},
    { name: "bunny_with_fans", desc: "Welcome to the Germany card for Valentina", date: new Date("August 1, 2024")},
    { name: "silly_boy", desc: "Birthday card for Nastya", date: new Date("June 1, 2024") },
    { name: "mouse_dancing", desc: "Birthday card for Aimee", date: new Date("May 1, 2024") },
    { name: "disco_cat", desc: "Birthday card for Ivo", date: new Date("May 1, 2024") },
    { name: "man_twerking", desc: "Birthday card for Max", date: new Date("September 1, 2023") },
    { name: "hermit", desc: "Birthday card for Yura", date: new Date("October 1, 2023") },
    { name: "cat_on_a_boat", desc: "Birthday card for Kamran", date: new Date("October 1, 2023") },
    { name: "cat_on_christmas_tree", desc: "Christmas card for Ivo and Anieke", date: new Date("December 1, 2022") },
    { name: "accurate_angel", desc: "Christmas card for Ales and Leonid", date: new Date("December 1, 2022") },
    { name: "krampus", desc: "Christmas card Nastya and Yura", date: new Date("December 1, 2022") },
    { name: "moon_kissing_sun", desc: "Christmas card for Kirill and Sergei", date: new Date("December 1, 2022") },
    { name: "christmas_sweater", desc: "Christmas card for Aimee", date: new Date("December 1, 2022") },
    { name: "christmas_decorations", desc: "Christmas card Lies and Hans", date: new Date("December 1, 2022") },
    ];

originalCards.sort((a, b) => {
    if (a.date > b.date) return -1;
    else if (a.date < b.date) return 1;
    else return 0;
});

const cards = ref(originalCards);

</script>


# Holiday cards

<ul class="holiday-cards-gallery">
    <li v-for="card in cards">
        <img loading="lazy" width="200px" :src='baseUrl + card.name + ".jpg"' />
        <p>{{card.desc + " | " + card.date.toLocaleDateString("en-NL", { day: "numeric", month: "long", year: "numeric" })}}</p>
    </li>
</ul>

<style lang="scss">
    .holiday-cards-gallery {
        max-width: 600px;
        display: grid;
        gap: 16px;
        grid-template-columns: 1fr;
    }
</style>