import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMUpload } from '@cogoport/icons-react';
import React from 'react';

import Layout from '../../commons/Layout';
import useCreateShipmentDocument from '../../hooks/useCreateShipmentDocument';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';

import styles from './styles.module.css';

const controls = [
	{
		name        : 'remark',
		label       : 'Document Description (optional)',
		type        : 'textarea',
		span        : 12,
		maxLength   : 150,
		placeholder : 'Remarks',
		rows        : 3,
		style       : { height: '120px', border: '1px solid #BDBDBD', borderRadius: 4 },

	},
	{
		name       : 'document',
		label      : 'Document',
		type       : 'file',
		drag       : true,
		span       : 8,
		maxSize    : '10485760',
		uploadType : 'aws',
		height     : '88',
		uploadIcon : <IcMUpload height={40} width={40} />,
		style      : { boxShadow: '0px 0px 8px rgba(98, 127, 172, 0.2)', borderRadius: 4 },
		accept     : '.png,.pdf,.jpg,.jpeg,.doc,.docx',
		rules      : { required: true },
	},
];
function UploadModal({ showUpload, setShowUpload, listAPI, edit, setEdit }) {
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
			pending_task_id     : showUpload?.id,
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
					show={showUpload}
					onClose={() => { setShowUpload(null); }}
					scroll={false}
					size="md"
					className={styles.modal_container}
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
