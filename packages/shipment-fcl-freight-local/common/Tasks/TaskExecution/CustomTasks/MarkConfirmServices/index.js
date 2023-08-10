import { useState } from 'react';

import EditRate from './EditRate';
import formatRate from './helper/formatRate';
import SelectRate from './SelectRate';

const REVENEUE_DESK_SERVICES = [
	'fcl_customs_service',
	'fcl_cfs_service',
	'haulage_freight_service',
];
const INITIAL_STATE_FOR_REVENUE_DESK = 1;
const MAX_STEP = 2;

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
	const intialStep = REVENEUE_DESK_SERVICES.includes(task.service_type) ? INITIAL_STATE_FOR_REVENUE_DESK : MAX_STEP;
	const [selectedCard, setSelectedCard] = useState(null);
	const [step, setStep] = useState(intialStep);

	if (step === INITIAL_STATE_FOR_REVENUE_DESK) {
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
