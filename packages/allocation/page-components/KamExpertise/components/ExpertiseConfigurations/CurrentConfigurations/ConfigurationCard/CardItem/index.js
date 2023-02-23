import styles from './styles.module.css';

function CardItem(props) {
	const {
		event, items, min_score, high_impact_rules,
	} = props;

	return (
		<div className={styles.card_container}>
			<div className={styles.header}>
				<div className={styles.heading}>{event}</div>
				<div className={styles.items}>
					{items}
					&nbsp;Items
				</div>
			</div>

			<div className={styles.bottom_container}>
				<div>
					<div className={styles.label}>Min. Score</div>
					<div className={styles.value}>{min_score}</div>
				</div>
				<div>
					<div className={styles.label}>High Impact Rules</div>
					<div className={styles.value}>{high_impact_rules}</div>
				</div>
			</div>
		</div>
	);
}

export default CardItem;
