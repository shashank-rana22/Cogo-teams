import { Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import DocumentTypeSID from '../../DocumentTypeSID';

import styles from './styles.module.css';

function TagModal({
	setTagModal = () => {}, tagModal = false, formattedData = {}, documentTagUrl = '',
	setDocumentTagUrl = () => {},
}) {
	const { organization_id = '' } = formattedData || {};

	const { control, formState: { errors = {} }, watch, handleSubmit, resetField, reset } = useForm();

	const handleClose = () => {
		setTagModal(false);
		reset();
	};

	return (
		<Modal
			show={tagModal}
			onClose={handleClose}
			onOuterClick={handleClose}
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
					setTagModal={setTagModal}
					control={control}
					errors={errors}
					watch={watch}
					handleSubmit={handleSubmit}
					resetField={resetField}
					reset={reset}
				/>
			</Modal.Body>
		</Modal>
	);
}
export default TagModal;
