import { cl } from '@cogoport/components';
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
			{!isEmpty(freeDays) ? (
				<div className={styles.details}>
					{freeDays.map((day) => (
						<div key={day?.key} className={cl`${styles.text} ${styles.heading}`}>
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
