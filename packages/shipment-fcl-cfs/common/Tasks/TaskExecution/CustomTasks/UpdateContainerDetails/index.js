import { Loader } from '@cogoport/components';

import useGetTask from '../../../../../hooks/useGetTaskConfig';

import TaskForm from './TaskForm';

function UpdateContainerDetails({
	pendingTask,
	onCancel,
	services,
	taskListRefetch,
}) {
	const { taskConfigData, loading } = useGetTask({
		task: pendingTask,
		onCancel,
	});
	const apis_data = taskConfigData?.apis_data;

	return loading ? (
		<Loader />
	) : (
		<TaskForm
			apis_data={apis_data}
			pendingTask={pendingTask}
			onCancel={onCancel}
			services={services}
			taskListRefetch={taskListRefetch}
		/>
	);
}

export default UpdateContainerDetails;
