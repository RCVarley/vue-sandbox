<script setup lang="ts">
import { ref, onMounted, nextTick, type ComponentPublicInstance } from 'vue';
import { useCodesStore } from '@/stores/codes';

interface LineOfCode {
  name: string;
  chunks: (number | string)[][];
}

const store = useCodesStore();

const base = ref(3);
const codes = ref(new Array<LineOfCode>());
const inputs = ref(new Map<string, Element | ComponentPublicInstance | null>());

function focusElement(key: string) {
  nextTick(() => {
    const el = inputs.value.get(key) as HTMLInputElement;
    el.focus();
  });
}

function blurElement(key: string) {
  nextTick(() => {
    const el = inputs.value.get(key) as HTMLInputElement;
    el.blur();
  });
}

function addLine() {
  codes.value.push({
    name: '',
    chunks: [],
  });
}

function addChunk(lineIndex: number, goto = true) {
  const chunks = codes.value[lineIndex].chunks;
  chunks.push(['', '', '']);

  if (goto) {
    focusElement(`${lineIndex}:${chunks.length - 1}:0`);
  }
}

function clear() {
  codes.value = [];
  nextTick(() => {
    inputs.value.clear();
  });
  nextTick(() => {
    addLine();
  });
}

function reset() {
  codes.value = [];
  for (const line of store.getSourceCodes) {
    codes.value.push({
      name: line[0],
      chunks: [...line[1]],
    });
  }
}

function onChangeName(lineIndex: number, event: Event) {
  const { value } = event.target as HTMLInputElement;
  codes.value[lineIndex].name = value;
}

function onChangeCharacter(
  lineIndex: number,
  chunkIndex: number,
  charIndex: number,
  event: Event
) {
  const { value } = event.target as HTMLInputElement;
  const chunks = codes.value[lineIndex].chunks;
  chunks[chunkIndex][charIndex] = value;

  if (!value) {
    return;
  }

  if (charIndex < 2) {
    focusElement(`${lineIndex}:${chunkIndex}:${charIndex + 1}`);
  } else if (chunkIndex < chunks.length - 1) {
    focusElement(`${lineIndex}:${chunkIndex + 1}:0`);
  }
}

function onEnter(lineIndex: number) {
  if (lineIndex === codes.value.length - 1) {
    addLine();
  }

  focusElement(`${lineIndex + 1}`);
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
      <button @click="clear">Clear</button>
      <button @click="addLine">Add Line</button>
    </div>
    <div
      v-for="(line, lineIndex) in codes"
      :key="lineIndex"
      class="collection line-of-code"
      @keyup.enter="onEnter(lineIndex)"
    >
      <input
        :value="line.name"
        :ref="(el) => inputs.set(`${lineIndex}`, el)"
        type="text"
        placeholder="Name"
        @input="onChangeName(lineIndex, $event)"
      />
      <span
        v-for="(chunk, chunkIndex) in line.chunks"
        :key="chunkIndex"
        class="collection line-of-code__chunk"
      >
        <input
          v-for="(character, charIndex) in chunk"
          :key="charIndex"
          :value="character"
          :ref="
            (el) => {
              inputs.set(`${lineIndex}:${chunkIndex}:${charIndex}`, el);
            }
          "
          type="text"
          placeholder="."
          @input="onChangeCharacter(lineIndex, chunkIndex, charIndex, $event)"
        />
      </span>
      <span
        class="collection line-of-code__chunk line-of-code__chunk--ghost"
        @focusin="addChunk(lineIndex)"
      >
        <input v-for="(_, i) in 3" :key="i" type="text" placeholder="." />
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

.line-of-code__chunk--ghost {
  opacity: 50%;
}

.line-of-code > *:first-child {
  inline-size: 6rem;
}
</style>
