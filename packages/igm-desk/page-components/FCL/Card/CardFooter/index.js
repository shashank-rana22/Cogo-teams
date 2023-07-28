import { cl } from '@cogoport/components';
import { IcCRedCircle, IcCGreenCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const DOC_LABEL_INDEX = 1;

const getDocLabel = (label) => {
	const updatedLabel = label.split('Upload')?.[DOC_LABEL_INDEX];
	return updatedLabel;
};

export default function CardFooter({ item = {} }) {
	return (
		<section className={styles.card_footer}>
			{!isEmpty(item?.documents) ? (
				<div className={styles.details}>
					<span className={styles.text}>Documents :</span>

					{item?.documents?.map((doc) => (
						<div key={doc?.label} className={cl`${styles.text} ${styles.heading}`}>
							{doc?.status === 'completed' ? (
								<IcCGreenCircle height={8} width={8} />
							) : (
								<IcCRedCircle height={8} width={8} />
							)}
							<span className={cl`${styles.text} ${styles.value}`}>{getDocLabel(doc?.label)}</span>
						</div>
					))}
				</div>
			) : null}
		</section>
	);
}
