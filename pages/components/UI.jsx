import React, { useState } from 'react';
import { useStore, useDecreaseHungerAndHappiness } from '../store/store'; // store.js 파일 import
import Item from './Item'; // Item.jsx 파일 import

function UI() {
  useDecreaseHungerAndHappiness(); // 5분마다 배고픔과 행복도 감소

  const { cat, feedCat, playWithCat, items, user, purchasedItems } = useStore();
  const { hunger, happiness } = cat;
  const { username, points } = user;

  const [message, setMessage] = useState('');

  const handlePurchaseFailed = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000); // 3초 후 메시지 지우기
  };

  return (
    <div>
      {/* 고양이 키우기 UI 요소 */}
      <p>사용자: {username}</p>
      <p>포인트: {points}p</p>
      <button onClick={feedCat}>밥 주기</button>
      <button onClick={() => playWithCat(10)}>쓰다듬기</button>
      <div>
        {/* 고양이 상태 표시 (배고픔, 행복도 등) */}
        <p>배고픔: {hunger}%</p>
        <p>행복도: {happiness}%</p>
      </div>
      {/* 아이템 구매 UI */}
      <div>
        {/* 아이템 목록 */}
        {items.map((item) => (
          <Item key={item.id} item={item} onPurchaseFailed={handlePurchaseFailed} />
        ))}
      </div>
      {/* 구매한 아이템 목록 표시 */}
      <div>
        <h3>구매한 아이템</h3>
        {purchasedItems.length > 0 ? (
          <ul>
            {purchasedItems.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>구매한 아이템이 없습니다.</p>
        )}
      </div>
      {/* 포인트 부족 메시지 표시 */}
      {typeof message === 'string' && message && <p>{message}</p>}
    </div>
  );
}

export default UI;