import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function ConfirmModal({ confirm, setConfirm, clickHandler, loading }) {
	const closeModalHandler = () => {
		setConfirm({ open: false });
	};

	return (
		<Modal show={confirm.open} onClose={closeModalHandler}>
			<div className={styles.container}>
				<h2>{`Are you sure you want to ${confirm.action} plan?`}</h2>
				<div className={styles.row}>
					<Button disabled={loading} themeType="secondary" onClick={closeModalHandler}>No</Button>
					<Button disabled={loading} onClick={() => clickHandler(confirm.action)}>Yes</Button>
				</div>
			</div>

		</Modal>
	);
}

export default ConfirmModal;
