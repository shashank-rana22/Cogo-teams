import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { UNITS_MAPPING } from '../../../../../../../constants/flashRatesMapping';

const geo = getGeoConstants();

const FALLBACK_AMOUNT = 0;

function PriceRange({ item }) {
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
			&nbsp;
			-
			&nbsp;
			{formatAmount({
				amount   : Number(item?.indicative_price_range?.upper_limit) || FALLBACK_AMOUNT,
				currency : item?.freight_currency || geo.country.currency.code,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 0,
				},
			})}
			&nbsp;
			{UNITS_MAPPING[item?.service_type] || ''}
		</span>
	);
}
export default PriceRange;
