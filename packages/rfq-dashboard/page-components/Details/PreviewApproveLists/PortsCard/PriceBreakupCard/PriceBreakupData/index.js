// import { priceBreakupChildData } from '../../../../../../configurations/price-breakup-card-child-data';
import styles from '../styles.module.css';

function PriceBreakupData({ cardTitles = [], data = [] }) {
	return (
		<>
			{
			data.map((dataItem) => (
				<div className={`${styles.container} ${styles.title_container}`}>
					<div className={styles.card_title}>
						{cardTitles.map((item) => (
							<div className={`${styles.column_labels} ${styles[`${item.name}_card_title`]}`}>
								{dataItem[item.name]}
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
