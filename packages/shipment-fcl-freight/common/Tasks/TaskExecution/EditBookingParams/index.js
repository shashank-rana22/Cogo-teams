import { Toast } from '@cogoport/components';
import { useState, useImperativeHandle, forwardRef } from 'react';

import EditContainerNumbers from './EditContainerNumber';
import useUpdateContainerDetails from './hooks/useUpdateContainerDetails';
import styles from './styles.module.css';

const TASK_CONTROL_CONFIG = {
	mark_container_gated_in: {
		errorText    : 'Select correct number of Containers which not gated in',
		controlLabel : 'Please select containers which could not gated in',
	},
	mark_vessel_departed: {
		errorText    : 'Select correct number of Containers which not be departed',
		controlLabel : 'Please select containers which could not be departed',
	},
};

const INITIAL_CONTAINERS_COUNT_FOR_ROLLOVER = 0;

function EditBookingParams({ task = {}, formProps = {}, getApisData = {} }, ref) {
	const {
		updateData,
		total_containers_count,
		formValues,
		formTrigger,
		groupedData,
	} = useUpdateContainerDetails({
		getApisData,
		task,
		formProps,
	});

	const initialValue = Object.values(groupedData).map((item) => ({
		service_id        : item.service_id,
		service_type      : item.service_type,
		original_count    : item.container_numbers.length,
		container_size    : item.container_size,
		container_type    : item.container_type,
		container_numbers : [],
	}));

	const [selectedContainers, setSelectedContainers] = useState(initialValue);

	const selectedForRollover = selectedContainers.reduce(
		(acc, curr) => acc + curr.container_numbers.length,
		INITIAL_CONTAINERS_COUNT_FOR_ROLLOVER,
	);

	useImperativeHandle(ref, () => ({
		handleSubmit: async () => {
			const isFormValid = await formTrigger();

			if (isFormValid) {
				if (
					+formValues.containers_count
					!== total_containers_count - selectedForRollover
				) {
					Toast.error(TASK_CONTROL_CONFIG[task.task].errorText, {
						autoClose: 5000,
					});
					return Promise.reject();
				}
				return new Promise((res, rej) => {
					updateData(selectedContainers, res, rej);
				});
			}
			return Promise.reject();
		},
	}));

	return (
		<div className={styles.form_container}>
			<b>
				{TASK_CONTROL_CONFIG[task.task].controlLabel}
				{' '}
				(Total:
				{' '}
				{total_containers_count - formValues.containers_count}
				)
			</b>

			{Object.entries(groupedData).map(([key, item], index) => (
				<EditContainerNumbers
					key={key}
					task={task}
					item={item}
					index={index}
					selectedContainers={selectedContainers}
					setSelectedContainers={setSelectedContainers}
				/>
			))}
		</div>
	);
}

export default forwardRef(EditBookingParams);
