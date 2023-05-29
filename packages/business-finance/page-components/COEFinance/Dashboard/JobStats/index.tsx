import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function JobStats({ jobData }) {
	return (
		<div className={styles.flex}>
			{(jobData || [{}]).map((item) => {
				const { income, expense, count, state } = item || {};
				const profit = ((income - expense) / income) * 100;
				const calcWidth = 100 / (jobData || [{}]).length;
				return (
					<div className={styles.item} style={{ width: `${calcWidth}%` }} key={item}>

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
											{formatAmount({
												amount   :	income,
												currency : GLOBAL_CONSTANTS.currency_code.INR,
												options  : {
													style           : 'currency',
													currencyDisplay : 'code',
												},
											})}
										</div>

										<div className={styles.flex}>
											<div className={styles.price}>
												Expense :
											</div>
											{formatAmount({
												amount   :	expense,
												currency : GLOBAL_CONSTANTS.currency_code.INR,
												options  : {
													style           : 'currency',
													currencyDisplay : 'code',
												},
											})}
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
