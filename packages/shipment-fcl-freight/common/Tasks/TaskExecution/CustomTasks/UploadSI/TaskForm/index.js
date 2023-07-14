import { Button } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';
import React from 'react';

import useUpdateSIDetails from '../../../../../../hooks/useUpdateSIDetails';
import TaskContainer from '../../common/TaskContainer';

import styles from './styles.module.css';

function TaskForm({
	apis_data = {},
	pendingTask = {},
	onCancel = () => {},
	services = [],
	taskListRefetch = () => {},
}) {
	const { formProps, loading } =	useUpdateSIDetails({
		apis_data,
		onCancel,
		pendingTask,
		services,
		taskListRefetch,
	}) || {};

	const {
		control,
		modifiedControls,
		showElements,
		errors,
		onSubmit = () => {},
		handleSubmit = () => {},
	} = formProps || {};

	return (
		<TaskContainer pendingTask={pendingTask}>
			<div className={styles.layout}>
				<Layout
					fields={modifiedControls}
					control={control}
					errors={errors}
					showElements={showElements}
				/>
			</div>

			<div className={styles.button_wrap}>
				<Button themeType="secondary" onClick={onCancel} disabled={loading}>
					Cancel
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
					Submit
				</Button>
			</div>
		</TaskContainer>
	);
}

export default TaskForm;
