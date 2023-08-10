import React, { useState } from 'react';

import EditRate from './EditRate';
import formatRate from './helper/formatRate';
import SelectRate from './SelectRate';

const REVENEUE_DESK_SERVICES = [
	'fcl_customs_service',
	'ftl_freight_service',
	'ltl_freight_service',
];

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
	const ONE = 1;
	const TWO = 2;
	const intialStep = REVENEUE_DESK_SERVICES.includes(task.service_type) ? ONE : TWO;
	const [selectedCard, setSelectedCard] = useState(null);
	const [step, setStep] = useState(intialStep);

	if (step === ONE) {
		return (
			<SelectRate
				setStep={setStep}
				setSelectedCard={setSelectedCard}
				task={task}
				servicesList={servicesList}
				selectedCard={selectedCard}
				step={step}
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
