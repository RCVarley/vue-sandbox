import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import * as Codes from '@/assets/codesMap.json';

type CodesMap = [string, (string | number)[][]][];
const c: CodesMap = Codes as CodesMap;

export const useCodesStore = defineStore('codes', () => {
  const sourceCodes = ref(new Map<string, (string | number)[][]>(c));
  const getSourceCodes = computed(() => sourceCodes);

  return { sourceCodes, getSourceCodes };
});
