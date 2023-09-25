import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useSelector } from '@cogoport/store';

import { getThisMonthLastDate, getThisMonthStartDate } from '../../../../utils/start-date-functions';

import styles from './styles.module.css';

const START_DATE = getThisMonthStartDate();
const END_DATE = getThisMonthLastDate();

function ProgreeBar() {
	const { user } = useSelector(({ profile }) => profile);

	return (
		<div className={styles.container}>
			<div>
				<p className={styles.username}>{user?.name || ''}</p>
				<p className={styles.points_till_now}>
					Points till now:
					{' '}
					<b>1250</b>
				</p>
			</div>

			<div>
				<div className={styles.progress_header}>
					<div className={styles.date}>
						{formatDate({
							date       : START_DATE,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
							formatType : 'date',
						})}
					</div>

					<div className={styles.today_points}>
						Today:
						{' '}
						<b>220 Points</b>
					</div>

					<div className={styles.date}>
						{formatDate({
							date       : END_DATE,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
							formatType : 'date',
						})}
					</div>
				</div>

				<div className={styles.progress_bar}>
					<Tooltip content={(
						<div>
							<p>
								Realized till now:
								{' '}
								<b>1250</b>
							</p>
							<p>
								Provisional till now:
								{' '}
								<b>500</b>
							</p>
						</div>
					)}
					>
						<div className={styles.progress} />
					</Tooltip>
				</div>
			</div>
		</div>
	);
}

export default ProgreeBar;
