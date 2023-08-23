import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const getCardDataMapping = ({ t = () => {} }) => ([
	{
		label : t('allocation:shipment_count'),
		key   : 'shipment_count',
	},
	{
		label : t('allocation:quotation_count'),
		key   : 'quotation_count',
	},
	{
		label : t('allocation:search_count'),
		key   : 'search_count',
	},
]);

function TransactionFunnelCard(props) {
	const { t } = useTranslation(['allocation']);

	const { statsDetails } = props;

	const { date_range : { startDate, endDate } = {} } = statsDetails;

	const cardDataMapping = getCardDataMapping({ t });

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				<h4 className={styles.heading}>{t('allocation:transaction_funnel')}</h4>
				{startDate && endDate && (
					<Pill size="md">
						{`From ${formatDate({
							date       : startDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})} - ${formatDate({
							date       : endDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}`}
					</Pill>
				)}
			</div>

			<div className={styles.card}>
				{cardDataMapping.map((item) => {
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
