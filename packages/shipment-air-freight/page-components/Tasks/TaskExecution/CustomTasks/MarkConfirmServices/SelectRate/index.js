import { Loader } from '@cogoport/components';
import React, { useEffect } from 'react';

import useListBookingPreferences
	from '../../../../../../hooks/useListBookingPreferences';

import Card from './Card';
import styles from './styles.module.css';

const CONFIRM_RATE_STEP = 2;
function SelectRate({
	setStep,
	setSelectedCard,
	updateConfirmation,
	task = {},
}) {
	const { data, loading } = useListBookingPreferences({
		shipment_id    : task.shipment_id,
		defaultFilters : { service_type: task.service_type },
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
			<div className={styles.selection_div}>
				{loading ? (
					<div className={styles.loader}>
						<Loader />
						{' '}
						Loading Task...
					</div>
				) : null}
				{(data?.list || []).map((item) => (
					<Card
						item={item}
						key={item?.id}
						priority={item.priority}
						setStep={setStep}
						setSelectedCard={setSelectedCard}
						updateConfirmation={updateConfirmation}
						serviceProvidersData={SERVICE_PROVIDERS_DATA}
						task={task}
					/>
				))}
			</div>
		</div>
	);
}

export default SelectRate;
