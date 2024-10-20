import React, { useState } from 'react';
import List from './List';
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  
  // 좌측 버튼의 선택 상태를 관리하는 변수 추가
  const [selectedCategoryButton, setSelectedCategoryButton] = useState(null);

  const lists = {
    学ぶ: {
      '1F': ['日本語を学ぶ', '新しいことを学ぶ', 'Cherry'],
      '2F': ['Apple', 'Banana', 'Grape'],
      '3F': ['Orange', 'Peach', 'Plum'],
      '4F': ['Study A', 'Study B', 'Study C'],
      '5F': ['Study D', 'Study E', 'Study F'],
      '研究棠1F': ['Research A1', 'Research B1', 'Research C1'],
      '研究棠2F': ['Research A2', 'Research B2', 'Research C2'],
      '研究棠3F': ['Research A3', 'Research B3', 'Research C3'],
    },
    買う: {
      '1F': ['野菜を買う', '果物を買う', 'Spinach'],
      '2F': ['Tomato', 'Cucumber', 'Pepper'],
      '3F': ['Onion', 'Garlic', 'Potato'],
      '4F': ['Product A', 'Product B', 'Product C'],
      '5F': ['Product D', 'Product E', 'Product F'],
      '研究棠1F': ['Item A1', 'Item B1', 'Item C1'],
      '研究棠2F': ['Item A2', 'Item B2', 'Item C2'],
      '研究棠3F': ['Item A3', 'Item B3', 'Item C3'],
    },
    運動する: {
      '1F': ['ランニングする', 'ジムに行く', 'Yoga'],
      '2F': ['水泳', 'サイクリング', 'テニス'],
      '3F': ['バスケットボール', 'サッカー', 'バレーボール'],
      '4F': ['Workout A', 'Workout B', 'Workout C'],
      '5F': ['Workout D', 'Workout E', 'Workout F'],
      '研究棠1F': ['Exercise A1', 'Exercise B1', 'Exercise C1'],
      '研究棠2F': ['Exercise A2', 'Exercise B2', 'Exercise C2'],
      '研究棠3F': ['Exercise A3', 'Exercise B3', 'Exercise C3'],
    },
    教授に会いに行く: {
      '1F': ['オフィスアワーに行く', '質問をする', '相談する'],
      '2F': ['レポートを持って行く', '面談をする', '資料を確認する'],
      '3F': ['フィードバックをもらう', '討論する', '相談する'],
      '4F': ['Meeting A', 'Meeting B', 'Meeting C'],
      '5F': ['Meeting D', 'Meeting E', 'Meeting F'],
      '研究棠1F': ['Consult A1', 'Consult B1', 'Consult C1'],
      '研究棠2F': ['Consult A2', 'Consult B2', 'Consult C2'],
      '研究棠3F': ['Consult A3', 'Consult B3', 'Consult C3'],
    },
    作業する: {
      '1F': ['宿題をする', 'プロジェクトを進める', '書類を整理する'],
      '2F': ['メールを確認する', '会議をする', '報告書を書く'],
      '3F': ['計画を立てる', '時間を管理する', 'リサーチをする'],
      '4F': ['Task A', 'Task B', 'Task C'],
      '5F': ['Task D', 'Task E', 'Task F'],
      '研究棠1F': ['Work A1', 'Work B1', 'Work C1'],
      '研究棠2F': ['Work A2', 'Work B2', 'Work C2'],
      '研究棠3F': ['Work A3', 'Work B3', 'Work C3'],
    },
    相談する: {
      '3F': ['医務室'],
      '4F': ['事務室', '就職支援室'],
    },
  };

  const handleListSelect = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
    setSelectedFloor(null);
    setSelectedCategoryButton(category); // 카테고리 선택 시 상태 업데이트
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
  };

  const selectedList =
    selectedCategory && selectedFloor
      ? lists[selectedCategory][selectedFloor]
      : selectedCategory
      ? Object.values(lists[selectedCategory]).flat()
      : null;

  const borderStyle = {
    border: '2px solid #ccc', // 테두리 굵기 설정
    borderRadius: '5px', // 모서리 둥글게
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      {/* left button area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', padding: '20px' }}>
        <h3 style={{ gridColumn: 'span 2', textAlign: 'center', margin: '0' }}>ジャンル別検索</h3>
        {Object.keys(lists).map((category) => (
          <button
            key={category}
            onClick={() => handleListSelect(category)}
            style={{
              padding: '10px',
              width: '150px', // 고정 너비 설정
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis', // 넘치는 텍스트를 "..."로 표시
              backgroundColor: selectedCategoryButton === category ? 'lightblue' : 'white', // 선택된 카테고리 버튼 색상
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* center list area */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          textAlign: 'center',
          overflowY: 'auto',
          maxHeight: '400px',
          scrollbarWidth: 'none', // Firefox
        }}
        className="scroll-hidden"
      >
        <List items={selectedList} onItemSelect={handleItemSelect} selectedItem={selectedItem} />
      </div>

      {/* right button area */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
        {['1F', '2F', '3F', '4F', '5F', '研究棠1F', '研究棠2F', '研究棠3F'].map((floor) => (
          <button
            key={floor}
            onClick={() => handleFloorSelect(floor)}
            style={{
              padding: '10px',
              margin: '5px',
              backgroundColor: selectedFloor === floor ? 'lightblue' : 'white',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100px', // 고정 너비
            }}
          >
            {floor}
          </button>
        ))}
      </div>

      <style>
        {`
          .scroll-hidden::-webkit-scrollbar {
            display: none; /* Chrome/Safari */
          }
        `}
      </style>
    </div>
  );
};

export default App;
