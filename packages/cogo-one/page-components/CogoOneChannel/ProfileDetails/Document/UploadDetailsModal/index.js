import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import getControls from '../../../../../configurations/upload-documents-controls';
import useSubmitOrganizationKyc from '../../../../../hooks/useSubmitOrganizationKyc';

import styles from './styles.module.css';
import UploadForm from './UploadForm';

function UploadDetailsModal({
	setShowModal = () => {},
	orgId = '',
	documentType,
	documentsList = () => {},
	singleItem = {},
	setSingleItem = () => {},
}) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const {
		submitOrganizationKyc = () => {},
		loading,
	} = useSubmitOrganizationKyc({ orgId, documentsList, singleItem, setSingleItem });

	const handleCancel = () => {
		reset();
		setShowModal(false);
		setSingleItem({});
	};

	const handleClose = () => {
		setShowModal(false);
		setSingleItem({});
	};

	const formControls = getControls(documentType);

	return (
		<Modal
			size="md"
			show
			onClose={handleClose}
			placement="top"
		>
			<Modal.Header
				title={documentType === 'pan'
					? 'PAN Details' : 'KYC Details'}
			/>
			<Modal.Body>
				<UploadForm
					{...formControls}
					errors={errors}
					control={control}
					documentType={documentType}
				/>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.actions}>
					<Button
						size="md"
						themeType="secondary"
						onClick={handleCancel}
					>
						Cancel
					</Button>
					<Button
						themeType="accent"
						className={styles.last_button}
						loading={loading}
						onClick={handleSubmit((data) => submitOrganizationKyc(data))}
					>
						Submit
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default UploadDetailsModal;
