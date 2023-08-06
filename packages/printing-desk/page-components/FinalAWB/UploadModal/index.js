import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import controls from '../../../configurations/upload-final-awb-controls';
import useCreateShipmentDocument from '../../../hooks/useCreateShipmentDocument';
import useUpdateShipmentDocument from '../../../hooks/useUpdateDocument';

const ZERO = 0;

const formatPAyload = (showUpload, fileName, finalUrl, edit, numberOfHawb) => {
	const {
		shipmentId, serviceProviderId, documentType, documentId, serviceId, type, awbNumber, blDetailId,
	} = showUpload || {};
	return (
		{
			shipment_id         : shipmentId,
			uploaded_by_org_id  : serviceProviderId,
			performed_by_org_id : serviceProviderId,
			document_type       : documentType || 'draft_airway_bill',
			id                  : documentId,
			service_id          : serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : edit === 'edit' ? undefined : (showUpload?.id || showUpload?.taskId),
			state               : type === 'FinalAwb' ? undefined : 'document_accepted',
			document_url        : finalUrl,
			numberOfHawb,
			data                : {

				status          : 'uploaded',
				document_number : awbNumber,
				service_id      : serviceId,
				service_type    : 'air_freight_service',
				document_url    : finalUrl,
			},
			documents: [
				{
					data: {

						status          : 'uploaded',
						document_number : awbNumber,
						service_id      : serviceId,
						service_type    : 'air_freight_service',
						document_url    : finalUrl,
						bl_detail_id    : blDetailId,
					},
					document_type : documentType || 'draft_airway_bill',
					document_url  : finalUrl,
					file_name     : fileName,
				},
			],
		}
	);
};

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
		const numberOfHawb = formValues?.numberOfHawb || ZERO;

		const payload = formatPAyload(showUpload, fileName, finalUrl, edit, numberOfHawb);

		if (edit) {
			updateDocument(payload, listAPI);
			setEdit(false);
		} else {
			createDocument(payload, listAPI);
		}
		setShowUpload({});
	};

	return (
		<div>
			{showUpload && (
				<Modal
					show={!isEmpty(showUpload)}
					onClose={() => { setShowUpload({}); }}
					scroll={false}
					size="md"
				>
					<Modal.Header title={(<h5>Upload Airway Bill</h5>)} style={{ paddingBottom: 0 }} />
					<Modal.Body>
						<Layout fields={controls} errors={errors} control={control} />
						<Button
							style={{ marginTop: '20px' }}
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
