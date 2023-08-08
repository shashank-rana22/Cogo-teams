import { Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import { ReopenTasksContext } from '../context';

import styles from './styles.module.css';

function Card({ data = {}, isSelectable = false }) {
	const { selectedTasks, setSelectedTasks } = useContext(ReopenTasksContext);

	return (
		<div
			className={styles.container}
		>
			<div className={styles.body_container}>
				<div className={styles.details_container}>
					{!!isSelectable && (
						<Checkbox
							checked={selectedTasks.has(data?.id)}
							onChange={(e) => {
								if (e?.target?.checked) {
									selectedTasks.set(data?.id, data);
								} else selectedTasks.delete(data?.id);
								setSelectedTasks(new Map(selectedTasks));
							}}
						/>
					)}
					<div className={styles.taskDetails}>
						<div className={styles.label}>
							{data?.label || startCase(data?.task)}
						</div>
						<div className={styles.deadline}>
							(Deadline:
							{' '}
							{formatDate({
								date: data?.deadline,
								dateFormat:
													GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : ' - ',
							})}
							)
						</div>
						<div className={styles.completedOn}>
							(Completed on:
							{' '}
							{formatDate({
								date: data?.updated_at,
								dateFormat:
													GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType: 'date',
							})}
							)
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}

export default Card;
