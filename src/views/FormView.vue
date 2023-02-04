<template>
  <div class="form">
    <label for="text-1">Text 1</label>
    <input type="text" id="text-1" />

    <label for="text-2">Text 2</label>
    <input type="text" id="text-2" />

    <label for="select-1">Select</label>
    <select id="select-1">
      <option value="101">One-o-one</option>
      <option value="102">One-o-two</option>
    </select>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .form {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
