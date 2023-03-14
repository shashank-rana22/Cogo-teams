import { useFormCogo } from '@cogoport/front/hooks';
import { useState } from 'react';
import { Button, toast } from '@cogoport/front/components/admin';
import { useRequest } from '@cogo/commons/hooks';
import { FilePreview } from '@cogo/commons/components';

import {
	Container,
	SubHeading,
	ButtonWrap,
	BodyContainer,
	FileContainer,
	DetailContainer,
	ButtonFlex,
	Heading,
} from './styles.js';
import FormLayout from '../../../../../../commons/Layout';

const bookingNoteControls = (shipment_data, noOfBookingNote) => [
	{
		name: 'documents',
		type: 'fieldArray',
		showButtons: false,
		showDeleteButton: false,
		value: Array(noOfBookingNote)
			.fill(0)
			.map(() => {
				return {
					document_number: '',
					yard_details: '',
					container_quantity: '',
				};
			}),
		controls: [
			{
				label: 'Booking Number',
				name: 'document_number',
				type: 'text',
				rules: {
					required: { value: true, message: 'Booking number is required' },
				},
			},
			{
				label: 'Yard Details',
				name: 'yard_details',
				type: 'location-select',
				optionsListKey: 'locations',
				params: {
					filters: {
						type: ['yard'],
					},
				},
			},
			{
				label: 'Container Quantity',
				name: 'container_quantity',
				type: 'number',
				value: (shipment_data || {}).container_details?.length || 1,
				rules: {
					required: { value: true, message: 'Container Quantity is required' },
				},
			},
		],
	},
];

const movementDetailsControls = (shipment_data) => [
	{
		heading: 'Movement Details',
		name: 'movement_details',
		type: 'fieldArray',
		isMovementDetails: true,
		isMovementPort: true,
		initialCount: 1,
		showDeleteButton: true,
		value: shipment_data?.movement_details?.length
			? shipment_data?.movement_details
			: [
					{
						from_port_id: '',
						to_port_id: '',
						schedule_arrival: '',
						schedule_departure: '',
						vessel: '',
						voyage: '',
						service_type: '',
					},
			  ],
		controls: [
			{
				type: 'location-select',
				optionsListKey: 'locations',
				params: { filters: { type: ['seaport'] } },
				caret: true,
				defaultOptions: true,
				name: 'from_port_id',
				label: 'Select origin port',
				placeholder: 'Search origin...',
				span: 6,
				rules: { required: { value: true, message: 'Origin is required' } },
			},
			{
				type: 'location-select',
				optionsListKey: 'locations',
				params: { filters: { type: ['seaport'] } },
				caret: true,
				defaultOptions: true,
				name: 'to_port_id',
				label: 'Select destination port',
				placeholder: 'Search destination...',
				span: 6,
				rules: {
					required: { value: true, message: 'Destination is required' },
				},
			},
			{
				label: 'Schedule Departure',
				name: 'schedule_departure',
				type: 'datepicker',
				withTimePicker: true,
				usePortal: true,
				span: 6,
				rules: {
					required: { value: true, message: 'Schedule departure is required' },
				},
			},
			{
				label: 'Schedule Arrival',
				name: 'schedule_arrival',
				type: 'datepicker',
				withTimePicker: true,
				usePortal: true,
				span: 6,
				rules: {
					required: { value: true, message: 'Schedule arrival is required' },
				},
			},
			{
				name: 'vessel',
				label: 'Vessel',
				type: 'text',
				span: 6,
				placeholder: 'Vessel Name',
			},
			{
				name: 'voyage',
				label: 'Voyage',
				type: 'text',
				span: 6,
				placeholder: 'Type voyage',
			},
		],
	},
];

const mainControls = (shipment_data) => [
	{
		label: 'Schedule Departure',
		name: 'schedule_departure',
		type: 'datepicker',
		withTimePicker: true,
		value: shipment_data?.schedule_arrival,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'Schedule departure is required' },
		},
	},
	{
		label: 'Schedule Arrival',
		name: 'schedule_arrival',
		type: 'datepicker',
		value: shipment_data?.schedule_arrival,
		withTimePicker: true,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, messag: 'Schedule arrival is required' },
		},
	},
	{
		label: 'VGM Cut-off',
		name: 'vgm_cutoff',
		type: 'datepicker',
		withTimePicker: true,
		value: shipment_data.vgm_cutoff,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'VGM Cut-off is required' },
		},
	},
	{
		label: 'S/I Cut-off',
		name: 'si_cutoff',
		type: 'datepicker',
		withTimePicker: true,
		value: shipment_data.si_cutoff,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'S/I Cut-off is required' },
		},
	},
	{
		label: 'Document Cut-off',
		name: 'document_cutoff',
		type: 'datepicker',
		withTimePicker: true,
		value: shipment_data.document_cutoff,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'Document Cut-off is required' },
		},
	},
	{
		label: 'Gate-in Cut-off',
		name: 'gate_in_cutoff',
		type: 'datepicker',
		withTimePicker: true,
		value: shipment_data.gate_in_cutoff,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'Gate-in Cut-off is required' },
		},
	},
	{
		label: 'Booking Note Expiry',
		name: 'bn_expiry',
		type: 'datepicker',
		withTimePicker: true,
		value: shipment_data.bn_expiry,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'Booking Note Expiry is required' },
		},
	},
	{
		label: 'TR Cut-off',
		name: 'tr_cutoff',
		type: 'datepicker',
		withTimePicker: true,
		value: shipment_data.tr_cutoff,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'TR Cut-off is required' },
		},
	},
	{
		label: 'Detention at origin',
		name: 'free_days_detention_origin',
		type: 'number',
		span: 12,
		min: 0,
		optionLabel: 'Day',
		value: shipment_data.free_days_detention_origin,
		max: 100,
		rules: {
			required: { value: true, message: 'Detention at origin is required' },
		},
	},
	{
		label: 'Detention at destination',
		name: 'free_days_detention_destination',
		type: 'number',
		span: 12,
		min: 0,
		optionLabel: 'Day',
		value: shipment_data.free_days_detention_origin,
		max: 100,
		rules: {
			required: {
				value: true,
				message: 'Detention at destination is required',
			},
		},
	},
	{
		label: 'Demurrage at destination',
		name: 'free_days_demurrage_destination',
		type: 'number',
		span: 12,
		value: shipment_data.free_days_demurrage_destination,
		optionLabel: 'Day',
		rules: {
			required: {
				value: true,
				message: 'Demurrage at destination is required',
			},
		},
	},
];

