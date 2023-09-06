import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import Stepper from '../Stepper/index.tsx';

import styles from './styles.module.css';

const INCREMENT = 1;
const INITIALIZE_WITH_ZERO = 0;

const data_tasklist = [
	{
		title   : 'HR Meet',
		key     : 'meet',
		subtask : [
			{
				title : 'hr meet1',
				key   : 'meet1',
			}, {
				title : 'hr meet2',
				key   : 'meet2',
			},
		],
	},
	{
		title 	 : 'RM clearance',
		key   	 : 'rm',
		subtask : [
			{
				title : 'RM',
				key   : 'meet1',
			}, {
				title : 'RM',
				key   : 'meet2',
			},
		],
	},
	{
		title : 'Finance clearance',
		key   : 'finance',
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

function TaskList() {
	const [task_active, setTaskActive] = useState(INITIALIZE_WITH_ZERO);
	const [is_sub, setIsSub] = useState(false);
	const [sub_id, setSubId] = useState(INITIALIZE_WITH_ZERO);

	const handleNextClicked = () => {
		if (data_tasklist[task_active].subtask && sub_id < data_tasklist[task_active].subtask.length) {
			setIsSub(true);
			setSubId(sub_id + INCREMENT);
		} else {
			setIsSub(false);
			setTaskActive(task_active + INCREMENT);
		}
	};

	const handleBackClicked = () => {
		if (data_tasklist[task_active].subtask && data_tasklist[task_active].subtask.length < INITIALIZE_WITH_ZERO) {
			setIsSub(true);
			setSubId(sub_id - INCREMENT);
		} else {
			setIsSub(false);
			setTaskActive(task_active - INCREMENT);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>TASK LIST</div>
			<div className={styles.sub_title}>Status of the related tasks</div>
			<div className={styles.details}>
				<Stepper
					active={task_active}
					setActive={setTaskActive}
					items={data_tasklist}
					is_sub={is_sub}
					subid={sub_id}
					direction="vertical"
				/>
			</div>
			<Button onClick={handleNextClicked}>next</Button>
			<Button onClick={handleBackClicked}>back</Button>
		</div>
	);
}

export default TaskList;
