/* eslint-disable consistent-return */
export const evaluationCriteriaDetails = ({ service }) => {
	if (['fcl_freight'].includes(service)) {
		return [
			{
				range : 'Above 50',
				text  : 'Direct approval of vendor',
			},
			{
				range : 'Between 40-50	',
				text  : 'Need approval of Governance Manager',
			},
			{
				range : 'Below 40',
				text  : 'Reject The supplier',
			},
		];
	}
	if (['lcl_freight'].includes(service)) {
		return [
			{
				range : 'Above 60',
				text  : 'Direct approval of vendor',
			},
			{
				range : 'Between 50-60	',
				text  : 'Need approval of Governance Manager',
			},
			{
				range : 'Below 40',
				text  : 'Reject The supplier',
			}];
	}

	if (['haulage_freight'].includes(service)) {
		return [

			{
				range : 'Above 50',
				text  : 'Direct approval of vendor',
			},
			{
				range : 'Between 40-50	',
				text  : 'Need approval of Governance Manager',
			},
			{
				range : 'Below 40',
				text  : 'Reject The supplier',
			},

		];
	}

	if (['fcl_customs',
		'lcl_customs',
		'air_customs'].includes(service)) {
		return [
			{
				range : 'Above 70',
				text  : 'Direct approval of vendor',
			},
			{
				range : 'Between 60-70	',
				text  : 'Need approval of Governance Manager',
			},
			{
				range : 'Below 60',
				text  : 'Reject The supplier',
			}];
	}
	if (['fcl_cfs'].includes(service)) {
		return [
			{
				range : 'Above 66',
				text  : 'Direct approval of vendor',
			},
			{
				range : 'Between 50-66	',
				text  : 'Need approval of Governance Manager',
			},
			{
				range : 'Below 50',
				text  : 'Reject The supplier',
			},

		];
	}
};
