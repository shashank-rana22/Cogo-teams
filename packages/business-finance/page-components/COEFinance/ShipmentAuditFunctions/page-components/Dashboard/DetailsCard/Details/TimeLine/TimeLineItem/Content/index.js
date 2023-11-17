import { startCase } from '@cogoport/utils';

import { formatDate } from '../../../../../../../../../commons/utils/formatDate';

import styles from './styles.module.css';

function Content({
	item = {},
	displayCompletedDate = '',
	isComplete = false,
}) {
	return (
		<>
			<div className={styles.tooltip_text}>
				Milestone
				<div className={styles.tooltip_item}>{startCase(item?.milestone)}</div>
			</div>

			{displayCompletedDate ? (
				<div className={styles.tooltip_text}>
					{isComplete ? 'Completed On' : 'Expected'}

					<div className={styles.tooltip_content}>
						{formatDate(item?.completed_on, 'dd-MMM-yyyy', {}, true)}
					</div>

					{item?.is_date_fluctuate ? (
						<div className={styles.tooltip_content}>
							<div className={styles.deviated_data}>Actual Completed On</div>
							{formatDate(item?.actual_completed_on, 'dd-MMM-yyyy', {}, true)}
						</div>
					) : null}
				</div>
			) : null}
		</>
	);
}

export default Content;
