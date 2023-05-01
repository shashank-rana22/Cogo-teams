import { Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMTaskCompleted, IcMTaskNotCompleted, IcMFtick, IcMTimer } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import { useContext } from 'react';

import CargoDetails from '../../../CargoDetails';

import formatDeadlineDate from './formatDeadlineDate';
import styles from './styles.module.css';

function TaskDetails({
	task = {},
	isTaskOpen,
}) {
	const { servicesList } = useContext(ShipmentDetailContext);

	const requiredServiceArr = [];
	(task.task_field_ids || []).forEach((id) => {
		(servicesList || []).forEach((serviceObj) => {
			if (serviceObj.id === id) {
				requiredServiceArr.push(serviceObj);
			}
		});
	});
	let taskName = startCase(task?.label || task?.task);

	if (task?.service_type === 'subsidiary_service') {
		taskName = `Mark ( ${requiredServiceArr?.[0]?.service_name} ) ${
			task?.task === 'mark_completed' ? 'Completed' : 'Confirm'
		}` || 	startCase(task?.label) || startCase(task?.task);
	}

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

										&nbsp;Deadline: &nbsp;
										{formatDeadlineDate(new Date(task?.deadline))}
									</div>
								</div>
							</Tooltip>
						) : null}

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
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-due-in.svg"
									alt="due-in"
								/>
								{`( Due In: ${task.due_in} )`}
							</div>
						) : null}

						{task?.over_due ? (
							<div className={styles.completed}>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-over-due.svg"
									alt="over-due"
								/>
								{`( Due In: ${task.over_due} )`}
							</div>
						) : null}
					</div>
				</div>

				{!isTaskOpen && task?.service_type ? (
					<div className={styles.cargo_details}>
						<CargoDetails primary_service={requiredServiceArr?.[0] || {}} />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default TaskDetails;
