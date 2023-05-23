import styles from './styles.module.css';

function TimelineItem({ item, isLast }) {
	return (
		<div className={styles.container}>

			<div className={styles.sub_container}>
				<div className={styles.circle} />

				{isLast ? null : <div className={styles.line} />}
			</div>

			<div className={styles.label}>
				{item.title}
			</div>

			<div className={styles.date}>
				{new Date().toDateString().slice(4, 11)}
			</div>

		</div>
	);
}

export default TimelineItem;
