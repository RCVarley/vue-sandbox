import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import Codes from '../assets/codesMap.json';

type CodesData = [string, (string | number)[][]][];
type CodesMap = Map<string, (string | number)[][]>;
type ReadonlyCodesMap = ReadonlyMap<string, (string | number)[][]>;

const codesMap: CodesMap = new Map<string, (string | number)[][]>(
  Codes as CodesData
);

export const useCodesStore = defineStore('codes', () => {
  const sourceCodes = ref(codesMap);
  const getSourceCodes = computed<ReadonlyCodesMap>(
    () => sourceCodes.value as ReadonlyCodesMap
  );

  return { sourceCodes, getSourceCodes };
});
