import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const geo = getGeoConstants();

export const useStakeholderCheck = () => {
	const { role_ids } = useSelector(({ profile }) => ({
		role_ids: profile?.partner?.user_role_ids,
	}));

	const stakeholderMap = [
		{ role_ids: [...geo.uuid.kam_manager_ids, geo.uuid.cp_program_manager], stakeholder: 'booking_agent_manager' },
		{
			role_ids: [...geo.uuid.kam_ids,
				...geo.uuid.centralised_customer_support,
				geo.uuid.finops,
				geo.uuid.cogo_one_kyc, geo.uuid.finance_branch_accounts],
			stakeholder: 'booking_agent',
		},
		{ role_ids: geo.uuid.so2_executive, stakeholder: 'so2_executive' },
		{ role_ids: geo.uuid.service_ops1_role_ids, stakeholder: 'booking_desk' },
		{ role_ids: geo.uuid.so_1_manager, stakeholder: 'booking_desk_manager' },
		{ role_ids: [...geo.uuid.service_ops2_role_id, geo.uuid.supply_fulfillment], stakeholder: 'document_desk' },
		{ role_ids: geo.uuid.so_2_manager, stakeholder: 'document_desk_manager' },
		{ role_ids: [...geo.uuid.sales_role, geo.uuid.entity_manager_id], stakeholder: 'sales_agent' },
		{ role_ids: geo.uuid.costbooking_ops_role_ids, stakeholder: 'costbooking_ops' },
		{ role_ids: geo.uuid.costbooking_ops_manager_role_ids, stakeholder: 'costbooking_manager' },
		{ role_ids: [geo.uuid.lastmile_ops_id], stakeholder: 'lastmile_ops' },
		{ role_ids: geo.uuid.lastmile_ops_manager_id, stakeholder: 'lastmile_ops_manager' },
		{ role_ids: geo.uuid.prod_process_owner, stakeholder: 'prod_process_owner' },
		{ role_ids: geo.uuid.tech_super_admin_id, stakeholder: 'tech_super_admin' },
		{ role_ids: geo.uuid.so1_so2_role_id, stakeholder: 'so1_so2_ops' },
		{ role_ids: geo.uuid.igm_desk, stakeholder: 'igm_desk' },
		{ role_ids: geo.uuid.coe_head, stakeholder: 'coe_head' },
		{ role_ids: [geo.uuid.finops_manager, geo.uuid.cogo_auditor], stakeholder: 'finops_manager' },
		{ role_ids: geo.uuid.document_control_manager, stakeholder: 'document_control_manager' },
		{ role_ids: geo.uuid.document_control_lead, stakeholder: 'document_control_lead' },
		{ role_ids: geo.uuid.corporate_owner_id, stakeholder: 'corporate_owner' },
		{ role_ids: geo.uuid.operation_manager, stakeholder: 'operation_manager' },
		{ role_ids: [...geo.uuid.finance_head, geo.uuid.finops_credit_controller], stakeholder: 'finance_superadmin' },
		{ role_ids: geo.uuid.so1_revenue_desk, stakeholder: 'so1_revenue_desk' },
		{ role_ids: geo.uuid.kam_admin, stakeholder: 'kam_admin' },
		{
			role_ids    : [geo.uuid.supplier_relations_head_id, geo.uuid.supply_relation_manager_role_id],
			stakeholder : 'supplier_relations_head',
		},
		{
			role_ids: [geo.uuid.coe_finance_head,
				geo.uuid.credit_controller_id,
				geo.uuid.prod_settlement_executive, ...geo.uuid.service_ops3_role_ids],
			stakeholder: 'credit_control',
		},
		{
			role_ids    : [geo.uuid.admin_id, geo.uuid.corporate_owner_finance_id, geo.uuid.corporate_owner_demand],
			stakeholder : 'admin',
		},
		{
			role_ids: [geo.uuid.super_admin_id,
				geo.uuid.vietnam_business_heads, geo.uuid.business_heads],
			stakeholder: 'superadmin',
		},
		{ role_ids: geo.uuid.data_superadmin, stakeholder: 'data_superadmin' },
	];

	const matchingStakeholders = stakeholderMap
		.filter(({ role_ids: ids }) => (role_ids || []).some((item) => ids?.includes(item)));

	const activeStakeholder = !isEmpty(matchingStakeholders)
		? matchingStakeholders[GLOBAL_CONSTANTS.zeroth_index].stakeholder : '';

	return {
		activeStakeholder,
	};
};
