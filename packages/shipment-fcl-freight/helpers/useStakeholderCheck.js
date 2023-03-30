import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useSelector } from '@cogoport/store';

const geo = getGeoConstants();

export const useStakeholderCheck = () => {
	const { role_ids } = useSelector(({ profile }) => ({
		role_ids: profile?.partner?.user_role_ids,
	}));

	const stakeholderMap = [
		{ role_ids: geo.uuid.kam_ids, stakeholder: 'Kam' },
		{ role_ids: geo.uuid.service_ops1_role_ids, stakeholder: 'BookingDesk' },
		{ role_ids: geo.uuid.service_ops2_role_id, stakeholder: 'DocumentDesk' },
		{ role_ids: geo.uuid.super_admin_id, stakeholder: 'Superadmin' },
		{ role_ids: geo.uuid.sales_role, stakeholder: 'SalesAgent' },
		{ role_ids: geo.uuid.admin_id, stakeholder: 'Admin' },
		{ role_ids: geo.uuid.tech_super_admin_id, stakeholder: 'TechSuperadmin' },
	];

	const matchingStakeholders = stakeholderMap
		.filter(({ role_ids: ids }) => (role_ids || []).some((item) => ids.includes(item)));

	const ActiveStakeholder = matchingStakeholders.length > 0
		? matchingStakeholders[0].stakeholder
		: 'Superadmin';

	return {
		ActiveStakeholder,
	};
};
