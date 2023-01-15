<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCodesStore } from '@/stores/codes';

interface LineOfCode {
  name: string;
  chunks: (number | string)[][];
}

const store = useCodesStore();

const base = ref(3);
const codes = ref(new Array<LineOfCode>());

function addLine() {
  codes.value.push({
    name: '',
    chunks: [],
  });
}

function addChunk(lineIndex: number) {
  codes.value[lineIndex]?.chunks.push(['', '', '']);
}

function reset() {
  codes.value = [];
  const sc = store.getSourceCodes.value;
  for (const line in sc) {
    const chunks: (number | string)[][] = sc.get(line)!;

    codes.value.push({
      name: line,
      chunks,
    });
  }
}

function onChangeCharacter(
  lineIndex: number,
  chunkIndex: number,
  charIndex: number,
  event: Event
) {
  const { value } = event.target as HTMLInputElement;
  codes.value[lineIndex].chunks[chunkIndex][charIndex] = value;
}

onMounted(() => {
  addLine();
});
</script>

<template>
  <main class="stack">
    <div class="collection">
      <label for="base-counter">Base</label>
      <input type="number" v-model="base" name="base" id="base-counter" />
    </div>
    <div class="collection">
      <button @click="reset">Reset</button>
    </div>
    <div
      v-for="(line, lineIndex) in codes"
      :key="lineIndex"
      class="collection line-of-code"
    >
      <input v-model="line.name" type="text" placeholder="Name" />
      <span
        v-for="(chunk, chunkIndex) in line.chunks"
        :key="chunkIndex"
        class="collection line-of-code__chunk"
      >
        <input
          v-for="(character, charIndex) in chunk"
          :key="charIndex"
          :value="character"
          type="text"
          placeholder="."
          @change="onChangeCharacter(lineIndex, chunkIndex, charIndex, $event)"
        />
      </span>
      <span class="collection line-of-code__chunk ghost">
        <input type="text" placeholder="." v-on:focusin="addChunk(lineIndex)" />
        <input type="text" placeholder="." v-on:focusin="addChunk(lineIndex)" />
        <input type="text" placeholder="." v-on:focusin="addChunk(lineIndex)" />
      </span>
    </div>
  </main>
</template>

<style>
.line-of-code > .line-of-code__chunk * {
  inline-size: 1.5rem;
  text-align: center;
}

.line-of-code > .line-of-code__chunk > * + * {
  margin-inline-start: 0;
}

.line-of-code > .line-of-code__chunk.ghost * {
  opacity: 50%;
}

.line-of-code > *:first-child {
  inline-size: 6rem;
}
</style>
