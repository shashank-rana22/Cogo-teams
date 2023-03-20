import { Button, Modal, CheckBox } from '@cogoport/components';

import styles from './styles.module.css';

function Approve({
	showConfirmed,
	setAddToWallet,
	addToWallet,
	handleApprove,
	setShowConfirmed,
	setShow,
}) {
	const handleManualUpload = () => {
		setShow({ ...showConfirmed, type: 'task' });
		setShowConfirmed(null);
	};
	return (
		<Modal
			width="auto"
			show={showConfirmed}
			styles={{ dialog: { width: '700px' } }}
			closable={false}
		>
			<div className={styles.main_container}>
				<iframe
					width="100%"
					height="500px"
					src={showConfirmed?.document_url}
					title="something"
				/>
				<div className={styles.footer_container}>
					<div className={styles.main}>
						<CheckBox
							checked={addToWallet}
							onChange={() => {
								setAddToWallet(false);
							}}
							themeType="secondary"
						/>
						Add document to Wallet
					</div>
					<div className={styles.button_container}>
						<Button
							themeType="secondary"
							onClick={() => setShowConfirmed(null)}
						>
							Reject
						</Button>
						<Button
							onClick={() => {
								handleApprove();
							}}
							themeType="secondary"
						>
							Approve
						</Button>
						<Button onClick={handleManualUpload}>Manual Upload</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default Approve;
