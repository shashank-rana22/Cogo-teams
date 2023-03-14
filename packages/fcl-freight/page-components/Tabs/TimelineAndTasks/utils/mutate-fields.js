/* eslint-disable no-param-reassign */
import {
	addDays,
	subtractDays,
	differenceInDays,
	formatDateToString,
} from '@cogo/date';

const incoTermMapping = {
	cif: 'export',
	cfr: 'export',
	cpt: 'export',
	cip: 'export',
	dat: 'export',
	dap: 'export',
	ddp: 'export',
	fob: 'import',
	exw: 'import',
	fca: 'import',
	fas: 'import',
};

const cut_off_dates_keys = [
	'vgm_cutoff',
	'si_cutoff',
	'document_cutoff',
	'gate_in_cutoff',
	'bn_expiry',
	'tr_cutoff',
	'carting_cutoff',
];

const mutateFields = ({
	fields = {},
	data = {},
	shipment_data = {},
	setBlChangeShow = () => {},
	setBlVal = () => {},
	setPaymentTermChange = () => {},
	setPaymentTermVal = () => {},
}) => {
	const trade_type = incoTermMapping[shipment_data?.inco_term];

	const newFields = fields;
	Object.keys(fields).forEach((key) => {
		if (
			shipment_data?.shipment_type === 'fcl_freight' &&
			key === 'shipper_contact_status'
		) {
			if (shipment_data?.shipper_contact_status === 'pending') {
				newFields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
					{ label: 'Retry', value: 'retry' },
				];
			} else if (shipment_data?.shipper_contact_status === 'retry') {
				newFields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Retry', value: 'retry' },
				];
			} else {
				newFields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
				];
			}

			newFields[key].value =
				fields[key].value || shipment_data?.shipper_contact_status;
		}

		if (key === 'bl_category' && data?.task === 'update_bl_type') {
			const { onChange } = fields.bl_category;
			newFields.bl_category.onChange = (val) => {
				const showModal =
					(val === 'hbl' && trade_type === 'export') ||
					(val === 'mbl' && trade_type === 'import');

				if (showModal) {
					setBlChangeShow(true);
					setBlVal(val);
				} else {
					onChange(val);
				}
			};
		}

		if (key === 'payment_term' && data?.task === 'update_payment_term') {
			const { onChange } = fields.payment_term;
			newFields.payment_term.onChange = (val) => {
				const showModal =
					(val === 'prepaid' && trade_type === 'import') ||
					(val === 'collect' && trade_type === 'export');

				if (showModal) {
					setPaymentTermChange(true);
					setPaymentTermVal(val);
				} else {
					onChange(val);
				}
			};
		}

		if (key === 'schedule_departure' && data?.task === 'upload_booking_note') {
			const minDeparture = new Date();
			newFields[key].minDate = formatDateToString(minDeparture);
			const daysDifference = differenceInDays(
				new Date(fields?.schedule_departure?.value),
				minDeparture,
			);
			if (daysDifference < 0) {
				newFields?.schedule_departure.onChange(
					formatDateToString(minDeparture),
				);
			}
		}
		if (key === 'schedule_arrival' && data?.task === 'upload_booking_note') {
			const minArrival = addDays(fields?.schedule_departure?.value, 1);
			const daysDifference = differenceInDays(
				new Date(fields?.schedule_arrival?.value),
				minArrival,
			);
			if (daysDifference < 0) {
				newFields?.schedule_arrival.onChange(formatDateToString(minArrival));
			}
			newFields[key].minDate = minArrival;
		}
		if (key === 'movement_details' && data?.task === 'upload_booking_note') {
			const length = fields?.movement_details?.childFormat?.length;

			(fields?.movement_details?.value || []).forEach((value, index) => {
				newFields.movement_details.value[index].service_type =
					'fcl_freight_service';
				newFields.movement_details.value[index].schedule_arrival =
					value?.schedule_arrival
						? formatDateToString(value?.schedule_arrival)
						: '';
				newFields.movement_details.value[index].schedule_departure =
					value?.schedule_departure
						? formatDateToString(value?.schedule_departure)
						: '';
			});

			if (length > 1) {
				(fields?.movement_details?.fieldArray || []).forEach((child, i) => {
					const maxDate = fields?.schedule_arrival?.value;
					const minDate =
						fields?.movement_details.fieldArray[i]?.fields?.schedule_departure
							?.value || fields?.schedule_departure?.value;

					newFields.movement_details.fieldArray[
						i
					].fields.schedule_arrival.maxDate = formatDateToString(maxDate);
					newFields.movement_details.fieldArray[
						i
					].fields.schedule_arrival.minDate = formatDateToString(minDate);

					if (i !== 0) {
						const index = i - 1;
						const last_schedule_arrival_date =
							fields?.movement_details.childFormat[index]?.fields
								?.schedule_arrival?.value;

						newFields.movement_details.fieldArray[
							i
						].fields.schedule_departure.minDate = formatDateToString(
							last_schedule_arrival_date,
						);

						newFields.movement_details.fieldArray[
							i
						].fields.schedule_departure.maxDate = formatDateToString(maxDate);
					}
				});
			}
		}
		if (cut_off_dates_keys.includes(key)) {
			const minCutOff = addDays(new Date(), 1);
			const maxCutoff = subtractDays(fields?.schedule_departure?.value, 1);
			newFields[key].minDate = minCutOff;
			newFields[key].maxDate = maxCutoff;
		}
	});

	return newFields;
};

export default mutateFields;
