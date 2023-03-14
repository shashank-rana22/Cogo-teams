import React, { useState } from 'react';
import { Button, CheckBox, Input } from '@cogoport/front/components/admin';
import TaskContainer from '../../commons/TaskContainer';
import FormLayout from '../../../../../../commons/Layout';
import useContainerPickup from '../hooks/useContainerPickup';
import { ButtonWrap, ControlContainer, CustomFormat, Info } from './styles';

function TaskForm({
	apis_data,
	pendingTask,
	onCancel,
	services,
	refetch,
	timeLineRefetch,
}) {
	const [details, setDetails] = useState('');
	const [customDateFormat, setCustomDateFormat] = useState(false);

	const { formProps, handleFillData, loading } =
		useContainerPickup({
			apis_data,
			onCancel,
			pendingTask,
			services,
			refetch,
			timeLineRefetch,
			customDateFormat,
		}) || {};

	const {
		fields,
		modifiedControls,
		showElements,
		errors,
		onSubmit,
		handleSubmit,
	} = formProps || {};

	const validDateFormats =
		'03/21/2000, 2000/03/21, 3/21/2000-09:05:00, 3-21-2000-09:05:00';

	return (
		<TaskContainer pendingTask={pendingTask}>
			<ControlContainer>
				<Input
					value={details}
					onChange={(e) => setDetails(e.target.value)}
					placeholder="Copy and paste from excel (container number and date)"
				/>

				<Button
					className="secondary sm"
					onClick={() => handleFillData(details)}
				>
					Fill Details
				</Button>

				<CheckBox
					className="primary lg"
					checked={customDateFormat}
					onChange={setCustomDateFormat}
					style={{
						alignSelf: 'center',
						marginLeft: 8,
					}}
				/>
				<CustomFormat>
					Is your date of this (dd/mm/yyyy) format?
					{customDateFormat && (
						<Info>Please make sure all dates are in this format only</Info>
					)}
				</CustomFormat>

				<Info className="other-dates">
					Other valid date formats: {validDateFormats}
				</Info>
			</ControlContainer>

			<FormLayout
				controls={modifiedControls || []}
				fields={fields}
				errors={errors}
				showElements={showElements}
			/>

			<ButtonWrap>
				<Button className="secondary md" onClick={() => onCancel()}>
					cancel
				</Button>

				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
					Submit
				</Button>
			</ButtonWrap>
		</TaskContainer>
	);
}

export default TaskForm;
