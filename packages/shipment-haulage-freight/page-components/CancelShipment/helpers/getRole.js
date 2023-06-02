import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

export function getRole(user_role_ids) {
	const salesRoleIds = [
		...geo.uuid.kam_ids,
		geo.uuid.super_admin_id,
		geo.uuid.admin_id,
		geo.uuid.prod_es_sales,
		geo.uuid.trade_expert_team_lead_long_tail_id,
		geo.uuid.tech_super_admin_id,
		...geo.uuid.sales_role,
	];

	const supplyRoleIds = [geo.uuid.service_ops1_role_ids];

	if (salesRoleIds.some((ele) => user_role_ids?.includes(ele))) {
		return 'sales';
	}
	if (supplyRoleIds.some((ele) => user_role_ids?.includes(ele))) {
		return 'supply';
	}
	return '';
}
