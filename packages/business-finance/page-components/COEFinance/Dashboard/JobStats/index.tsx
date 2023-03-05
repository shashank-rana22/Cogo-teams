import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function JobStats({ jobData }) {
	return (
		<div className={styles.flex}>
			{(jobData || [{}]).map((item) => {
				const { income, expense, count, state } = item || {};
				const profit = ((income - expense) / income) * 100;
				return (
					<div className={styles.item}>

						<div className={styles.sub_flex}>
							<div className={styles.label}>
								<div>{startCase(state)}</div>
								<div>Job</div>
							</div>
							<Tooltip
								content={(
									<div className={styles.content}>
										<div className={styles.flex}>
											<div className={styles.price}>
												Income :
											</div>
											{getFormattedPrice(income, 'INR')}
										</div>

										<div className={styles.flex}>
											<div className={styles.price}>
												Expense :
											</div>
											{getFormattedPrice(expense, 'INR')}
										</div>
									</div>
								)}
								interactive
								placement="bottom"
							>
								<div className={styles.ship_id}>
									Shipment ID’s :
									{count}
								</div>
							</Tooltip>

						</div>

						<div className={styles.border} />

						<div className={styles.value}>
							{profit.toFixed(2)}

							%
						</div>
					</div>
				);
			})}

		</div>
	);
}
export default JobStats;
