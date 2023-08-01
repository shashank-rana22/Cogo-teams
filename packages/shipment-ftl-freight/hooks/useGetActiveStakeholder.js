import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const geo = getGeoConstants();

const useGetActiveStakeholder = () => {
	const { role_ids } = useSelector(({ profile }) => ({ role_ids: profile?.partner?.user_role_ids }));

	const stakeholderMap = [
		{ role_ids: geo.uuid.kam_ids, stakeholder: 'booking_agent' },
		{ role_ids: geo.uuid.service_ops1_role_ids, stakeholder: 'booking_desk' },
		{ role_ids: geo.uuid.so_1_manager, stakeholder: 'booking_desk_manager' },
		{ role_ids: geo.uuid.service_ops2_role_id, stakeholder: 'document_desk' },
		{ role_ids: geo.uuid.so_2_manager, stakeholder: 'document_desk_manager' },
		{ role_ids: [geo.uuid.super_admin_id, geo.uuid.tech_super_admin_id], stakeholder: 'superadmin' },
		{ role_ids: geo.uuid.sales_role, stakeholder: 'sales_agent' },
		{ role_ids: geo.uuid.admin_id, stakeholder: 'admin' },
		{ role_ids: geo.uuid.prod_process_owner, stakeholder: 'prod_process_owner' },
		{ role_ids: geo.uuid.coe_head, stakeholder: 'coe_head' },
		{ role_ids: [geo.uuid.coe_finance_head, geo.uuid.prod_settlement_executive], stakeholder: 'credit_control' },
		{ role_ids: geo.uuid.corporate_owner_id, stakeholder: 'corporate_owner' },
		{ role_ids: geo.uuid.credit_controller_ids, stakeholder: 'credit_controller' },
		{ role_ids: geo.uuid.service_ops3_role_ids, stakeholder: 'service_ops3' },
		{ role_ids: geo.uuid.ftl_ground_ops_role_id, stakeholder: 'ftl_ground_ops' },
		{ role_ids: geo.uuid.field_service_ops_role_id, stakeholder: 'field_service_ops' },
	];
	const matchingStakeholders = stakeholderMap
		.filter(({ role_ids: ids }) => (role_ids || [])
			.some((item) => ids.includes(item)));

	const activeStakeholder = !isEmpty(matchingStakeholders)
		? matchingStakeholders[GLOBAL_CONSTANTS.zeroth_index].stakeholder : '';

	return 	activeStakeholder;
};

export default useGetActiveStakeholder;