const UpdateDetails = ({
	fileUrl,
	task,
	primary_service,
	onClose = () => {},
	setCurrentStep = () => {},
}) => {
	const bookingControls = bookingNoteControls(
		primary_service,
		fileUrl.length || 1,
	);
	const movementDetailsControl = movementDetailsControls(primary_service);
	const mainControl = mainControls(primary_service);

	const updateShipmentDocument = useRequest(
		'post',
		false,
		'partner',
	)('/update_shipment_document');

	const updateShipmentService = useRequest(
		'post',
		false,
		'partner',
	)('/update_shipment_service');

	const updateShipmentPendingTask = useRequest(
		'post',
		false,
		'partner',
	)('/update_shipment_pending_task');

	const finalControls = [
		...bookingControls,
		...movementDetailsControl,
		...mainControl,
	];

	const { fields, handleSubmit } = useFormCogo(finalControls);

	const [errors, setError] = useState({});

	const onError = (err) => {
		setError(err);
	};

	const [bookingNote, setBookingNote] = useState(0);

	const handleFinalSubmit = async (values) => {
		const payloadUpdateShipmentDocument = {
			document_type: 'booking_note',
			documents: (values?.documents || []).map((obj, index) => ({
				data: obj,
				document_url: fileUrl[index]?.url,
				file_name: fileUrl[index]?.name,
			})),
			service_id: task?.service_id,
			service_type: task?.service_type,
			shipment_id: task?.shipment_id,
			uploaded_by_org_id: primary_service?.service_provider?.id,
		};

		const dataObj = {};
		(mainControl || []).forEach((obj) => {
			dataObj[obj.name] = values[obj.name];
		});
		const payloadForUpdateShipment = {
			data: {
				movement_details: values?.movement_details?.map((obj) => {
					return {
						...(obj || {}),
						service_type: 'fcl_freight_service',
					};
				}),
				...(dataObj || {}),
			},
			ids: [task?.service_id],
			performed_by_org_id: primary_service?.service_provider?.id,
			service_type: task?.service_type,
			shipment_id: task?.shipment_id,
		};

		try {
			const res = await updateShipmentService.trigger({
				data: payloadForUpdateShipment,
			});

			if (!res?.hasError) {
				const finalRes = await updateShipmentDocument.trigger({
					data: payloadUpdateShipmentDocument,
				});

				if (!finalRes?.hasError) {
					const finalResponse = await updateShipmentPendingTask.trigger({
						data: {
							id: task.id,
						},
					});
					if (!finalResponse.hasError) {
						toast.error('Booking Note Updated Successfully !');
						onClose();
					}
				} else {
					toast.error('Something went wrong !');
				}
			} else {
				toast.error(JSON.stringify(res?.data));
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container>
			<ButtonWrap>
				{Array(fileUrl.length)
					.fill(0)
					.map((val, index) => {
						return (
							<Button
								style={{ marginRight: '10px' }}
								onClick={() => {
									setBookingNote(index);
								}}
							>
								Booking Note {index + 1}
							</Button>
						);
					})}
			</ButtonWrap>
			<BodyContainer>
				<FileContainer>
					<FilePreview url={fileUrl?.[bookingNote]?.url} />
				</FileContainer>
				<DetailContainer>
					<Heading>Review Details</Heading>
					<SubHeading>Booking Note Details</SubHeading>
					<FormLayout
						fields={fields}
						controls={bookingControls}
						errors={errors}
					/>
					<SubHeading>Movement Details</SubHeading>
					<FormLayout
						fields={fields}
						controls={movementDetailsControl}
						errors={errors}
					/>
					<SubHeading>Other Details</SubHeading>
					<FormLayout fields={fields} controls={mainControl} errors={errors} />
					<ButtonFlex>
						<Button
							onClick={() => {
								setCurrentStep('upload_booking_note');
							}}
						>
							Back
						</Button>
						<Button
							onClick={() => {
								handleSubmit(handleFinalSubmit, onError)();
							}}
							style={{ marginLeft: '5px' }}
						>
							Submit
						</Button>
					</ButtonFlex>
				</DetailContainer>
			</BodyContainer>
		</Container>
	);
};

export default UpdateDetails;
