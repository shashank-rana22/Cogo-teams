import React, { useState } from 'react';

// import formatRate from '../../../../helper/format-rates';
// import useUpdateBookingPreference from '../../../../hooks/useUpdateBookingPreference';

import EditRate from './EditRate';
import SelectRate from './SelectRate';

const revenueDeskServices = [
	'air_freight_service',
	'ftl_freight_service',
	'fcl_customs_service',
	'air_customs_service',
	'lcl_customs_service',
	'ltl_freight_service',
	'fcl_cfs_service',
	'haulage_freight_service',
];

function MarkServiceConfirmed({
	task = {},
	services = [],
	onCancel = () => {},
	shipment_data = {},
	timeLineRefetch = () => {},
	refetch = () => {},
	localService = '',
}) {
	const { source = '' } = shipment_data;
	const intialStep = revenueDeskServices.includes(task.service_type) ? 1 : 2;
	const [selectedCard, setSelectedCard] = useState(null);
	const [step, setStep] = useState(intialStep);
	// const { updateConfirmation } = useUpdateBookingPreference();

	if (step === 1) {
		return (
			<SelectRate
				setStep={setStep}
				setSelectedCard={setSelectedCard}
				// updateConfirmation={updateConfirmation}
				task={task}
				source={source}
			/>
		);
	}
	// const formattedRate = formatRate(
	// 	selectedCard,
	// 	shipment_data,
	// 	task.service_type,
	// );
	return (
		<EditRate
			task={task}
			services={services}
			onCancel={onCancel}
			shipment_data={shipment_data}
			timeLineRefetch={timeLineRefetch}
			refetch={refetch}
			localService={localService}
			// formattedRate={formattedRate}
		/>
	);
}

export default MarkServiceConfirmed;
