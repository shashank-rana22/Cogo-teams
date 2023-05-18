import { cl, Button } from '@cogoport/components';
import { IcCRedCircle } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import styles from './styles.module.css';

const getDisplayDate = (date, dateFormat = 'dd MMM yyyy') => (date ? format(date, dateFormat, null, true) : null);

export default function PendingDocs({ item = {}, clickCard = () => {} }) {
	const freeDays = [];

	Object.keys(item).forEach((key) => {
		if (key.includes('free_days_')) {
			freeDays.push({ key, value: item[key] });
		}
	});

	return (
		<div className={styles.details}>

			<div className={cl`${styles.text} ${styles.heading}`}>
				<div className={cl`${styles.title}`}>
					<IcCRedCircle height={8} width={8} />
					<div className={cl`${styles.value}`}>{item?.label}</div>
				</div>
				<div className={cl`${styles.date_container}`}>
					<div className={cl`${styles.date_container} ${styles.date_heading}`}>Created On :</div>
					<div className={cl`${styles.date_container} ${styles.date_value}`}>
						{getDisplayDate(item?.created_at)}
					</div>
					<div className={cl`${styles.date_container} ${styles.date_heading}`}>Deadline :</div>
					<div className={cl`${styles.date_container} ${styles.date_value}`}>
						{getDisplayDate(item?.deadline)}
					</div>

				</div>
				<div className={cl`${styles.button_container}`}>
					<Button
						key="upload"
						size="md"
						className={styles.action_buttons}
						onClick={clickCard}
					>
						Upload
					</Button>
				</div>
			</div>

		</div>
	);
}
