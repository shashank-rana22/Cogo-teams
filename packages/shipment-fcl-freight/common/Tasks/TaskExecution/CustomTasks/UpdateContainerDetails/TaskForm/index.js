import { Button, Checkbox, Input } from '@cogoport/components';
import React, { useState } from 'react';

import useContainerDetails from '../../../../../../hooks/useContainerDetails';
import Layout from '../../../helpers/Layout';
import TaskContainer from '../../common/TaskContainer';

import styles from './styles.module.css';

function TaskForm({
	apis_data,
	pendingTask,
	onCancel,
	services,
	taskListRefetch,
	timeLineRefetch,
}) {
	const [details, setDetails] = useState('');
	const [customDateFormat, setCustomDateFormat] = useState(false);

	const { formProps, handleFillData, loading } =	useContainerDetails({
		apis_data,
		onCancel,
		pendingTask,
		services,
		taskListRefetch,
		timeLineRefetch,
		customDateFormat,
	}) || {};

	const {
		control,
		modifiedControls,
		showElements,
		errors,
		onSubmit,
		handleSubmit,
	} = formProps || {};

	const validDateFormats = '03/21/2000, 2000/03/21, 3/21/2000-09:05:00, 3-21-2000-09:05:00';

	return (
		<TaskContainer pendingTask={pendingTask}>
			<div className={styles.control_container}>
				<div className={styles.input}>
					<Input
						size="sm"
						value={details}
						onChange={(e) => setDetails(e)}
						placeholder="Copy and paste from excel (container number and date)"
					/>
				</div>

				<Button
					className="secondary sm"
					onClick={() => handleFillData(details)}
				>
					Fill Details
				</Button>

				<Checkbox
					checked={customDateFormat}
					onChange={() => setCustomDateFormat(!customDateFormat)}
					style={{
						alignSelf  : 'center',
						marginLeft : 8,
					}}
				/>
				<div className={styles.custom_format}>
					Is your date of this (dd/mm/yyyy) format?
					{customDateFormat && (
						<div className={styles.info}>Please make sure all dates are in this format only</div>
					)}
				</div>

				<div className={styles.info}>
					Other valid date formats:
					{' '}
					{validDateFormats}
				</div>
			</div>

			<Layout
				fields={modifiedControls[0]?.controls}
				control={control}
				errors={errors}
				showElements={showElements}
			/>

			<div className={styles.button_wrap}>
				<Button className="secondary md" onClick={() => onCancel()}>
					cancel
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
					Submit
				</Button>
			</div>
		</TaskContainer>
	);
}

export default TaskForm;
