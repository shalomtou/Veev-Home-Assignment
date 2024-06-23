import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const projectListState = atom({
  key: 'projectListState',
  default: [], // Initial default value
  effects_UNSTABLE: [persistAtom], // to persist data on page reload
});

