import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CardItem(props) {
	const {
		expertise_type, items, min_score_value, high_priority_count,
	} = props;

	return (
		<div className={styles.card_container}>
			<div className={styles.header}>
				<div className={styles.heading}>{startCase(expertise_type ?? '--')}</div>
				<div className={styles.items}>
					{items ? `${items} Items` : '___' }

				</div>
			</div>

			<div className={styles.bottom_container}>
				<div>
					<div className={styles.label}>Min. Score</div>
					<div className={styles.value}>{min_score_value ?? ''}</div>
				</div>
				<div>
					<div className={styles.label}>High Impact Rules</div>
					<div className={styles.value}>{high_priority_count ?? ''}</div>
				</div>
			</div>
		</div>
	);
}

export default CardItem;
