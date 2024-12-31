import { create } from 'zustand';
import { useEffect } from 'react';
import React from 'react';

// 초기 상태 설정
const initialState = {
  user: {
    username: '사용자1', 
    points: 100, // 초기 포인트
  },
  cat: {
    name: '냥냥이',
    hunger: 50,
    happiness: 50,
  },
  items: [
    { id: 1, name: '고양이 옷', price: 100, effect: '행복도 증가' },
    { id: 2, name: '고양이 장난감', price: 50, effect: '놀이 시간 증가' },
  ],
  purchasedItems: [], // 구매한 아이템 목록
};

// 상태 업데이트 함수 정의
const useStore = create((set) => ({
  ...initialState,

  // 포인트 증가
  addPoints: (amount) => set((state) => ({ ...state, user: { ...state.user, points: state.user.points + amount } })),

  // 고양이 상태 변경
  feedCat: () => set((state) => ({ ...state, cat: { ...state.cat, hunger: Math.max(0, Math.min(100, state.cat.hunger + 10)) } })),
  playWithCat: (amount) => set((state) => ({ ...state, cat: { ...state.cat, happiness: Math.max(0, Math.min(100, state.cat.happiness + amount)) } })),

  // 아이템 구매
  buyItem: (itemId) => {
    let success = false;
    set((state) => {
      const item = state.items.find((item) => item.id === itemId);
      const alreadyPurchased = state.purchasedItems.some((purchasedItem) => purchasedItem.id === itemId);
      if (item && !alreadyPurchased && state.user.points >= item.price) {
        success = true;
        return {
          ...state,
          user: { ...state.user, points: state.user.points - item.price },
          purchasedItems: [...state.purchasedItems, item],
        };
      }
      return state;
    });
    return success;
  },

  // 배고픔과 행복도 감소
  decreaseHungerAndHappiness: () => set((state) => ({
    ...state,
    cat: {
      ...state.cat,
      hunger: Math.max(0, state.cat.hunger - 10),
      happiness: Math.max(0, state.cat.happiness - 10),
    }
  })),
}));

// 5분마다 배고픔과 행복도 감소
function useDecreaseHungerAndHappiness() {
  const decreaseHungerAndHappiness = useStore((state) => state.decreaseHungerAndHappiness);

  useEffect(() => {
    const interval = setInterval(() => {
      decreaseHungerAndHappiness();
    }, 300000); // 5분 = 300,000 밀리초

    return () => clearInterval(interval);
  }, [decreaseHungerAndHappiness]);
}

const Store = () => {
  return (
    <div />
  );
};

export { useStore, useDecreaseHungerAndHappiness };
export default Store;