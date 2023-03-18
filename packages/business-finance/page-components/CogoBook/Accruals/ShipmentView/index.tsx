import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useShipmentView from '../../hooks/useShipmentView';

import Card from './Card';
import styles from './styles.module.css';

function ShipmentView() {
	const [filters, setFilters] = useState({
		year          : '',
		month         : '',
		date          : '',
		service       : '',
		shipmentType  : '',
		tradeType     : '',
		range         : '',
		profitAmount  : '',
		jobState      : '',
		profitPercent : '',
		query         : '',
		profitType    : 'amount',
	});
	const { refetch, shipmentViewData, shipmentLoading } = useShipmentView({ filters });

	console.log(shipmentViewData, 'shipmentViewData');
	return (
		<div>
			<Card
				refetch={refetch}
				shipmentLoading={shipmentLoading}
				setFilters={setFilters}
				filters={filters}
			/>
			<div className={styles.flex}>
				<div className={styles.sub_flex}>
					{filters?.service && (
						<div className={styles.card_small}>
							Service -
							{' '}
							{startCase(filters?.service)}
						</div>
					)}
					{filters?.tradeType && (
						<div className={styles.card_small}>
							{' '}
							{filters?.tradeType}
						</div>
					)}
				</div>
				<div className={styles.input_container}>
					<Input
						value={filters?.query}
						onChange={(val) => { setFilters((prev) => ({ ...prev, query: val })); }}
						placeholder="Search by SID"
						suffix={<IcMSearchlight height="20px" width="20px" style={{ marginRight: '8px' }} />}
					/>
				</div>

			</div>
		</div>
	);
}
export default ShipmentView;
