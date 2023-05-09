import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCRedCircle, IcCGreenCircle } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

export default function CardFooter({ item = {} }) {
	const freeDays = [];

	Object.keys(item).forEach((key) => {
		if (key.includes('free_days_')) {
			freeDays.push({ key, value: item[key] });
		}
	});

	return (
		<div className={styles.card_footer}>
			{!isEmpty(item?.documents) ? (
				<div className={styles.details}>
					<div className={styles.text}>Documents Required:</div>

					{item?.documents?.map((doc) => (
						<div className={cl`${styles.text} ${styles.heading}`}>
							{doc?.status === 'completed' ? (
								<IcCGreenCircle height={8} width={8} />
							) : (
								<IcCRedCircle height={8} width={8} />
							)}
							<div className={cl`${styles.text} ${styles.value}`}>{doc?.label}</div>
						</div>
					))}
				</div>
			) : null}

			{!isEmpty(item?.cutoffs) ? (
				<div className={styles.details}>
					{Object.keys(item?.cutoffs)?.map((dates) => (
						<div className={cl`${styles.text} ${styles.heading}`}>
							{startCase(dates)}
							:
							<div className={cl`${styles.text} ${styles.value}`}>
								{formatDate({
									date       : item?.cutoffs?.[dates],
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}
							</div>
						</div>
					))}
				</div>
			) : null}

			{!isEmpty(freeDays) ? (
				<div className={styles.details}>
					{freeDays.map((day) => (
						<div className={cl`${styles.text} ${styles.heading}`}>
							{startCase(day?.key)}
							:
							<div className={cl`${styles.text} ${styles.value}`}>{day?.value}</div>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
