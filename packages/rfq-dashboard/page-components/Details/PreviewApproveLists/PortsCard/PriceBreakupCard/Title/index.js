// import { priceBreakupChildData } from '../../../../../../configurations/price-breakup-card-child-data';
import styles from '../styles.module.css';

function Title({ cardTitles = [], titleData = [] }) {
	return (
		<div className={`${styles.container} ${styles.title_container}`}>

			<div className={styles.card_title}>
				{cardTitles.map((itm) => (
					<div className={`${styles.column_labels} ${styles[`${itm.name}_card_title`]}`}>
						{itm.name === 'sell_price' && 'Total: '}
						{titleData?.[`${itm.name}`]}
						{itm.name === 'service'
							&& (
								<>
									{titleData.labels.map((label) => (
										<div className={styles.tags}>
											{ label }
										</div>
									))}
								</>
							)}
					</div>
				))}
			</div>

		</div>
	);
}
export default Title;
