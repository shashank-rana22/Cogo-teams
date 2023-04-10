import styles from './styles.module.css';

function PriceBreakupData({ cardTitles = [], data = [] }) {
	return (
		<>
			{
			data.map((dataItem) => (
				<div className={styles.container}>
					<div className={styles.card_title}>
						{cardTitles.map((item) => (
							<div className={`${styles.column_labels} ${styles[`${item.name}_card_title`]}`}>
								<p className={styles.data_labels}>{dataItem[item.name]}</p>
							</div>
						))}
					</div>
				</div>
			))
		}
		</>
	);
}
export default PriceBreakupData;
