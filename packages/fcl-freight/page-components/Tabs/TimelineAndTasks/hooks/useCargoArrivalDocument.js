import { useFormCogo } from '@cogoport/front/hooks';
import { useRequest } from '@cogo/commons/hooks';
import { useState } from 'react';

const control = [
	{
		label: 'Document description (Optional)',
		name: 'document_description',
		type: 'text',
		placeholder: 'Document description...',
		span: 12,
	},
	{
		name: 'url',
		span: 4,
		type: 'file',
		document_type: 'cargo_arrival_notice',
		label: 'Document Upload',
		accept:
			'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
		validations: [
			{
				type: 'required',
				message: 'document is required',
			},
		],
	},
];

const useCargoArrivalDocument = ({
	pendingTask,
	refetch,
	setShowDocument,
	clearTask,
}) => {
	const createShipmentDocumentApi = useRequest(
		'post',
		false,
		'partner',
	)('/create_shipment_document');

	const { fields, handleSubmit } = useFormCogo(control);

	const [errors, setErrors] = useState({});

	const submitDocument = async (values) => {
		if (values) {
			const body = {
				shipment_id: pendingTask?.shipment_id,
				uploaded_by_org_id: pendingTask?.organization_id,
				document_type: 'container_arrival_notice',
				service_id: pendingTask?.service_id,
				service_type: pendingTask?.service_type,
				pending_task_id: pendingTask?.id,
				documents: [
					{
						file_name: values?.url?.name,
						document_url: values?.url?.url,
						data: {
							description: values?.description,
						},
					},
				],
			};
			try {
				const res = await createShipmentDocumentApi.trigger({ data: body });
				if (!res?.hasError) {
					setShowDocument(false);
					refetch();
					clearTask();
				}
				if (res?.hasError) {
					console.log(res?.message);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const onError = (errs) => {
		setErrors(errs);
	};

	return {
		handleSubmit,
		fields,
		errors,
		onError,
		submitDocument,
		control,
		loading: createShipmentDocumentApi?.loading,
	};
};

export default useCargoArrivalDocument;
