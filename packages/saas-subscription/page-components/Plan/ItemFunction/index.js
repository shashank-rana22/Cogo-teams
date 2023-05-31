import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const STATUS_MAPPING = {
	true  : { label: 'Active', color: 'green' },
	false : { label: 'Inactive', color: 'red' },
};

const FREE_PLAN_MAPPING = {
	false : { label: 'Premium', color: '#F9AE64' },
	true  : { label: 'Freemium', color: 'blue' },
};

const itemFunction = {
	renderFamilyName: (item) => {
		const { product_family = {} } = item || {};
		return <span>{product_family?.product_family_name}</span>;
	},
	renderDate: (item, config) => (
		<span>
			{formatDate({
				date       : item?.[config.key],
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
				formatType : 'date',
			})}

		</span>
	),
	renderExtraDetails: (item) => {
		const isActive = item?.is_active;
		const isPremium = item?.is_free_plan;

		const pillConfig = [STATUS_MAPPING?.[isActive], FREE_PLAN_MAPPING?.[isPremium]];

		return (pillConfig || [])?.map((config = {}) => {
			const { label = '', color = '' } = config || {};
			return 	<Pill key={label} size="sm" color={color}>{label}</Pill>;
		});
	},
};

export default itemFunction;
