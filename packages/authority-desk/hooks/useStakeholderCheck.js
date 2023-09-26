import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

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
				geo.uuid.prod_settlement_executive,
				geo.uuid.operation_manager,
				geo.uuid.finops_manager,
				geo.uuid.coe_head,
				geo.uuid.service_ops3,
			],
			role: 'credit_control',
		},
		{ role_ids: geo.uuid.service_ops2_role_id, role: 'so2' },
	];

	const matching_role_ids = role_ids_map
		.filter(({ role_ids: ids }) => (role_ids || []).some((item) => ids.includes(item)));

	const activeRole = !isEmpty(matching_role_ids)
		? matching_role_ids?.[GLOBAL_CONSTANTS.zeroth_index].role
		: 'kam';

	return { role: activeRole };
};
