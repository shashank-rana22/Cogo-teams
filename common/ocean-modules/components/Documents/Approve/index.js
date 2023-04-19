import { Button, Modal, Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function Approve({
	showApproved,
	setAddToWallet = () => {},
	addToWallet,
	handleApprove = () => {},
	setShowApproved = () => {},
	setShowDoc = () => {},
}) {
	const handleManualUpload = () => {
		setShowDoc({ ...showApproved, type: 'task' });
		setShowApproved(null);
	};
	return (
		<Modal
			width="auto"
			// size="lg"
			show={showApproved}
			styles={{ dialog: { width: '700px' } }}
			// closable={false}
		>
			{/* className="modal-container" */}
			<Modal.Body>
				<div className={styles.main_container}>
					<iframe
						width="100%"
						height="500px"
						src={showApproved?.document_url}
						title="something"
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footer_container}>
					<div className={styles.main}>
						<Checkbox
							checked={addToWallet}
							onChange={() => {
								setAddToWallet(false);
							}}
							className="primary md"
						/>
						Add document to Wallet
					</div>
					<div className={styles.buttons_container}>
						<Button
							themeType="secondary"
							onClick={() => setShowApproved(null)}
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								handleApprove();
							}}
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
export default Approve;
