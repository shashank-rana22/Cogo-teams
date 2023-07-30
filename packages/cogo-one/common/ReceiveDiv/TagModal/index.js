import { Modal } from '@cogoport/components';

import DocumentTypeSID from '../../DocumentTypeSID';

import styles from './styles.module.css';

function TagModal({
	setTagModal = () => {}, tagModal = false, formattedData = {}, documentTagUrl = '',
	setDocumentTagUrl = () => {},
}) {
	const { organization_id = '' } = formattedData || {};
	return (
		<Modal
			show={tagModal}
			onClose={() => setTagModal(false)}
			placement="center"
			scroll={false}
			className={styles.styled_modal}
		>
			<Modal.Header
				className={styles.header_styles}
				title="Tag"
			/>
			<Modal.Body className={styles.body_styles}>
				<DocumentTypeSID
					orgId={organization_id}
					formattedMessageData={formattedData}
					documentTagUrl={documentTagUrl}
					setDocumentTagUrl={setDocumentTagUrl}
					type="messages"
				/>
			</Modal.Body>
		</Modal>
	);
}
export default TagModal;
