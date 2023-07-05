import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const geo = getGeoConstants();

const DEFAULT_INDEX_OF_MATCHING_ROLE_IDS = 0;

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
				geo.uuid.finops_manager],
			role: 'credit_control',
		},
		{ role_ids: geo.uuid.service_ops2_role_id, role: 'so2' },

	];

	const matching_role_ids = role_ids_map
		.filter(({ role_ids: ids }) => (role_ids || []).some((item) => ids.includes(item)));

	const activeRole = !isEmpty(matching_role_ids)
		? matching_role_ids?.[DEFAULT_INDEX_OF_MATCHING_ROLE_IDS].role
		: 'kam';

	return { role: activeRole };
};
