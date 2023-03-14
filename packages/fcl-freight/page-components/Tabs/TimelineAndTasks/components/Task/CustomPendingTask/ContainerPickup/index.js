import React from 'react';
import useGetTask from '../../../../hooks/useGetTask';
import TaskForm from './TaskForm';

function ContainerPickup({
	pendingTask,
	onCancel,
	Loader,
	services,
	refetch,
	timeLineRefetch,
}) {
	const { getTaskConfigApi, loading } = useGetTask({
		task: pendingTask,
		onCancel,
	});
	const apis_data = getTaskConfigApi?.data?.apis_data;

	return loading ? (
		Loader
	) : (
		<TaskForm
			apis_data={apis_data}
			pendingTask={pendingTask}
			onCancel={onCancel}
			services={services}
			refetch={refetch}
			timeLineRefetch={timeLineRefetch}
		/>
	);
}

export default ContainerPickup;
