import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMTaskCompleted, IcMTaskNotCompleted, IcMFtick, IcMTimer } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import CargoDetails from '../../../../commons/CargoDetails';

import formatDeadlineDate from './formatDeadlineDate';
import styles from './styles.module.css';

const REMOVE_LINE_ITEM_NAME = 1;

function TaskDetails({
	task = {},
	isTaskOpen = false,
	servicesList = [],
}) {
	const REQUIRED_SERVICE_ARRAY = [];
	(task.task_field_ids || []).forEach((id) => {
		(servicesList || []).forEach((serviceObj) => {
			if (serviceObj.id === id) {
				REQUIRED_SERVICE_ARRAY.push(serviceObj);
			}
		});
	});
	let taskName = startCase(task?.label || task?.task);

	if (task?.service_type === 'subsidiary_service') {
		taskName = `Mark ${
			task?.subsidiary_service_name.split(' ')[GLOBAL_CONSTANTS.zeroth_index]
		} (${task?.subsidiary_service_name.split(' ').slice(REMOVE_LINE_ITEM_NAME).join(' ')}) ${
			task?.task === 'mark_completed' ? 'Completed' : 'Confirm'
		}` || 	startCase(task?.label) || startCase(task?.task);
	}
	const messageCondition =	task?.task === 'confirm_service_provider'
	&& task?.booking_confirmation_status === 'pending'
	&& task?.service_type === 'air_freight_service';

	return (
		<div className={styles.container}>
			<div className={styles.task_and_icon}>
				<div className={styles.icon}>
					{task?.status === 'completed' ? (
						<IcMTaskCompleted fill="##F68B21" width="1.5em" height="1.5em" />
					) : (
						<IcMTaskNotCompleted
							fill="##F68B21"
							width="1.5em"
							height="1.5em"
						/>
					)}
				</div>
			</div>

			<div>
				<div className={styles.details}>
					<div className={styles.task_name}>{taskName}</div>

					<div className={styles.task_date_details}>
						{task?.deadline ? (
							<Tooltip
								interactive
								theme="light"
								content={(
									<div style={{ fontSize: '10px' }}>
										{format(
											task?.deadline,
											`${GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']}
											${GLOBAL_CONSTANTS.formats.time['hh:mm aaa']}`,
											null,
											true,
										)}
									</div>
								)}
							>
								<div>
									<div className={styles.deadline}>
										<IcMTimer />

										<span className={styles.deadline_text}>Deadline:</span>
										{formatDeadlineDate(new Date(task?.deadline))}
									</div>
								</div>
							</Tooltip>
						) : null}
						{messageCondition && task?.status === 'pending' && (
							<div className={styles.message}>( Awaiting response from Service Provider )</div>
						)}
						{messageCondition && task?.status === 'completed' && (
							<div className={styles.message}>( Bypassed the process )</div>
						)}
						{task?.status === 'completed' ? (
							<div className={styles.completed}>
								<IcMFtick />

								{`Completed On: ${formatDate({
									date       : task?.updated_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
									separator  : ' - ',
								})}`}
							</div>
						) : null}

						{task?.due_in ? (
							<div className={styles.completed}>
								<img
									src={GLOBAL_CONSTANTS.image_url.due_in_svg}
									alt="due-in"
								/>
								{`( Due In: ${task.due_in} )`}
							</div>
						) : null}

						{task?.over_due ? (
							<div className={styles.completed}>
								<img
									src={GLOBAL_CONSTANTS.image_url.over_due_svg}
									alt="over-due"
								/>
								{`( Due In: ${task.over_due} )`}
							</div>
						) : null}
					</div>
				</div>

				{!isTaskOpen && task?.service_type ? (
					<div className={styles.cargo_details}>
						<CargoDetails primary_service={REQUIRED_SERVICE_ARRAY?.[GLOBAL_CONSTANTS.zeroth_index] || {}} />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default TaskDetails;
