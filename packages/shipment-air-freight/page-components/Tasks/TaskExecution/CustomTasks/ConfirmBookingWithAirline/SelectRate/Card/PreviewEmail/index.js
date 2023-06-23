import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function PreviewEmail({
	emailData,
	show,
	loading,
	onCloseModal,
	onConfirm,
}) {
	return (
		<Modal
			className="primary lg"
			show={show}
			onClose={() => onCloseModal(false)}
		>
			<div className={styles.header}>{emailData?.subject}</div>
			<div>
				<div dangerouslySetInnerHTML={{ __html: emailData?.template }} />
			</div>
			<div className={styles.footer}>
				<Button
					className="secondary md"
					disabled={loading}
					onClick={() => onCloseModal(false)}
				>
					Cancel
				</Button>
				<Button
					className="primary md"
					disabled={loading}
					onClick={() => onConfirm(false)}
				>
					Send Mail
				</Button>
			</div>
		</Modal>
	);
}

export default PreviewEmail;
