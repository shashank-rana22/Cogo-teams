import { Button, Modal } from '@cogoport/components';
import {
	InputController,
	useForm,
} from '@cogoport/forms';
import { useState } from 'react';

import { TASK_LIST } from '../../../utils/constants';
import useIgnoreAllProcess from '../FormComponent/hooks/useIgnoreAllProcess';
import Stepper from '../Stepper';

import styles from './styles.module.css';

function TaskList({
	view_type = 'hrbp_clearance', apiData = {},
	getData = {}, setCurrentComponent = () => {}, refetch = () => [],
}) {
	const [show, setShow] = useState(false);
	const { ignoreApplications } = useIgnoreAllProcess({ refetch });
	const { control, formState:{ errors = {} }, handleSubmit } = useForm();
	const stepperArr = view_type === 'hrbp_clearance' ? TASK_LIST
		: TASK_LIST.filter((val) => val.view_type === view_type);

	const handleCurrentTask = (currentTask) => {
		setCurrentComponent(currentTask);
	};

	const onSubmit = (values) => {
		const payload = {
			ignored_reason : values.reason,
			application_id : getData?.off_boarding_application_id,

		};
		ignoreApplications({ payload, setShow });
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.skip_all}>
					<div>
						<div className={styles.title}>TASK LIST</div>
						<div className={styles.sub_title}>Status of the related tasks</div>
					</div>
					<Button themeType="secondary" onClick={() => setShow(true)}>Skip All</Button>
				</div>
				<div className={styles.details}>
					<Stepper
						items={stepperArr}
						direction="vertical"
						data={apiData}
						handleCurrentTask={handleCurrentTask}
					/>
				</div>
			</div>
			{show && (
				<Modal size="md" show={show} onClose={() => setShow(false)} placement="center">
					<Modal.Header title="Are you sure?" />
					<Modal.Body>

						<div style={{ marginBottom: '4px' }}>Enter reason for skipping</div>
						<InputController
							control={control}
							name="reason"
							isClearable
							rules={{ required: 'this is required' }}
						/>
						{errors.reason && (
							<span className={styles.error}>*This field is Required</span>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={handleSubmit(onSubmit)}>OK</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
}

export default TaskList;
