import { Pill, Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
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
							{startCase(itemData?.state)
							|| startCase(itemData?.state)}

						</div>

					</Pill>
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
						Sell Price:
						<span style={{ fontWeight: '700', color: '#221F20', marginLeft: '3px' }}>
							{!priceData?.sell_price
								? <Placeholder width="150px" height="25px" />
								: formatAmount({
									amount   : priceData?.sell_price?.split(' ')?.[1],
									currency : priceData?.sell_price?.split(' ')?.[0],
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}
						</span>
					</div>
					<div className={styles.kamdiscount_text}>
						{itemData?.promotion_category === 'marketing' ? 'MARKETING' : 'KAM'}
						{' '}
						Discount Applied :
						{' '}
						<span>
							{formatAmount({
								amount   : itemData?.discount_amount,
								currency : itemData?.discount_amount_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</span>
					</div>
				</div>

			</div>

		</div>
	);
}

export default ShipmentCard;
