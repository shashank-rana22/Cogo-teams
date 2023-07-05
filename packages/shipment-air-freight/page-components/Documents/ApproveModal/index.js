import { Button, Modal, Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function ApproveModal({
	showApproved,
	setAddToWallet = () => {},
	addToWallet,
	handleApprove = () => {},
	setShowApproved = () => {},
	setShowDoc = () => {},
}) {
	const handleManualUpload = () => {
		setShowDoc((prev) => ({ ...prev, ...showApproved, type: 'task' }));
		setShowApproved(false);
	};

	return (
		<Modal
			size="lg"
			show={showApproved}
			onClose={() => setShowApproved(false)}
		>
			<Modal.Body>
				<div className={styles.main_container}>
					<iframe
						width="100%"
						height="500px"
						src={showApproved?.document_url}
						title="Approve Document"
					/>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.footer_container}>
					<div className={styles.main}>
						<Checkbox
							checked={addToWallet}
							onChange={() => setAddToWallet(false)}
						/>
						Add document to Wallet
					</div>

					<div className={styles.buttons_container}>
						<Button
							themeType="secondary"
							onClick={() => setShowApproved(false)}
						>
							Cancel
						</Button>
						<Button
							onClick={handleApprove}
							themeType="primary"
						>
							Approve
						</Button>

						<Button onClick={handleManualUpload}>Manual Upload</Button>
					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default ApproveModal;
