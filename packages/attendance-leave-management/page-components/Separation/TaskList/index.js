// import { Button } from '@cogoport/components';
// import React, { useState } from 'react';

import Stepper from '../NewStepper';

import styles from './styles.module.css';

// const INCREMENT = 1;
// const INITIALIZE_WITH_ZERO = 0;

// const apiData = {
// 	hr_meet      : 'completed',
// 	rm_clearance : {
// 		rm_clearance   : 'active',
// 		review_request : 'pending',
// 		assign_hoto    : 'completed',
// 	},
// 	finance_clearance : 'active',
// 	hoto_clearance    : 'completed',
// 	admin_clearance   : 'pending',
// 	tech_clearance    : 'pending',
// 	exit_interview    : {
// 		exit_interview      : 'active',
// 		interview_scheduled : 'pending',
// 		feedback_form       : 'pending',
// 		interview_completed : 'pending',
// 	},
// };

const data_tasklist = [
	{
		title     : 'HR Meet',
		key       : 'hr_meet',
		view_type : 'hr_meet',
	},
	{
		title   	 : 'RM Clearance',
		key     	 : 'rm_clearance',
		view_type : 'manager_clearance',
		subtask   : [
			{
				title : 'Review Request',
				key   : 'review_request',
			},
			{
				title : 'Assign HOTO',
				key   : 'assign_hoto',
			},
		],
	},
	{
		title     : 'Finance clearance',
		key       : 'finance_clearance',
		view_type : 'finance_clearance',
	},
	{
		title     : 'HOTO Clearance',
		key       : 'hoto_clearance',
		view_type : 'hoto_clearance',
	},
	{
		title     : 'Admin Clearance',
		key       : 'admin_clearance',
		view_type : 'admin_clearance',
	},
	{
		title     : 'Tech Clearance',
		key       : 'tech_clearance',
		view_type : 'tech_clearance',
	},
	{
		title   	 : 'Exit Interview',
		key     	 : 'exit_interview',
		view_type : 'exit_interview',
		subtask   : [
			{
				title : 'Interview Scheduled',
				key   : 'interview_scheduled',
			},
			{
				title : 'Interview Completed',
				key   : 'interview_completed',
			},
		],
	},
];

// function Step({ index, taskdetails }) {
// 	return (
// 		<div>
// 			<Avatar className={styles.avatar} personName={`${index}`} />
// 			{taskdetails.title}
// 		</div>
// 	);
// }

function TaskList({ view_type = 'hrbp_clearance', apiData = {}, setCurrentComponent = () => {} }) {
	console.log('view_type', view_type, apiData);

	// const [task_active, setTaskActive] = useState(INITIALIZE_WITH_ZERO);
	// const [is_sub, setIsSub] = useState(false);
	// const [sub_id, setSubId] = useState(INITIALIZE_WITH_ZERO);

	// const handleNextClicked = () => {
	// 	if (data_tasklist[task_active].subtask && sub_id < data_tasklist[task_active].subtask.length) {
	// 		setIsSub(true);
	// 		setSubId(sub_id + INCREMENT);
	// 	} else {
	// 		setIsSub(false);
	// 		setTaskActive(task_active + INCREMENT);
	// 	}
	// };

	// const handleBackClicked = () => {
	// 	if (data_tasklist[task_active].subtask && data_tasklist[task_active].subtask.length < INITIALIZE_WITH_ZERO) {
	// 		setIsSub(true);
	// 		setSubId(sub_id - INCREMENT);
	// 	} else {
	// 		setIsSub(false);
	// 		setTaskActive(task_active - INCREMENT);
	// 	}
	// };

	const stepperArr = view_type === 'hrbp_clearance' ? data_tasklist
		: data_tasklist.filter((val) => val.view_type === view_type);

	const handleCurrentTask = (currentTask) => {
		setCurrentComponent(currentTask);
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>TASK LIST</div>
			<div className={styles.sub_title}>Status of the related tasks</div>
			<div className={styles.details}>
				{/* <Stepper
					active={task_active}
					setActive={setTaskActive}
					items={data_tasklist}
					is_sub={is_sub}
					subid={sub_id}
					direction="vertical"
				/> */}
				<Stepper
					// active={task_active}
					// setActive={setTaskActive}
					items={stepperArr}
					// is_sub={is_sub}
					// subid={sub_id}
					direction="vertical"
					data={apiData}
					handleCurrentTask={handleCurrentTask}
				/>
			</div>
			{/* <Button onClick={handleNextClicked}>next</Button>
			<Button onClick={handleBackClicked}>back</Button> */}
		</div>
	);
}

export default TaskList;
