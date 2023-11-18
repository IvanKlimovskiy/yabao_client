import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from 'http/api.ts';
import { useAppDispatch, useAppSelector } from '../../services/store/index.types.ts';
import { closeModal } from '../../services/slices/modal';
import { AcceptModalComponent } from './index.types.ts';
import { ModalType } from '../../services/slices/modal/index.types.ts';

const InfoModal: FC<AcceptModalComponent> = ({ children, typeModal, title }) => {
  const dispatch = useAppDispatch();
  const { isOpenedModal, type } = useAppSelector((state) => state.modal);
  const [isSentActivationLink, setIsSentActivationLink] = useState(false);
  const [isReceivedActivationLink, setIsReceivedActivationLink] = useState(false);
  const { number, email } = useAppSelector((state) => state.profile.profileData);
  const closeInfoModal = () => {
    dispatch(closeModal());
  };
  const verifyEmail = () => {
    setIsSentActivationLink(true);
    api
      .post('/auth/activate/email', {
        email: children,
        number,
      })
      .then(() => {
        setIsSentActivationLink(false);
        setIsReceivedActivationLink(true);
      });
  };
  return (
    <Modal
      onHide={closeModal}
      show={isOpenedModal && type === typeModal}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{isReceivedActivationLink ? 'Подтвердите почту' : title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 style={{ fontSize: '1.2rem' }}>{isReceivedActivationLink ? `Письмо отправлено на ${email}` : children}</h4>
      </Modal.Body>
      <Modal.Footer>
        {typeModal === ModalType.Accept ? (
          isReceivedActivationLink ? null : (
            <Button disabled={isSentActivationLink} type="button" onClick={verifyEmail}>
              {isSentActivationLink ? 'Отправка...' : 'Да'}
            </Button>
          )
        ) : null}
        <Button
          type="button"
          disabled={isSentActivationLink}
          onClick={() => {
            dispatch(closeInfoModal);
          }}>
          {typeModal === ModalType.Accept ? (isReceivedActivationLink ? 'ОК' : 'Нет') : 'ОК'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
