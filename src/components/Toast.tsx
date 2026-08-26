import styled from 'styled-components';

const ToastBox = styled.div<{ $show: boolean }>`
  position: fixed;
  z-index: 200;
  left: 50%;
  bottom: 92px;
  width: max-content;
  max-width: calc(100% - 40px);
  transform: translate(-50%, ${p => p.$show ? '0' : '12px'});
  padding: 11px 16px;
  border-radius: 999px;
  background: rgba(31, 32, 38, .94);
  color: white;
  box-shadow: 0 8px 22px rgba(0,0,0,.22);
  font-size: 12px;
  opacity: ${p => p.$show ? 1 : 0};
  pointer-events: none;
  transition: .2s ease;
`;

const Toast = ({ show, children }: { show:boolean; children:React.ReactNode }) => (
  <ToastBox role="status" aria-live="polite" $show={show}>✓ {children}</ToastBox>
);

export default Toast;
