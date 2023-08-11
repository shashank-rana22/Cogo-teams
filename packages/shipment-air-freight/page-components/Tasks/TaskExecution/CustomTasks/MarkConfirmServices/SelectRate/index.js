import React, { useEffect } from 'react';

import useListBookingPreferences from '../../../../../../hooks/useListBookingPreferences';

import styles from './styles.module.css';

const CONFIRM_RATE_STEP = 2;
const TEXT_MESSAGE = 'Please revert the rate first!';

function SelectRate({
	setStep = () => {},
	setSelectedCard = () => {},
	step = {},
	task = {},
}) {
	const { data } = useListBookingPreferences({
		shipment_id    : task.shipment_id,
		defaultFilters : { service_id: task.service_id },
		step,
	});

	const list = data?.list || [];

	const selected_priority = (list || []).find(
		(item) => item.priority === item.selected_priority,
	);

	const SERVICE_PROVIDERS_DATA = [];
	(list || []).forEach((item) => {
		const {
			booking_confirmation_status,
			priority,
			id,
			rate_id,
			booking_not_placed_reason,
		} = item;

		const serviceProvider = {
			booking_confirmation_status,
			priority,
			id,
			rate_id,
			booking_not_placed_reason,
		};
		SERVICE_PROVIDERS_DATA.push(serviceProvider);
	});

	useEffect(() => {
		if (selected_priority) {
			setSelectedCard(selected_priority);
			setStep(CONFIRM_RATE_STEP);
		}
	}, [selected_priority, setStep, setSelectedCard]);

	return (
		<div className={styles.container}>
			{TEXT_MESSAGE}
		</div>
	);
}

export default SelectRate;
