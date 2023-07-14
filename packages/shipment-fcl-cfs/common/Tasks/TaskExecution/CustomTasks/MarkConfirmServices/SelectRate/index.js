import { Loader } from '@cogoport/components';
import { useEffect } from 'react';

import useListShipmentBookingConfirmationPreferences
	from '../../../../../../hooks/useListShipmentBookingConfirmationPreferences';

import Card from './Card';
import SelectNormal from './SelectNormal';
import styles from './styles.module.css';

const STEP_VALUE = 2;

function SelectRate({
	setStep,
	setSelectedCard,
	updateConfirmation,
	task = {},
}) {
	const { data, loading } = useListShipmentBookingConfirmationPreferences({
		shipment_id    : task.shipment_id,
		defaultFilters : { service_type: task.service_type },
	});

	const list = data?.list || [];

	const selected_priority = (list || []).find(
		(item) => item.priority === item.selected_priority,
	);

	useEffect(() => {
		if (selected_priority) {
			setSelectedCard(selected_priority);
			setStep(STEP_VALUE);
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
						key={item?.id}
						item={item}
						priority={item.priority}
						setStep={setStep}
						setSelectedCard={setSelectedCard}
						updateConfirmation={updateConfirmation}
					/>
				))}
				<SelectNormal
					setStep={setStep}
				/>
			</div>
		</div>
	);
}

export default SelectRate;
