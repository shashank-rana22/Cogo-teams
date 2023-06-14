import { Pill } from '@cogoport/components';
import { IcMTimer } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import incoTermMapping from '../../../helper/incoTermMapping';
import PortDetails from '../../List/Card/Body/PortDetails';

import EditSellQuotation from './EditSellQuotation';
import styles from './styles.module.css';

function ShipmentCard({ itemData, priceData }) {
	return (
		<div className={styles.container}>
			<div className={styles.upper_section}>
				<div className={styles.text}>
					Created on :
					{' '}
					{format(itemData?.created_at, 'dd MMM yyyy')}
				</div>
				<div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
					<IcMTimer fill="red" width="15" height="15" />
					<div style={{ marginLeft: '3px' }}>
						{format(itemData?.confirmed_by_importer_exporter_at, 'hh')}
						{' '}
						Hrs :
						{' '}
						{format(itemData?.confirmed_by_importer_exporter_at, 'mm')}
						{' '}
						mins

						left
					</div>
				</div>
			</div>
			<div className={styles.lower_section}>
				<div className={styles.first_section}>
					<PortDetails data={itemData} />
				</div>
				<div className={styles.second_section}>
					<Pill size="md" color="#F2F3FA">
						<div style={{ color: '#7278AD' }}>
							{startCase(itemData?.trade_type)
							|| startCase(incoTermMapping[itemData?.inco_term])}

						</div>

					</Pill>
					<Pill size="md" color="#F7FAEF">
						<div style={{ color: '#849E4C' }}>
							{itemData?.source === 'direct'
								? 'Sell Without Buy'
								: startCase(itemData?.source || '')}
						</div>
					</Pill>
				</div>
				<div className={styles.last_section}>
					<div className={styles.sell_price_text}>
						Sell Price :
						{' '}
						<span style={{ fontWeight: '700', color: '#221F20' }}>
							{!priceData?.sell_price
								? 0
								: priceData?.sell_price}
						</span>
					</div>
					<div className={styles.kamdiscount_text}>
						KAM Discount Applied :
						{' '}
						<span>
							INR 1000
						</span>
					</div>
				</div>
				<div>
					<EditSellQuotation data={itemData} />
				</div>
			</div>

		</div>
	);
}

export default ShipmentCard;
