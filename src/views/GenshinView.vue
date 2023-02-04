<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue';
import { useCodesStore } from '@/stores/codes';
import cloneDeep from 'lodash.clonedeep';

interface LineOfCode {
  name: string;
  chunks: (number | string)[][];
}

interface HTMLInputElementEvent extends Omit<Event, 'target'> {
  target: HTMLInputElement;
}

const store = useCodesStore();

const base = ref(3);
const codes = ref(new Array<LineOfCode>());
const inputs = ref(new Map<string, HTMLInputElement>());

const validNumbers = computed(() => {
  const result = [];

  for (let i = 0; i <= base.value; i++) {
    result.push(i);
  }

  return result;
});

function focusElement(key: string) {
  nextTick(() => {
    const el = inputs.value.get(key)!;
    el.focus();
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
  for (const key of Object.keys(store.getSourceCodes)) {
    codes.value.push({
      name: key,
      chunks: cloneDeep(store.getSourceCodes[key]),
    });
  }
}

function onChangeName(lineIndex: number, event: HTMLInputElementEvent) {
  const { value } = event.target;
  codes.value[lineIndex].name = value;
}

function onChangeCharacter(
  lineIndex: number,
  chunkIndex: number,
  charIndex: number,
  event: HTMLInputElementEvent
) {
  const { value } = event.target!;
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
      <input
        type="number"
        v-model.number="base"
        name="base"
        id="base-counter"
      />
    </div>
    <div class="box">valid numbers: {{ validNumbers }}</div>
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
        :ref="(el) => inputs.set(`${lineIndex}`, el as HTMLInputElement)"
        type="text"
        placeholder="Name"
        @input="onChangeName(lineIndex, $event as HTMLInputElementEvent)"
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
              inputs.set(`${lineIndex}:${chunkIndex}:${charIndex}`, el as HTMLInputElement);
            }
          "
          type="text"
          placeholder="."
          @focus="($event.target as HTMLInputElement).select()"
          @input="
            onChangeCharacter(
              lineIndex,
              chunkIndex,
              charIndex,
              $event as HTMLInputElementEvent
            )
          "
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
