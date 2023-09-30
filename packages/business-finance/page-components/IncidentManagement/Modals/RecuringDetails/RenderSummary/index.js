import styles from './styles.module.css';

function RenderSummary({ summary = [] }) {
	return (

		<div className={styles.summary}>
			{summary?.map((item) => (
				<div key={item.title} className={styles.section}>
					<div className={styles.title}>{item?.title || '-'}</div>
					<div className={styles.value}>{item?.value || '-'}</div>
				</div>
			))}
		</div>

	);
}

export default RenderSummary;
