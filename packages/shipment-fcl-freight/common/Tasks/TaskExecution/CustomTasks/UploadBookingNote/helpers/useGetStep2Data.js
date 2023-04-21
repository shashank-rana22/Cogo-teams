import { useForm } from '@cogoport/forms';
import { useState } from 'react';

// import { bookingNoteNumberControls, mainControls, movementDetailsControls } from './getStep2Controls';

const BOOKING_NOTE_DATES = ['vgm_cutoff',
	'si_cutoff',
	'document_cutoff',
	'gate_in_cutoff',
	'bn_expiry',
	'tr_cutoff',
	'carting_cutoff'];

const BOOKING_NOTE_FREE_DAYS = [
	'free_days_detention_origin',
	'free_days_detention_destination',
	'free_days_demurrage_origin',
	'free_days_demurrage_destination',
];

const getInitialMovementDetails = (primaryService) => [{
	from_port_id       : primaryService?.origin_port?.id,
	to_port_id         : primaryService?.destination_port?.id,
	schedule_departure : primaryService?.schedule_departure,
	schedule_arrival   : primaryService?.schedule_arrival,
	vessel             : '',
	voyage             : '',
}];

const useGetStep2Data = ({ primary_service, shipment_data, selectedCard }) => {
	const [bookingNote, setBookingNote] = useState(0);

	const metaDataDefault = {
		trade_type                      : primary_service?.trade_type,
		free_days_demurrage_destination : primary_service?.free_days_demurrage_destination || 0,
		free_days_detention_destination : primary_service?.free_days_detention_destination || 0,
		free_days_demurrage_origin      : primary_service?.free_days_demurrage_origin || 0,
		free_days_detention_origin      : primary_service?.free_days_detention_origin || 0,
		schedule_arrival                : primary_service?.schedule_arrival,
		schedule_departure              : primary_service?.schedule_departure,
		shipment_id                     : shipment_data?.id,
		movement_details                : getInitialMovementDetails(primary_service),
	};

	// const allControls = [...bookingNoteNumberControls, ...mainControls, ...movementDetailsControls];

	// (allControls || []).forEach((controlObj, index) => {
	// 	if (selectedCard?.data?.[0]?.[controlObj?.name]) {
	// 		allControls[index].value = selectedCard?.data?.[0]?.[controlObj?.name];
	// 	}
	// });

	const formProps = useForm({
		defaultValues: {
			movement_details: [
				{
					from_port_id       : '',
					to_port_id         : '',
					schedule_arrival   : '',
					schedule_departure : '',
					vessel             : '',
					voyage             : '',
					service_type       : '',
				},
			],
		},
	});

	return { bookingNote, setBookingNote, formProps };
};
export default useGetStep2Data;
