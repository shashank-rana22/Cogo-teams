import React from 'react';
import EditRate from '../MarkConfirmServices/EditRate';
import formatRate from '../../../../helper/format-rates';

const MarkServiceConfirmedRail = ({
	task = {},
	services = [],
	onCancel = () => {},
	shipment_data = {},
	timeLineRefetch = () => {},
	refetch = () => {},
	localService = '',
}) => {
	const formattedRate = formatRate(shipment_data, task.service_type);

	return (
		<>
			<EditRate
				task={task}
				services={services}
				onCancel={onCancel}
				shipment_data={shipment_data}
				timeLineRefetch={timeLineRefetch}
				refetch={refetch}
				localService={localService}
				formattedRate={formattedRate}
			/>
		</>
	);
};

export default MarkServiceConfirmedRail;
