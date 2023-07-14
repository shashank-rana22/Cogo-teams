import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

function PreviewModal({ previewModal = false, setPreviewModal = () => {} }) {
	return (
		<Modal
			show={previewModal}
			size="sm"
			onClose={() => setPreviewModal(false)}
		>
			<Modal.Header title="Preview Email" />
			<div className={styles.container}>
				<div className={styles.title}>Clicked Email</div>
				<div className={styles.message}>
					Following is a preview of the mail -
				</div>

				<div className={styles.subject_name}>
					Re: Subject line here
				</div>

				<div className={styles.subject_content}>
					I want to get rates for Nhava Sheva to Jebel Ali.
					Can I get them asap?
				</div>
			</div>

		</Modal>
	);
}

export default PreviewModal;
