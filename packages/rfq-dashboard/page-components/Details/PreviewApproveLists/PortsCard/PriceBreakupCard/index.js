import { priceBreakupChildData } from '../../../../../configurations/price-breakup-card-child-data';

import PriceBreakupData from './PriceBreakupData';
import styles from './styles.module.css';
import Title from './Title';

function PriceBreakupCard() {
	const cardTitles = [
		{ label: 'Service', name: 'service' },
		{ label: 'Base Price', name: 'base_price' },
		{ label: 'Margin Type', name: 'margin_type' },
		{ label: 'Margin Value', name: 'margin_value' },
		{ label: 'Sell Price', name: 'sell_price' },
	];
	return (
		<div className={styles.container}>
			<div className={styles.card_title}>
				{
					cardTitles.map((itm) => (
						<div className={`${styles.column_labels} ${styles[`${itm.name}_card_title`]}`}>{itm.label}</div>
					))
				}
			</div>
			{
				priceBreakupChildData.map((dataItem) => (
					// <div className={styles.price_breakup_child_container}>
					<>
						<Title cardTitles={cardTitles} titleData={dataItem.title} />
						<PriceBreakupData cardTitles={cardTitles} data={dataItem.data} />
					</>
					// </div>
				))
			}

		</div>
	);
}
export default PriceBreakupCard;
