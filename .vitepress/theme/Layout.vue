<script setup lang="ts">
import { useData } from 'vitepress'

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
</script>

<template>
  <div class="page-container">
  <div v-if="frontmatter.home">
    <!-- <h1>{{ site.title }}</h1>
    <p>{{ site.description }}</p> -->
    <Content />
  </div>
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</div>
</template>
