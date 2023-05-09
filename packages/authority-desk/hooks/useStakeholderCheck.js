import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useSelector } from '@cogoport/store';

const geo = getGeoConstants();

export const useStakeholderCheck = () => {
	const { role_ids } = useSelector(({ profile }) => ({
		role_ids: profile?.partner?.user_role_ids,
	}));

	const role_ids_map = [
		{
			role_ids: [geo.uuid.coe_finance_head,
				geo.uuid.super_admin_id,
				geo.uuid.admin_id,
				geo.uuid.prod_settlement_executive],
			role: 'credit_control',
		},
		{ role_ids: geo.uuid.service_ops2_role_id, role: 'so2' },

	];

	const matching_role_ids = role_ids_map
		.filter(({ role_ids: ids }) => (role_ids || []).some((item) => ids.includes(item)));

	const activeRole = matching_role_ids?.length > 0
		? matching_role_ids?.[0].role
		: 'kam';

	return { role: activeRole };
};
