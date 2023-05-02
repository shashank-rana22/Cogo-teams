import React, { ReactNode } from 'react';

import styles from './styles.module.css';

interface ModalProps {
	onClose?: () => void;
	children?: ReactNode;
	onOutsideClick?: boolean;

}

function Modal({
	children = null,
	onClose = () => {},
	onOutsideClick = true,
}:ModalProps) {
	const handleBackdropClick = () => {
		if (onOutsideClick) {
			onClose();
		}
	};

	return (
		<div className={styles.modal_container}>
			<div
				role="presentation"
				onClick={handleBackdropClick}
				className={styles.backdrop}
			/>
			<div className={styles.modal_content}>
				<div>{children}</div>
			</div>
		</div>

	);
}

export default Modal;
