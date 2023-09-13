import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import SERVICES_UNIT_MAPPING from '../../../../utils/getServicesUnitMapping';

const FALLBACK_AMOUNT = 0;

function PriceRange({ item = {} }) {
	const geo = getGeoConstants();

	return (
		<span>
			{formatAmount({
				amount   : Number(item?.indicative_price_range?.lower_limit) || FALLBACK_AMOUNT,
				currency : item?.freight_currency || geo.country.currency.code,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 0,
				},
			})}

			-

			{formatAmount({
				amount   : Number(item?.indicative_price_range?.upper_limit) || FALLBACK_AMOUNT,
				currency : item?.freight_currency || geo.country.currency.code,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 0,
				},
			})}
			{SERVICES_UNIT_MAPPING[item?.service_type] || ''}
		</span>
	);
}
export default PriceRange;
