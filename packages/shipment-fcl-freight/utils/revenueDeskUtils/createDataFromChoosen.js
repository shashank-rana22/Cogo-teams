const CreateDataFromChoosen = ({ data = [], shipment_id }) => {
	const single_booking_notes = [];
	const splitable_booking_notes = {};
	const mergeable_booking_notes = {};
	const flashBookigRates = [];
	const currentFlashBookingRates = [];
	const previousFalshBookingRates = [];

	(data || []).forEach((element) => {
		const first = element?.data?.[0];
		if (element?.source === 'bn_salvage' && element?.type === 'single') {
			single_booking_notes.push({ ...element?.data?.[0] });
		}
		if (
			element?.source === 'bn_salvage'
			&& ['splitable', 'mergeable'].includes(element?.type)
		) {
			const key = `["${first?.operator_id}","${first?.service_provider_id}"]`;
			if (element?.type === 'mergeable') {
				mergeable_booking_notes[key] = [...(element?.data || {})];
			} else {
				splitable_booking_notes[key] = [...(element?.data || {})];
			}
		}

		if (element?.source === 'system_rate') {
			flashBookigRates.push(element?.data?.[0]);
		}
		if (element?.source === 'flash_booking') {
			if (element?.shipment_id === shipment_id) {
				currentFlashBookingRates.push(first);
			} else {
				previousFalshBookingRates.push(first);
			}
		}
	});

	return {
		choosen_bookings_docs: {
			docs: {
				mergeable_booking_notes,
				single_booking_notes,
				splitable_booking_notes,
			},
		},
		choosen_flash_params: {
			CurrentRates: {
				flashRatesData : { list: currentFlashBookingRates },
				loading        : false,
			},
			PreviousRates: {
				flashRatesData : { list: previousFalshBookingRates },
				loading        : false,
			},

			SystemRates: {
				systemRatesData : { list: flashBookigRates },
				loading         : false,
			},
		},
	};
};

export default CreateDataFromChoosen;
