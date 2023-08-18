import { cl, Button, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCRedCircle } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getDisplayDate = (date, dateFormat = 'dd MMM yyyy') => (date ? format(date, dateFormat, null, true) : null);

export default function PendingDocs({ item = {}, clickCard = () => {} }) {
	const FREE_DAYS = [];

	Object.keys(item).forEach((key) => {
		if (key.includes('free_days_')) {
			FREE_DAYS.push({ key, value: item[key] });
		}
	});

	return (
		<div className={styles.details}>

			<div className={cl`${styles.text} ${styles.heading}`}>
				<div className={cl`${styles.title}`}>
					<IcCRedCircle height={8} width={8} />
					<div className={cl`${styles.value}`}>{item?.label || startCase(item?.task)}</div>
				</div>
				<div className={cl`${styles.date_container}`}>
					<div className={cl`${styles.date_container} ${styles.date_heading}`}>Created On :</div>
					<div className={cl`${styles.date_container} ${styles.date_value}`}>
						<Tooltip
							placement="bottom"
							theme="light"
							content={formatDate({
								date: item?.created_at,
								dateFormat:
											GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : ' ',
							})}
						>
							{getDisplayDate(item?.created_at)}
						</Tooltip>
					</div>
					<div className={cl`${styles.date_container} ${styles.date_heading}`}>Deadline :</div>
					<div className={cl`${styles.date_container} ${styles.date_value}`}>
						<Tooltip
							placement="bottom"
							theme="light"
							content={formatDate({
								date: item?.deadline,
								dateFormat:
											GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : ' ',
							})}
						>
							{getDisplayDate(item?.deadline)}
						</Tooltip>
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
