import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import getControls from '../../../../../configurations/upload-documents-controls';
import useCreateOrganizationDocument from '../../../../../hooks/useCreateOrganizationDocument';
import useSubmitOrganizationKyc from '../../../../../hooks/useSubmitOrganizationKyc';

import SelectDocumentType from './SelectDocumentType';
import styles from './styles.module.css';
import UploadForm from './UploadForm';

function UploadDetailsModal({
	setShowModal = () => {},
	orgId = '',
	documentType,
	documentsList = () => {},
	singleItem = {},
	setSingleItem = () => {},
	isPanUploaded,
	isGstUploaded,
}) {
	const [selectedDocumentType, setSelectedDocumentType] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm(
		{
			defaultValues: {
				country_id          : singleItem?.country_id || GLOBAL_CONSTANTS.country_ids.IN,
				registration_number : singleItem?.registration_number || '',
				preferred_languages : singleItem?.preferred_languages || ['english'],
			},
		},
	);

	const paramsData = {
		orgId,
		documentsList,
		singleItem,
		setSingleItem,
		setShowModal,
	};

	const handleCancel = () => {
		reset();
		setShowModal(false);
		setSingleItem({});
	};

	const handleClose = () => {
		setShowModal(false);
		setSingleItem({});
	};

	const checkDocumentType = () => {
		let documentName = '';
		let fileType = '';
		if (!['gst', 'pan'].includes(documentType) && !selectedDocumentType) {
			documentName = 'Please select document type';
			fileType = 'undefined';
		} else if (documentType === 'pan' || selectedDocumentType === 'pan') {
			documentName = 'PAN Details';
			fileType = 'pan';
		} else {
			documentName = 'KYC Details';
			fileType = 'gst';
		}
		return { documentName, fileType };
	};

	const { documentName = '', fileType = '' } = checkDocumentType();

	const {
		createPanDocument = () => {},
		panLoading = false,
	} = useCreateOrganizationDocument({ paramsData, fileType, setSelectedDocumentType });

	const {
		submitOrganizationKyc = () => {},
		loading = false,
	} = useSubmitOrganizationKyc({ paramsData, fileType, setSelectedDocumentType });

	const onSubmit = (data) => {
		if (fileType === 'pan') {
			createPanDocument(data);
		} else {
			submitOrganizationKyc(data);
		}
	};

	const formControls = getControls(fileType);

	return (
		<Modal
			size="md"
			show
			onClose={handleClose}
			placement="top"
		>
			<Modal.Header
				title={documentName}
			/>

			<Modal.Body>
				{fileType === 'undefined' ? (
					<SelectDocumentType
						setSelectedDocumentType={setSelectedDocumentType}
						isPanUploaded={isPanUploaded}
						isGstUploaded={isGstUploaded}
					/>
				) : (
					<UploadForm
						{...formControls}
						errors={errors}
						control={control}
						documentUrl={singleItem?.document_url || ''}
						fileType={fileType}
					/>
				)}

			</Modal.Body>
			{fileType !== 'undefined' && (
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
							loading={loading || panLoading}
							onClick={handleSubmit(onSubmit)}
						>
							Submit
						</Button>
					</div>
				</Modal.Footer>
			)}

		</Modal>
	);
}

export default UploadDetailsModal;
