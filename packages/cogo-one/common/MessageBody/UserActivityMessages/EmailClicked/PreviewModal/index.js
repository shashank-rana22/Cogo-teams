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
			className={styles.styled_ui_modal_dialog}
			onClose={() => setPreviewModal(false)}
			scroll
		>
			<Modal.Header title="Preview Email" />
			<div className={styles.container}>
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

			</div>

		</Modal>
	);
}

export default PreviewModal;
