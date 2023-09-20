import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const getStatusMapping = ({ t }) => ({
	true  : { label: t('saasSubscription:plan_item_fn_active'), color: 'green' },
	false : { label: t('saasSubscription:plan_item_fn_inactive'), color: 'red' },
});

const getFreePlanMapping = ({ t }) => ({
	false : { label: t('saasSubscription:plan_item_fn_premium'), color: '#F9AE64' },
	true  : { label: t('saasSubscription:plan_item_fn_free'), color: 'blue' },
});

const itemFunction = ({ t }) => ({
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
		const STATUS_MAPPING = getStatusMapping({ t });
		const FREE_PLAN_MAPPING = getFreePlanMapping({ t });

		const pillConfig = [STATUS_MAPPING?.[isActive], FREE_PLAN_MAPPING?.[isPremium]];

		return (pillConfig || [])?.map((config = {}) => {
			const { label = '', color = '' } = config || {};
			return 	<Pill key={label} size="sm" color={color}>{label}</Pill>;
		});
	},
});

export default itemFunction;
