<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/" id="link-home">Home</RouterLink>
        <RouterLink to="/about" id="link-about">About</RouterLink>
        <RouterLink to="/genshin" id="link-genshin">Genshin</RouterLink>
        <RouterLink to="/forms" id="link-forms">Forms</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
:root {
  --space-1: calc(var(--space) / 1.5);
  --space: 1rem;
  --space1: calc(var(--space) * 1.5);
  --space2: calc(var(--space1) * 1.5);
  --space3: calc(var(--space2) * 1.5);
  --space4: calc(var(--space3) * 1.5);
}

* {
  box-sizing: border-box;
}

.stack {
  block-size: 100%;
}

.stack > * {
  display: block;
}

.stack > * + * {
  margin-block-start: var(--space);
}

.collection {
  inline-size: 100%;
}

.collection > * {
  display: inline;
}

.collection > * + * {
  margin-block: auto;
  margin-inline-start: var(--space-1);
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
