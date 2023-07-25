import { Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import PreviewHtml from './PreviewHtml';
import styles from './styles.module.css';

function PreviewModal({
	previewModal = false,
	setPreviewModal = () => {},
	body = '',
	subject = '',
	name = '',
}) {
	return (
		<Modal
			show={previewModal}
			size="sm"
			onClose={() => setPreviewModal(false)}
			scroll={false}
		>
			<Modal.Header title="Preview Email" />
			<Modal.Body className={styles.styled_modal_body}>
				<div className={styles.title}>{startCase(name)}</div>
				<div className={styles.message}>
					Following is a preview of the mail -
				</div>

				<div className={styles.subject_name}>
					Re:
					{' '}
					{subject}
				</div>
				<PreviewHtml html={body} />

			</Modal.Body>

		</Modal>
	);
}

export default PreviewModal;
