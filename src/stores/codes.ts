import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import Codes from '../assets/codesObject.json';

export const useCodesStore = defineStore('codes', () => {
  const sourceCodes: Ref<Record<string, (string | number)[][]>> = ref(Codes);
  const getSourceCodes = computed<Record<string, (string | number)[][]>>(
    () => sourceCodes.value
  );

  return { sourceCodes, getSourceCodes };
});
