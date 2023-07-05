import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ConfirmModal({
	setShowConfirmModal = () => {},
	handleBypassClick = () => {},
	updateLoading,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Final Confirmation !</div>
			<div className={styles.text}>
				Are you sure, you want to bypass
				{' '}
				<br />
				the process ?
			</div>
			<div className={styles.button_container}>
				<div className={styles.button_head}>
					<Button
						themeType="secondary"
						onClick={() => {
							setShowConfirmModal(false);
						}}
						disabled={updateLoading}
					>
						Cancel
					</Button>
				</div>
				<div className={styles.button_head}>
					<Button
						className="primary md"
						onClick={handleBypassClick}
						disabled={updateLoading}
					>
						Confirm
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmModal;
