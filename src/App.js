// 약물 검색 웹앱 - 자동완성까지 귀엽게

import React, { useState } from 'react';
import data from './약물데이터.json';

function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [sameDoseOnly, setSameDoseOnly] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    const lower = value.toLowerCase();
    const filtered = data.filter((item) =>
      item.약품명.toLowerCase().startsWith(lower)
    ).slice(0, 10);
    setSuggestions(filtered);
  };

  const handleSuggestionClick = (item) => {
    setQuery(item.약품명);
    setSelected(item);
    setSuggestions([]);
    setSameDoseOnly(false);
  };

  const getRelated = () => {
    if (!selected) return [];
    return data.filter((item) => {
      const sameIngredient = item.성분명 === selected.성분명;
      const sameDose = item.용량 === selected.용량;
      return sameIngredient && (!sameDoseOnly || sameDose);
    });
  };

  const related = getRelated();

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🔍 약물 검색기</h1>
      <div style={{ position: 'relative', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="제품명을 입력하세요"
          value={query}
          onChange={handleInputChange}
          style={{ padding: '0.5rem', width: '100%' }}
        />
        {suggestions.length > 0 && (
          <ul style={dropdownStyle}>
            {suggestions.map((item, index) => (
              <li key={index} onClick={() => handleSuggestionClick(item)} style={dropdownItem}>
                {item.약품명}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div style={{ marginTop: '2rem' }}>
          <h2>✨ 선택된 제품: {selected.약품명}</h2>
          <label>
            <input
              type="checkbox"
              checked={sameDoseOnly}
              onChange={() => setSameDoseOnly(!sameDoseOnly)}
            />{' '}
            동일 용량만 보기
          </label>

          <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>제품명</th>
                <th style={thStyle}>성분명</th>
                <th style={thStyle}>용량</th>
                <th style={thStyle}>제약사</th>
              </tr>
            </thead>
            <tbody>
              {related.map((item, idx) => (
                <tr key={idx}>
                  <td style={tdStyle}>{item.약품명}</td>
                  <td style={tdStyle}>{item.성분명}</td>
                  <td style={tdStyle}>{item.용량}</td>
                  <td style={tdStyle}>{item.제약사}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  backgroundColor: '#f0f0f0',
  textAlign: 'left'
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px'
};

const dropdownStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: 'white',
  border: '1px solid #ccc',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  maxHeight: '200px',
  overflowY: 'auto',
  zIndex: 10
};

const dropdownItem = {
  padding: '0.5rem',
  cursor: 'pointer',
  borderBottom: '1px solid #eee'
};

export default App;
