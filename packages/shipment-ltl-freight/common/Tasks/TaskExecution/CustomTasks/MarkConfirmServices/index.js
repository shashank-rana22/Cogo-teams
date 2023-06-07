import React, { useState } from 'react';

import EditRate from './EditRate';
import formatRate from './helper/formatRate';
import SelectRate from './SelectRate';

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
	const intialStep = ['ltl_freight_service'].includes(task.service_type) ? 1 : 2;
	const [selectedCard, setSelectedCard] = useState(null);
	const [step, setStep] = useState(intialStep);

	if (step === 1) {
		return (
			<SelectRate
				setStep={setStep}
				setSelectedCard={setSelectedCard}
				task={task}
			/>
		);
	}

	const formattedRate = formatRate(
		selectedCard,
		shipment_data,
		task.service_type,
		primaryService,
		servicesList,
	);

	return (
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
	);
}

export default MarkServiceConfirmed;
