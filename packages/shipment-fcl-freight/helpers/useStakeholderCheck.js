import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useSelector } from '@cogoport/store';

const geo = getGeoConstants();

export const useStakeholderCheck = () => {
	const { role_ids } = useSelector(({ profile }) => ({
		role_ids: profile?.partner?.user_role_ids,
	}));

	let ActiveStakeholder = 'Superadmin';

	const Kam = (role_ids || []).some((item) => geo.uuid.kam_ids.includes(item));
	if (Kam) ActiveStakeholder = 'Kam';

	const So1 = (role_ids || []).some((item) => geo.uuid.service_ops1_role_ids.includes(item));
	if (So1) ActiveStakeholder = 'So1';

	const So2 = (role_ids || []).some((item) => geo.uuid.service_ops2_role_id.includes(item));
	if (So2) ActiveStakeholder = 'So2';

	const Superadmin = (role_ids || []).some((item) => geo.uuid.super_admin_id.includes(item));
	if (Superadmin) ActiveStakeholder = 'Superadmin';

	const SalesAgent = (role_ids || []).some((item) => geo.uuid.sales_role.includes(item));
	if (SalesAgent) ActiveStakeholder = 'SalesAgent';

	const Admin = (role_ids || []).some((item) => geo.uuid.admin_id.includes(item));
	if (Admin) ActiveStakeholder = 'Admin';

	const TechSuperadmin = (role_ids || []).some((item) => geo.uuid.tech_super_admin_id.includes(item));
	if (TechSuperadmin) ActiveStakeholder = 'TechSuperadmin';

	return {
		ActiveStakeholder,
	};
};
