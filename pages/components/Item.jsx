import React from 'react';
import { useStore } from '../store/store';

function Item({ item, onPurchaseFailed }) {
  const buyItem = useStore((state) => state.buyItem);
  const purchasedItems = useStore((state) => state.purchasedItems);

  const handleBuyItem = () => {
    const alreadyPurchased = purchasedItems.some((purchasedItem) => purchasedItem.id === item.id);
    if (alreadyPurchased) {
      onPurchaseFailed(`이미 있는 아이템입니다: ${item.name}`);
      return;
    }

    const success = buyItem(item.id);
    if (!success) {
      onPurchaseFailed(`포인트가 부족하여 ${item.name}을(를) 구매할 수 없습니다.`);
    }
  };

  return (
    <button onClick={handleBuyItem}>
      {item.name} ({item.price} 포인트)
    </button>
  );
}

export default Item;