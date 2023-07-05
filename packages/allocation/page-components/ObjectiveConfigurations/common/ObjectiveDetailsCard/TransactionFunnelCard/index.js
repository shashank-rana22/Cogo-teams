import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const CARD_DATA_MAPPING = [
	{
		label : 'No. of Shipments',
		key   : 'shipment_count',
	},
	{
		label : 'No. of Quotations',
		key   : 'quotation_count',
	},
	{
		label : 'No. of Searches',
		key   : 'shipment_count',
	},
];

function TransactionFunnelCard(props) {
	const { statsDetails } = props;

	const { start_date, end_date } = statsDetails;

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				<h4 className={styles.heading}>Transaction Funnel</h4>
				{start_date && end_date && (
					<Pill size="md">
						{`From ${formatDate({
							date       : start_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})} - ${formatDate({
							date       : end_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}`}
					</Pill>
				)}
			</div>

			<div className={styles.card}>
				{CARD_DATA_MAPPING.map((item) => {
					const { key, label } = item;

					const statItem = statsDetails[key];

					if (isEmpty(statItem)) return null;

					return (
						<div key={key} className={styles.label_value_cotainer}>
							<div className={styles.label}>
								{label}
								:
							</div>

							<div>{statItem}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default TransactionFunnelCard;
