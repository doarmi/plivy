import styled from 'styled-components';

export const SearchContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 80px;
  background: var(--paper, #f5f2ea);

  main {
    padding: 22px;
  }
`;

export const SearchBox = styled.label`
  height: 49px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 15px;
  border: 1px solid #cfd0d5;
  border-radius: 8px;
  background: #fff;

  input {
    flex: 1;
    border: 0;
    background: transparent;
    outline: 0;
  }
`;

export const QuickTags = styled.div`
  display: flex;
  gap: 7px;
  overflow: auto;
  margin-top: 14px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  button {
    flex: 0 0 auto;
    padding: 8px 11px;
    border: 1px solid #dfd6e7;
    border-radius: 14px;
    background: #f3eef5;
    color: var(--purple, #5d00ef);
    font-size: 11px;
  }
`;

export const ResultCount = styled.p`
  margin: 24px 0 12px;
  font: 10px/1 var(--font-mono);
  letter-spacing: 0.1em;
`;

export const ResultList = styled.section`
  display: grid;
  gap: 11px;

  .empty {
    padding: 70px 10px;
    text-align: center;
    color: #999;
  }
`;

export const ResultCard = styled.button`
  display: grid;
  grid-template-columns: 70px 1fr 24px;
  gap: 12px;
  align-items: center;
  padding: 10px;
  border: 1px solid #e0dde0;
  border-radius: 9px;
  background: #fff;
  text-align: left;
  width: 100%;

  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 4px;
  }

  h2 {
    font-size: 13px;
    margin: 0;
  }

  p {
    margin-top: 5px;
    color: #888;
    font-size: 10px;
    margin-bottom: 0;
  }

  small {
    display: block;
    margin-top: 7px;
    color: var(--home-primary, #c72f63);
    font-size: 9px;
  }

  b {
    font-size: 18px;
    color: #ccc;
    font-weight: 300;
  }
`;
