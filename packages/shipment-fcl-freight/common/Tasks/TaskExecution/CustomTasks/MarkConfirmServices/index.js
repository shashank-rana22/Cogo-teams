import React, { useState } from 'react';

import EditRate from './EditRate';
import formatRate from './helper/formatRate';
import SelectRate from './SelectRate';

const REVENUE_DESK_SERVICES = [
	'ftl_freight_service',
	'fcl_customs_service',
	'fcl_cfs_service',
	'haulage_freight_service',
];

const SELECT_RATE_STEP = 1;
const EDIT_RATE_STEP = 2;

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
	const initialStep = REVENUE_DESK_SERVICES.includes(task.service_type) ? SELECT_RATE_STEP : EDIT_RATE_STEP;
	const [selectedCard, setSelectedCard] = useState([]);
	const [step, setStep] = useState(initialStep);

	if (step === SELECT_RATE_STEP) {
		return (
			<SelectRate
				setStep={setStep}
				setSelectedCard={setSelectedCard}
				selectedCard={selectedCard}
				task={task}
				servicesList={servicesList}
				step={step}
			/>
		);
	}

	const formattedRate = formatRate(
		selectedCard,
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
