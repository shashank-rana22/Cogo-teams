import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ConfirmModal({
	task,
	setShowModal = () => {},
	handleOnClick = () => {},
	setUpdateModal = () => {},
	loading = false,
}) {
	const confirmMessage =		task === 'confirm_booking'
		? 'as per customer requirement'
		: 'correct as mentioned in Final AWB';
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Final Confirmation !</div>
			<div className={styles.text}>
				I agree that shipment parameters entered are
				<br />
				{confirmMessage}

			</div>
			<div className={styles.button_container}>
				<div className={styles.button_head}>
					<Button
						themeType="secondary"
						onClick={() => {
							setShowModal(false);
							setUpdateModal(true);
						}}
						disabled={loading}
					>
						Disagree
					</Button>
				</div>
				<div className={styles.button_head}>
					<Button
						themeType="primary"
						onClick={handleOnClick}
						disabled={loading}
					>
						Agree
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmModal;
