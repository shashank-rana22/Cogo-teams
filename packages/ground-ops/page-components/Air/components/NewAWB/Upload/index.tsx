import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMUpload } from '@cogoport/icons-react';
import React from 'react';

import Layout from '../../../commons/Layout';
import useCreateShipmentDocument from '../../../hooks/useCreateShipmentDocument';

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
		rules       : {
			required: 'Remarks is Required',
		},
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
function Upload({ showUpload, setShowUpload, listAPi }) {
	const { control, handleSubmit, formState: { errors } } = useForm();
	const { loading, createDocument } = useCreateShipmentDocument();
	const onSubmit = (formValues) => {
		console.log('showUpload', showUpload);

		const fileArr = formValues.document.split('/');

		const payload = {
			shipment_id         : showUpload?.shipmentId,
			uploaded_by_org_id  : showUpload?.serviceProviderId,
			performed_by_org_id : showUpload?.serviceProviderId,
			document_type       : 'draft_airway_bill',
			id                  : showUpload?.documentId,
			service_id          : showUpload?.serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : showUpload?.id,
			state               : 'document_accepted',
			document_url        : formValues.document || undefined,
			data                : {

				status          : 'uploaded',
				document_number : showUpload?.awbNumber,
				service_id      : showUpload?.serviceId,
				service_type    : 'air_freight_service',
			},
			documents: [
				{
					data: {

						status          : 'uploaded',
						document_number : showUpload?.awbNumber,
						service_id      : showUpload?.serviceId,
						service_type    : 'air_freight_service',
					},
					document_type : 'draft_airway_bill',
					document_url  : formValues.document || undefined,
					file_name     : fileArr[fileArr.length - 1],
				},
			],
		};
		createDocument(payload, listAPi);
		setShowUpload(null);
	};
	return (
		<div>
			<Layout fields={controls} errors={errors} control={control} />
			<Button
				style={{ marginLeft: 'auto' }}
				onClick={handleSubmit(onSubmit)}
				disabled={loading}
			>
				Upload

			</Button>
		</div>
	);
}

export default Upload;
