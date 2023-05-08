import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useSelector } from '@cogoport/store';

const geo = getGeoConstants();

export const useStakeholderCheck = () => {
	const { role_ids } = useSelector(({ profile }) => ({
		role_ids: profile?.partner?.user_role_ids,
	}));

	const stakeholderMap = [
		{ role_ids: geo.uuid.kam_ids, stakeholder: 'booking_agent' },
		{ role_ids: geo.uuid.service_ops1_role_ids, stakeholder: 'booking_desk' },
		{ role_ids: geo.uuid.so_1_manager, stakeholder: 'booking_desk_manager' },
		{ role_ids: geo.uuid.service_ops2_role_id, stakeholder: 'document_desk' },
		{ role_ids: [geo.uuid.super_admin_id, geo.uuid.tech_super_admin_id], stakeholder: 'superadmin' },
		{ role_ids: geo.uuid.sales_role, stakeholder: 'sales_agent' },
		{ role_ids: geo.uuid.admin_id, stakeholder: 'admin' },
		{ role_ids: geo.uuid.service_ops3_role_ids, stakeholder: 'costbooking_ops' },
		{
			role_ids: [geo.uuid.coe_finance_head,
				geo.uuid.super_admin_id,
				geo.uuid.admin_id,
				geo.uuid.prod_settlement_executive],
			stakeholder: 'credit_control',
		},
	];

	const matchingStakeholders = stakeholderMap
		.filter(({ role_ids: ids }) => (role_ids || []).some((item) => ids.includes(item)));

	const activeStakeholder = matchingStakeholders.length > 0
		? matchingStakeholders[0].stakeholder
		: '';

	return {
		activeStakeholder,
	};
};
