import React, { useRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  
  &.modal-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  
  &.modal-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }
  
  &.modal-exit {
    opacity: 1;
    transform: scale(1);
  }
  
  &.modal-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #1a73e8;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: #1557b0;
  }
`;

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [url, setUrl] = React.useState('');
  const nodeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
    setUrl('');
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ModalOverlay onClick={onClose} ref={nodeRef}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <h2>Enter YouTube Live Stream URL</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              required
            />
            <Button type="submit">Connect</Button>
          </form>
        </ModalContent>
      </ModalOverlay>
    </CSSTransition>
  );
};

export default Modal;