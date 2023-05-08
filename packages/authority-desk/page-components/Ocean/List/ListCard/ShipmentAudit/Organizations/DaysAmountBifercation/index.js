import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const agingBuckets = [
	{
		agingDuration : '0 - 30',
		amount        : 'dueByThirtyDaysAmount',
		count         : 'dueByThirtyDaysCount',
	},
	{
		agingDuration : '30 - 60',
		amount        : 'dueBySixtyDaysAmount',
		count         : 'dueBySixtyDaysCount',
	},
	{
		agingDuration : '60 - 90',
		amount        : 'dueByNinetyDaysAmount',
		count         : 'dueByNinetyDaysCount',
	},
	{
		agingDuration : '90+',
		amount        : 'dueByNinetyPlusDaysAmount',
		count         : 'dueByNinetyPlusDaysCount',
	},
];

function DaysAmountBifercation({ item }) {
	return (
		<div className={styles.buckets_container}>
			<b className={styles.overdue_label}>Overdue Invoices by due date</b>

			<div className={styles.divider} />

			<div className={styles.buckets}>
				{agingBuckets.map((bucket) => (
					<div className={styles.bucket}>
						<div className={styles.days_range}>
							{`${bucket.agingDuration} days (${item?.[bucket.count]})`}
						</div>

						<b>
							{formatAmount({
								amount   : item?.[bucket.amount],
								currency : item?.currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</b>
					</div>
				))}
			</div>

		</div>
	);
}

export default DaysAmountBifercation;
