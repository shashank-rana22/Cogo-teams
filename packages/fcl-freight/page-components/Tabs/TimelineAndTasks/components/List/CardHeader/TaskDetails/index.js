import React from 'react';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { startCase } from '@cogoport/front/utils';
import { IcMTaskCompleted, IcMTaskNotCompleted } from '@cogoport/icons-react';
import CargoDetails from '../../../commons/CargoDetails';
import styles from './styles.module.css';


const TaskDetails = ({
	task = {},
	services = [],
	shipment_data = {},
	primary_service = {},
	selectedTaskId = '',
}) => {
	const requiredServiceArr = [];
	(task.task_field_ids || []).forEach((id) => {
		(services || []).forEach((serviceObj) => {
			if (serviceObj.id === id) {
				requiredServiceArr.push(serviceObj);
			}
		});
	});

	const taskName =
		task?.service_type === 'subsidiary_service'
			? `Mark ${
					task?.subsidiary_service_name.split(' ')[0]
			  } (${task?.subsidiary_service_name.split(' ').slice(1).join(' ')}) ${
					task?.task === 'mark_completed' ? 'Completed' : 'Confirm'
			  }` || startCase(task?.task)
			: startCase(task?.label || task?.task);

	return (
		<div className={styles.flex_row}>
			<div className={styles.task_item} className="flex-wrap">
				<div className={styles.icon_and_task}>
					<div className={styles.task_icon}>
						{task.status === 'completed' ? (
							<IcMTaskCompleted fill="#393f70" width="1.5em" height="1.5em" />
						) : (
							<IcMTaskNotCompleted
								fill="#393f70"
								width="1.5em"
								height="1.5em"
							/>
						)}
					</div>
					<div className={styles.task_name}>{taskName}</div>
				</div>

				{task?.deadline ? (
					<div className={styles.deadline}>
						{`( Deadline: ${formatDate({
							date: task?.deadline,
							dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat: GLOBAL_CONSTANTS.formats.time['HH:mm aaa'],
							formatType: 'dateTime',
							separator: ' - ',
						})} )`}
					</div>
				) : null}

				{task?.status === 'completed' ? (
					<div className={styles.completed} className="rv">
						{`( Completed On: ${formatDate({
							date: task?.updated_at,
							dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType: 'date',
						})} )`}
					</div>
				) : null}

				{task?.due_in ? (
					<div className={styles.completed}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-due-in.svg"
							alt="due-in"
						/>
						{`( Due In: ${task?.due_in} )`}
					</div>
				) : null}

				{task?.over_due ? (
					<div className={styles.completed} className="after_due_date">
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-over-due.svg"
							alt="over-due"
						/>
						{`( Due In: ${task?.over_due} )`}
					</div>
				) : null}
			</div>

			{task?.service_type && !selectedTaskId ? (
				<div className={styles.details_row}>
					<CargoDetails
						details={requiredServiceArr?.[0]}
						primary_service={primary_service}
						shipment_data={shipment_data}
					/>
				</div>
			) : null}
		</div>
	);
};

export default TaskDetails;
