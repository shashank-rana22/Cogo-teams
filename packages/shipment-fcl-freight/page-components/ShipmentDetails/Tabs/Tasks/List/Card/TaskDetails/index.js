import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMTaskCompleted, IcMTaskNotCompleted } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function TaskDetails({
	task = {},
	services = [],
}) {
	const requiredServiceArr = [];
	(task.task_field_ids || []).forEach((id) => {
		(services || []).forEach((serviceObj) => {
			if (serviceObj.id === id) {
				requiredServiceArr.push(serviceObj);
			}
		});
	});
	const taskName = startCase(task.task || task.label);

	return (
		<div className={styles.container}>
			<div className={styles.task_details}>
				<div className={styles.task_and_icon}>
					<div className={styles.icon}>
						{task.status === 'completed' ? (
							<IcMTaskCompleted fill="##F68B21" width="1.5em" height="1.5em" />
						) : (
							<IcMTaskNotCompleted
								fill="##F68B21"
								width="1.5em"
								height="1.5em"
							/>
						)}

					</div>
					<div className={styles.task_name}>{taskName}</div>
				</div>

				{task.deadline ? (
					<div className={styles.deadline}>
						{`( Deadline: ${formatDate({
							date       : task?.deadline,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm aaa'],
							formatType : 'dateTime',
							separator  : ' - ',
						})} )`}
					</div>
				) : null}

				{task.status === 'completed' ? (
					<div className={styles.completed}>
						{`( Completed On: ${formatDate({
							date       : task?.updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})} )`}
					</div>
				) : null}

				{task.due_in ? (
					<div className={styles.completed}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-due-in.svg"
							alt="due-in"
						/>
						{`( Due In: ${task.due_in} )`}
					</div>
				) : null}

				{task.over_due ? (
					<div className={styles.completed}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-over-due.svg"
							alt="over-due"
						/>
						{`( Due In: ${task.over_due} )`}
					</div>
				) : null}
			</div>

			<div className={styles.cargo_details}>
				Cargo details pills
			</div>
		</div>
	);
}

export default TaskDetails;
