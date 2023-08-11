import useListServices from '../../hooks/useListServices';

import ExecuteTask from './TaskExecution/ExecuteTask';

function Task({
	shipment_data = {},
	task = {},
	onCancel = () => {},
	refetch = () => {},
	shipment_type = '',
}) {
	const { servicesList, servicesLoading } = useListServices({ shipment_id: task?.shipment_id, shipment_type });

	return (
		<div>
			<ExecuteTask
				task={task}
				onCancel={onCancel}
				refetch={refetch}
				shipment_data={shipment_data}
				servicesLoading={servicesLoading}
				primary_service={
					(servicesList || []).find((item) => [`${shipment_type}_service`, `${shipment_type}_freight_service`]
						.includes(item.service_type))
				}
				servicesList={servicesList}
			/>
		</div>
	);
}

export default Task;
