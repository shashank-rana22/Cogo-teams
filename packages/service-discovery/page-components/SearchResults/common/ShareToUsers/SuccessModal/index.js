import { Button, Modal } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SuccessModal({
	show = false,
	setShow = () => {},
	title = '',
	description = '',
	cta = 'Okay',
	onClose = () => {},
}) {
	const handleClose = () => {
		setShow(false);
		onClose();
	};

	return (
		<Modal show={show} onClose={handleClose} closable={false}>
			<div className={styles.container}>
				<IcCFtick width="60px" height="60px" />

				<div className={styles.title}>{title}</div>

				<div className={styles.description}>{description}</div>

				<Button
					className={styles.submit}
					themeType="accent"
					onClick={handleClose}
				>
					{cta}
				</Button>
			</div>
		</Modal>
	);
}

export default SuccessModal;
