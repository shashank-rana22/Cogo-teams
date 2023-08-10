import React, { useState } from 'react';

import EditRate from './EditRate';
import formatRate from './helper/formatRate';
import SelectRate from './SelectRate';

const REVENUE_DESK_SERVICES = ['lcl_customs_service'];

function MarkServiceConfirmed({
	task = {},
	servicesList = [],
	onCancel = () => {},
	primary_service = {},
	shipment_data = {},
	refetch = () => {},
}) {
	const intialStep = REVENUE_DESK_SERVICES.includes(task.service_type) ? 1 : 2;
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
		{
			selectedCard,
			shipment_data,
			service_type_prop: task.service_type,
			primary_service,
			servicesList,
		},
	);

	return (
		<EditRate
			task={task}
			servicesList={servicesList}
			onCancel={onCancel}
			shipment_data={shipment_data}
			refetch={refetch}
			formattedRate={formattedRate}
		/>
	);
}

export default MarkServiceConfirmed;
