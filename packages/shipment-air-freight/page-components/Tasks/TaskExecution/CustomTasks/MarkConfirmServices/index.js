import React, { useState } from 'react';

import EditRate from './EditRate';
import formatRate from './helper/formatRate';
import SelectRate from './SelectRate';
import styles from './styles.module.css';

const LIST_PREFERENCE_RATE_STEP = 1;
const CONFIRM_PREFERENCE_RATE_STEP = 2;
function MarkServiceConfirmed({
	task = {},
	servicesList = [],
	onCancel = () => {},
	primaryService = {},
	shipment_data = {},
	timeLineRefetch = () => {},
	refetch = () => {},
	localService = '',
}) {
	const initialStep = ['air_freight_service'].includes(task.service_type)
		? LIST_PREFERENCE_RATE_STEP : CONFIRM_PREFERENCE_RATE_STEP;
	const [selectedCard, setSelectedCard] = useState(null);
	const [step, setStep] = useState(initialStep);

	if (step === LIST_PREFERENCE_RATE_STEP) {
		return (
			<SelectRate
				setStep={setStep}
				setSelectedCard={setSelectedCard}
				task={task}
			/>
		);
	}

	const formattedRate = formatRate({
		selectedRate      : selectedCard,
		service_type_prop : task.service_type,
		servicesList,
	});

	return (
		<div className={styles.main_container}>
			<EditRate
				task={task}
				servicesList={servicesList}
				primaryService={primaryService}
				onCancel={onCancel}
				shipment_data={shipment_data}
				timeLineRefetch={timeLineRefetch}
				refetch={refetch}
				localService={localService}
				formattedRate={formattedRate}
				selectedCard={selectedCard}
			/>
		</div>
	);
}

export default MarkServiceConfirmed;
