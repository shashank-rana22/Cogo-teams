import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import EditPrice from './EditPrice';

const itemFunction = ({ isEditPrice, setIsEditPrice }) => ({
	renderPrice    : (item) => <EditPrice item={item} isEditPrice={isEditPrice} setIsEditPrice={setIsEditPrice} />,
	renderDiscount : (item, config) => (
		<span>
			{formatAmount({
				amount   : item?.[config?.key],
				currency : item?.currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 2,
				},
			})}
		</span>
	),
	renderPeriod: (item, config) => (
		`${startCase(item?.[config?.key])}ly`
	),

});

export default itemFunction;
