import { Placeholder, Modal } from '@cogoport/components';
import { IcMDocument } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function MailAttachments({ allAttachements, loading }) {
	const [showPreview, setShowPreview] = useState(null);
	const externalAttachements = allAttachements.filter((att) => !att.isInline);

	return (
		<div className={styles.container}>
			{loading ? (
				<div className={styles.content}>
					<Placeholder width="120px" height="18px" />
				</div>
			) : (
				<div className={styles.content}>
					{externalAttachements.map((item) => (
						<div className={styles.preview_wrapper} key={item.id}>
							<div
								role="presentation"
								className={styles.doc_content}
								onClick={() => setShowPreview(item)}
							>
								<IcMDocument />
								<div className={styles.name}>{decodeURI(item.name)}</div>
							</div>
						</div>
					))}
				</div>

			)}
			{showPreview ? (
				<Modal
					show={showPreview}
					onClose={() => setShowPreview(null)}
					size="md"
					placement="top"
					onOuterClick={() => setShowPreview(null)}
					showCloseIcon
					className={styles.styled_ui_modal_dialog}
				>
					<Modal.Header title="Preview" />
					<Modal.Body>
						<object
							height="450"
							width="550"
							aria-label="Doc Preview"
							// eslint-disable-next-line max-len
							data={`data:${externalAttachements[0].contentType};base64,${externalAttachements[0].contentBytes}`}
						/>
					</Modal.Body>

				</Modal>
			) : null}
		</div>
	);
}

export default MailAttachments;
