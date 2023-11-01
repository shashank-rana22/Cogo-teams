import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const geo = getGeoConstants();

const useGetActiveStakeholder = () => {
	const { role_ids } = useSelector(({ profile }) => ({ role_ids: profile?.partner?.user_role_ids }));

	const stakeholderMap = [
		{ role_ids: geo.uuid.kam_manager_ids, stakeholder: 'booking_agent_manager' },
		{
			role_ids: [...geo.uuid.kam_ids,
				...geo.uuid.cogo_fx_settings_allowed_role_ids,
				...geo.uuid.centralised_customer_support,
			],
			stakeholder: 'booking_agent',
		},
		{ role_ids: geo.uuid.so2_executive, stakeholder: 'so2_executive' },
		{ role_ids: geo.uuid.account_receivable_executive, stakeholder: 'account_receivable_executive' },
		{ role_ids: [geo.uuid.so1_so2_ops_role_id, geo.uuid.so1_so2_role_id], stakeholder: 'so1_so2_ops' },
		{ role_ids: geo.uuid.service_ops1_role_ids, stakeholder: 'booking_desk' },
		{ role_ids: geo.uuid.air_so_1_manager, stakeholder: 'booking_desk_manager' },
		{
			role_ids: [...geo.uuid.service_ops2_role_id,
				geo.uuid.costbooking_ops_role_ids],
			stakeholder: 'document_desk',
		},
		{ role_ids: geo.uuid.so_2_manager, stakeholder: 'document_desk_manager' },
		{
			role_ids: [
				geo.uuid.super_admin_id, geo.uuid.tech_super_admin_id, geo.uuid.data_superadmin],
			stakeholder: 'superadmin',
		},
		{ role_ids: geo.uuid.sales_role, stakeholder: 'sales_agent' },
		{
			role_ids: [
				geo.uuid.admin_id,
				geo.uuid.corporate_owner_id,
				geo.uuid.corporate_owner_finance_id,
				geo.uuid.supply_relations_head_role_id,
				geo.uuid.fin_ops_manager_role_id,
			],
			stakeholder: 'admin',
		},
		{ role_ids: [geo.uuid.air_prod_process_owner, geo.uuid.prod_process_owner], stakeholder: 'prod_process_owner' },
		{ role_ids: geo.uuid.coe_head, stakeholder: 'coe_head' },
		{ role_ids: geo.uuid.kam_admin, stakeholder: 'kam_admin' },
		{ role_ids: [geo.uuid.coe_finance_head, geo.uuid.prod_settlement_executive], stakeholder: 'credit_control' },
		{
			role_ids    : geo.uuid.costbooking_ops_manager_role_ids,
			stakeholder : 'cost_booking_manager',
		},
		{
			role_ids    : [geo.uuid.ff_cost_booking_executive],
			stakeholder : 'ff_cost_booking',
		},
		{ role_ids: geo.uuid.operation_manager, stakeholder: 'operation_manager' },
		{ role_ids: geo.uuid.so1_revenue_desk, stakeholder: 'so1_revenue_desk' },
		{ role_ids: geo.uuid.cogo_auditor_id, stakeholder: 'cogo_auditor_id' },
	];
	const matchingStakeholders = stakeholderMap
		.filter(({ role_ids: ids }) => (role_ids || [])
			.some((item) => ids.includes(item)));

	const activeStakeholder = !isEmpty(matchingStakeholders)
		? matchingStakeholders[GLOBAL_CONSTANTS.zeroth_index].stakeholder : '';

	return 	activeStakeholder;
};

export default useGetActiveStakeholder;
