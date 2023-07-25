import { Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMTaskCompleted, IcMTaskNotCompleted, IcMFtick, IcMTimer } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useContext } from 'react';

import CargoDetails from '../../../CargoDetails';

import formatDeadlineDate from './formatDeadlineDate';
import getTaskDisplayName from './helpers/getTaskDisplayName';
import styles from './styles.module.css';

function TaskDetails({
	task = {},
	isTaskOpen = false,
}) {
	const { shipment_data, servicesList } = useContext(ShipmentDetailContext);

	const REQUIRED_SERVICE_ARR = [];
	(task.task_field_ids || []).forEach((id) => {
		(servicesList || []).forEach((serviceObj) => {
			if (serviceObj.id === id) {
				REQUIRED_SERVICE_ARR.push(serviceObj);
			}
		});
	});

	const taskName = getTaskDisplayName({ shipment_data, task, REQUIRED_SERVICE_ARR, servicesList });

	return (
		<section className={styles.container}>
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
					<span className={styles.task_name}>{taskName}</span>

					<div className={styles.task_date_details}>
						{task?.status !== 'completed' && task?.deadline ? (
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
										{' '}
										Deadline:
										{' '}
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
						<CargoDetails primary_service={REQUIRED_SERVICE_ARR?.[GLOBAL_CONSTANTS.zeroth_index] || {}} />
					</div>
				) : null}
			</div>
		</section>
	);
}

export default TaskDetails;
