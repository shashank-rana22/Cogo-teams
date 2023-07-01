import { Button, Checkbox, Input } from '@cogoport/components';
import { Layout } from '@cogoport/ocean-modules';
import React, { useState } from 'react';

import useContainerDetails from '../../../../../../hooks/useContainerDetails';
import TaskContainer from '../../common/TaskContainer';

import styles from './styles.module.css';

const VALID_DATE_FORMATS = '03/21/2000, 2000/03/21, 3/21/2000-09:05:00, 3-21-2000-09:05:00';

function TaskForm({
	apis_data = {},
	pendingTask = {},
	onCancel = () => {},
	services = [],
	taskListRefetch = () => {},
}) {
	const [details, setDetails] = useState('');
	const [customDateFormat, setCustomDateFormat] = useState(false);

	const { formProps, handleFillData = () => {}, loading } =	useContainerDetails({
		apis_data,
		onCancel,
		pendingTask,
		services,
		taskListRefetch,
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

				<div className={styles.check_box}>
					<Checkbox
						checked={customDateFormat}
						onChange={() => setCustomDateFormat(!customDateFormat)}
					/>
					<div className={styles.custom_format}>
						Is your date of this (dd/mm/yyyy) format?
						{customDateFormat && (
							<div className={styles.info}>Please make sure all dates are in this format only</div>
						)}
					</div>
				</div>

				<div className={styles.info}>
					Other valid date formats:
					&nbsp;
					{VALID_DATE_FORMATS}
				</div>
			</div>

			<div className={styles.layout}>
				<Layout
					fields={modifiedControls}
					control={control}
					errors={errors}
					showElements={showElements}
				/>
			</div>

			<div className={styles.button_wrap}>
				<Button themeType="secondary" onClick={() => onCancel()} disabled={loading}>
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
