import { Loader } from '@cogoport/components';

import useListServices from '../../hooks/useListServices';

import styles from './styles.module.css';
import ExecuteTask from './TaskExecution/ExecuteTask';

function Task({
	task = {},
	onCancel = () => {},
	refetch = () => {},
	tasksLoading,
	shipment_type = 'fcl_freight',
	shipment_data,
	primary_service,
}) {
	const { servicesList, servicesLoading } = useListServices({ shipment_id: task?.shipment_id, shipment_type });

	return (
		<div className={styles.container}>
			{tasksLoading || servicesLoading ? (
				<div>
					<Loader />
					Loading Tasks
				</div>
			) : (
				<ExecuteTask
					task={task}
					onCancel={onCancel}
					refetch={refetch}
					shipment_data={shipment_data}
					primary_service={primary_service}
					Loader={Loader}
					servicesList={servicesList}
				/>
			)}
		</div>
	);
}

export default Task;
