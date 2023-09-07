import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import getServicesUnitMapping from '../../../../utils/getServicesUnitMapping';
import PriceRange from '../PriceRange';

import styles from './styles.module.css';

const geo = getGeoConstants();

const SERVICES_UNIT_MAPPING = getServicesUnitMapping();

function RevertedBooking({ updatedData = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.price_label}>
				Expected Price-
				{' '}
				<PriceRange item={updatedData} />
			</div>
			<div className={styles.price_label}>
				Quoted Price-
				{' '}
				<span>
					{formatAmount({
						amount   : updatedData?.reverted_buy_price,
						currency : updatedData?.currency || geo.country.currency.code,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 2,
						},
					})}
					{SERVICES_UNIT_MAPPING[updatedData?.service_type] || ''}
				</span>
			</div>
		</div>
	);
}

export default RevertedBooking;
