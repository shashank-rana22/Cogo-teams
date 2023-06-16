import React, { useState } from 'react';

import EditRate from './EditRate';
import formatRate from './helper/formatRate';
import SelectRate from './SelectRate';
import styles from './styles.module.css';

const LIST_PREFERENCE_RATE_STEP = 1;
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
	const intialStep = ['air_freight_service'].includes(task.service_type) ? 1 : 2;
	const [selectedCard, setSelectedCard] = useState(null);
	const [step, setStep] = useState(intialStep);

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
			/>
		</div>
	);
}

export default MarkServiceConfirmed;
