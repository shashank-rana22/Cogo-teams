import { useRequest } from '@cogo/commons/hooks';
import { useEffect, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { Button, toast } from '@cogoport/front/components/admin';
import global from '@cogo/commons/constants/global';
import getExtraControls from './extraControlAmend';
import FormLayout from '../../../../../commons/Layout';
import GenerateDoc from '../GenerateMawb/GenerateDoc';
import {
	Container,
	ButtonWrap,
	CustomDiv,
	CustomSkeleton,
	RemarkHead,
	Remark,
	RemarkValue,
} from './styles';

const getControls = (data, type = null) => {
	const containers_count = [
		{
			label: 'Container Quantity',
			name: 'containers_count',
			type: 'number',
			span: 6,
			min: 1,
			rules: {
				required: { value: true, message: 'Container quantity is required' },
			},
		},
	];

	const controls =
		getExtraControls[type] || getExtraControls[data.document_type] || [];
	const bls = ['draft_bill_of_lading', 'draft_house_bill_of_lading'];

	if (
		data.shipment_type === 'fcl_freight' &&
		bls.includes(data.document_type)
	) {
		return [...controls, ...containers_count];
	}
	return controls;
};

const controls = (data) => [
	{
		name: 'documents',
		type: 'fieldArray',
		showButtons: true,
		showDeleteButton: true,
		showDivider: false,
		isSectionRequired: true,
		noDeleteButtonTill: 1,
		controls: [
			...getControls(data),
			{
				name: 'url',
				showLabel: false,
				span: 10,
				type: 'file',
				label: 'Please Upload your document',
				themeType: 'secondary',
				drag: true,
				isShipment: true,
				uploadIcon: 'ic-upload',
				document_type: data.document_type,
				accept:
					'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				uploadType: 'aws',
				rules: { required: { value: true, message: 'Document is required' } },
			},
		],
	},
];

const UploadAmendDoc = ({
	task,
	shipment_data = {},
	onCancel = () => {},
	refetch = () => {},
	tradeType = '',
}) => {
	const {
		trigger: listShipmentTrigger,
		data,
		loading: documentLoader,
	} = useRequest('get', false, 'partner')('/list_shipment_documents');

	const { trigger: updateShipmentDocumentTrigger, loading } = useRequest(
		'post',
		false,
		'partner',
	)('/update_shipment_document');
	const [isAmended, setIsAmended] = useState(false);

	const allControls = controls(task);
	const details = data?.list[0];
	const payloadData = details ? JSON.parse(details.data) : {};
	const requiredObj = {};
	(allControls[0].controls || []).forEach((controlObj) => {
		requiredObj[controlObj.name] = '';
	});
	allControls[0].value = [requiredObj];

	const [error, setError] = useState({});

	const { fields, handleSubmit, setValue } = useFormCogo(allControls);

	const isLTLAdvancePayment =
		task.shipment_type === 'ltl_freight' &&
		task.document_type === 'ltl_advance_payment';
	const changedPayloadData = (values) => {
		const {
			payment_mode = '',
			payment_reference_number = '',
			invoice_number = '',
			url = '',
		} = values?.documents?.[0];
		const { service_id = '', service_type = '' } = payloadData;
		return {
			currency: values?.documents?.[0]?.amount?.currency,
			price: values?.documents?.[0]?.amount?.price,
			payment_mode,
			payment_reference_number,
			invoice_number,
			url: url?.url || url,
			service_id,
			service_type,
		};
	};

	useEffect(() => {
		if (isLTLAdvancePayment) {
			const amendRequired = {
				invoice_number: payloadData?.invoice_number || '',
				payment_mode: payloadData?.payment_mode || '',
				payment_reference_number: payloadData?.payment_reference_number || '',
				amount: {
					currency: payloadData?.currency || '',
					price: payloadData?.price || '',
				},
			};
			setValue('documents', [amendRequired]);
		}
	}, [data]);

	const onError = (err) => {
		setError(err);
	};
	useEffect(() => {
		(async () => {
			await listShipmentTrigger({
				params: {
					filters: { shipment_id: task?.shipment_id, id: task?.task_field_id },
					service_type: task?.service_type,
				},
			});
		})();
	}, [shipment_data.id]);
	const handleSubmitFinal = async (values) => {
		const documentPayloadData = isLTLAdvancePayment
			? changedPayloadData(values)
			: payloadData;
		const finalPayload = {
			shipment_id: task.shipment_id,
			service_id: task.service_id,
			service_type: task.service_type,
			document_type: task.document_type,
			performed_by_org_id: task.organization_id,
			id: data?.list?.[0]?.id,
			pending_task_id: task.id,
			data: { ...documentPayloadData, status: 'uploaded' },
			document_url:
				values?.documents?.[0]?.url?.url || values?.documents?.[0]?.url,
			documents: (values.documents || []).map((documentData) => ({
				file_name: documentData?.name,
				document_url: documentData?.url?.url || documentData?.url,
				data: {
					...documentData,
					status: 'uploaded',
					name: undefined,
					url: undefined,
					price: documentData?.amount?.price || undefined,
					currency: documentData?.amount?.currency || undefined,
				},
			})),
		};

		const res = await updateShipmentDocumentTrigger({
			data: finalPayload,
		});

		if (!res?.hasError) {
			onCancel();
			refetch();
			toast.success('Task Completed Successfully');
		} else {
			toast.error('Something went wrong !');
		}
	};

	return (
		<>
			{isAmended ? (
				<GenerateDoc
					shipment_data={shipment_data}
					task={task}
					refetch={refetch}
					clearTask={onCancel}
					setIsAmended={setIsAmended}
					isAmended={isAmended}
					details={details}
					primary_service={shipment_data}
				/>
			) : (
				<Container>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Remark>
							<RemarkHead>Remarks:</RemarkHead>
							<RemarkValue>{data?.list[0]?.remarks}</RemarkValue>
						</Remark>
						{shipment_data?.service_type.includes('air_freight') &&
							shipment_data?.service_provider_id ===
								global.FREIGHT_FORCE_ORG_ID &&
							tradeType === 'export' && (
								<Button onClick={() => setIsAmended(true)} disabled={loading}>
									Switch to generate
								</Button>
							)}
					</div>

					<FormLayout controls={allControls} fields={fields} errors={error} />
					<ButtonWrap>
						<Button
							onClick={handleSubmit(handleSubmitFinal, onError)}
							disabled={loading}
						>
							Submit
						</Button>
					</ButtonWrap>
				</Container>
			)}

			{documentLoader && (
				<CustomDiv>
					{Array(4)
						.fill(0)
						.map(() => (
							<CustomSkeleton />
						))}
				</CustomDiv>
			)}
		</>
	);
};

export default UploadAmendDoc;
