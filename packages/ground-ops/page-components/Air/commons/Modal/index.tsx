import React, { ReactNode } from 'react';

import styles from './styles.module.css';

interface ModalProps {
	onClose?: () => void;
	children?: ReactNode;
	onOutsideClick?: boolean;
	style?: React.CSSProperties;
}

function Modal({
	style,
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
			<div className={styles.modal_content} style={style}>
				<div className={styles.modal_body}>
					<div>{children}</div>
				</div>
			</div>
		</div>

	);
}

export default Modal;
