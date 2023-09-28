import formatAmount from '@cogoport/globalization/utils/formatAmount';

import BlockUser from '../../../common/BlockUser';

import AllotedAmount from './AllotedAmount';
import styles from './styles.module.css';

const ZERO = 0;

const formattedData = ({ promoAllocationList = [], refetch = () => {}, selectedDetails = {} }) => {
	const formattedDataList = (promoAllocationList || []).map((item) => ({
		name         : <div className={styles.Title}>{item?.name}</div>,
		total_budget : (
			<div className={styles.div}>
				<AllotedAmount
					item={item}
					refetch={refetch}
					selectedDetails={selectedDetails}
				/>
			</div>
		),
		total_count: (
			<div className={styles.title}>
				{item?.total_count}
				{' '}
				total worth
				{' '}
				{formatAmount({
					amount   : item?.total_generated || ZERO,
					currency : item?.budget_amount_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 0,
					},
				})}
			</div>
		),
		amount_utilised: (
			<div className={styles.title}>
				{formatAmount({
					amount   : item?.amount_utilised || ZERO,
					currency : item?.budget_amount_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 0,
					},
				})}
			</div>
		),
		shipment_stats:
        item?.shipment_stats.total === ZERO ? (
	<div className={styles.title}>No Shipments</div>
        ) : (
	<div className={styles.title}>
		Cancelled
		{item?.shipment_stats.cancelled}
		out of
		{item?.shipment_stats.total}
	</div>
        ),
		block: <BlockUser refetch={refetch} item={item} />,
	}));
	return formattedDataList;
};

export default formattedData;
