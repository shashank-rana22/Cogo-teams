import { cl } from '@cogoport/components';
import { IcCRedCircle, IcCGreenCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const DOC_LABEL_INDEX = 1;

export default function CardFooter({ item = {} }) {
	const FREE_DAYS = [];

	Object.keys(item).forEach((key) => {
		if (key.includes('free_days_')) {
			FREE_DAYS.push({ key, value: item[key] });
		}
	});

	const getDocLabel = (label) => {
		const updatedLabel = label.split('Upload')?.[DOC_LABEL_INDEX];
		return updatedLabel;
	};

	return (
		<div className={styles.card_footer}>
			{!isEmpty(item?.documents) ? (
				<div className={styles.details}>
					<div className={styles.text}>Documents :</div>

					{item?.documents?.map((doc) => (
						<div key={doc?.label} className={cl`${styles.text} ${styles.heading}`}>
							{doc?.status === 'daily_report' ? (
								<IcCGreenCircle height={8} width={8} />
							) : (
								<IcCRedCircle height={8} width={8} />
							)}
							<div className={cl`${styles.text} ${styles.value}`}>{getDocLabel(doc?.label)}</div>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
