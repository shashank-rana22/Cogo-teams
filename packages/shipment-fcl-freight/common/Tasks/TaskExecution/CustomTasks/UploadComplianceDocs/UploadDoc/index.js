import { Button, Modal } from '@cogoport/components';
import { UploadController, useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';

import useCreateShipmentDocument from '../../../../../../hooks/useCreateShipmentDocument';
import useUpdateShipmentDocuments from '../../../../../../hooks/useUpdateShipmentDocuments';

import styles from './styles.module.css';

function UploadDoc({
	setOpen = () => {},
	open = false, task = {}, item = {}, uploadedDocsRefetch = () => {}, type = '', existingDoc = {},
}) {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const { control, formState:{ errors = {} }, handleSubmit } = useForm();

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	const afterCreateRefetch = () => {
		setOpen(false);
		uploadedDocsRefetch();
	};

	const { apiTrigger, docLoading } = useCreateShipmentDocument({
		refetch: afterCreateRefetch,
	});

	const { updateDocument, taskUpdateLoading } = useUpdateShipmentDocuments({ refetch: afterCreateRefetch });

	const onSubmit = async (values) => {
		if (type === 'update' || task.task === 'amend_compliance_documents') {
			const UPDATE_DATA = {
				id                  : existingDoc?.id,
				document_url        : values?.upload_doc?.finalUrl,
				performed_by_org_id : task?.organization_id,
			};

			await updateDocument(UPDATE_DATA);
		} else {
			const DATA = {
				documents: [{
					document_url : values?.upload_doc?.finalUrl,
					file_name    : item?.docName || values?.upload_doc?.fileName,
					data         : {
						doc_code        : item?.docCode,
						doc_description : item?.docExpNotes,
						sample_doc      : item?.docLink,
					},
				}],
				shipment_id         : task?.shipment_id,
				document_type       : 'compliance_document',
				service_id          : task?.service_id,
				service_type        : task?.service_type,
				uploaded_by_org_id  : task?.organization_id,
				uploaded_by_user_id : userId,
				state               : 'document_uploaded',
			};

			await apiTrigger(DATA);
		}
	};

	return (
		<Modal
			size="md"
			show={open}
			onClose={() => setOpen(false)}
			closeOnOuterClick={false}
		>
			<Modal.Header title={type === 'update' ? 'UPLOAD NEW DOCUMENT' : 'UPLOAD'} />

			<Modal.Body>
				<UploadController
					name="upload_doc"
					control={control}
					rules={{ required: 'Document is required' }}
				/>
				{Error('upload_doc')}
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={handleSubmit(onSubmit)} disabled={docLoading || taskUpdateLoading}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UploadDoc;
