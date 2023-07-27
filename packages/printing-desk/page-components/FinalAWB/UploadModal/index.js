import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import controls from '../../../configurations/upload-final-awb-controls';
import useCreateShipmentDocument from '../../../hooks/useCreateShipmentDocument';
import useUpdateShipmentDocument from '../../../hooks/useUpdateDocument';

function UploadModal({
	showUpload = {},
	setShowUpload = () => {},
	listAPI = () => {},
	edit = false,
	setEdit = () => {},
}) {
	const { control, handleSubmit, formState: { errors } } = useForm();
	const { loading, createDocument } = useCreateShipmentDocument();
	const { loading:updateLoading, updateDocument } = useUpdateShipmentDocument();
	const onSubmit = (formValues) => {
		const { fileName, finalUrl } = formValues?.document || {};
		const payload = {
			shipment_id         : showUpload?.shipmentId,
			uploaded_by_org_id  : showUpload?.serviceProviderId,
			performed_by_org_id : showUpload?.serviceProviderId,
			document_type       : showUpload?.documentType || 'draft_airway_bill',
			id                  : showUpload?.documentId,
			service_id          : showUpload?.serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : edit === 'edit' ? undefined : (showUpload?.id || showUpload?.taskId),
			state               : showUpload?.type === 'FinalAwb' ? undefined : 'document_accepted',
			document_url        : finalUrl,
			data                : {

				status          : 'uploaded',
				document_number : showUpload?.awbNumber,
				service_id      : showUpload?.serviceId,
				service_type    : 'air_freight_service',
				document_url    : finalUrl,
			},
			documents: [
				{
					data: {

						status          : 'uploaded',
						document_number : showUpload?.awbNumber,
						service_id      : showUpload?.serviceId,
						service_type    : 'air_freight_service',
						document_url    : finalUrl,
						bl_detail_id    : showUpload?.blDetailId,
					},
					document_type : showUpload?.documentType || 'draft_airway_bill',
					document_url  : finalUrl,
					file_name     : fileName,
				},
			],
		};
		if (edit) {
			updateDocument(payload, listAPI);
			setEdit(false);
		} else {
			createDocument(payload, listAPI);
		}
		setShowUpload(null);
	};
	return (
		<div>
			{showUpload && (
				<Modal
					show={!!showUpload}
					onClose={() => { setShowUpload(null); }}
					scroll={false}
					size="md"
				>
					<Modal.Header title={(<h5>Upload Airway Bill</h5>)} style={{ paddingBottom: 0 }} />
					<Modal.Body>
						<Layout fields={controls} errors={errors} control={control} />
						<Button
							style={{ margin: '20px 0 0 auto' }}
							onClick={handleSubmit(onSubmit)}
							disabled={loading || updateLoading}
							themeType="accent"
						>
							Upload
						</Button>
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}

export default UploadModal;
