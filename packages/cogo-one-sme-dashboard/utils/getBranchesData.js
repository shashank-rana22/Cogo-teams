import { BRANCHES } from '../constants/branchesData';

function getBranchesData({ country_id = '', partner_id = '' }) {
	if (country_id) {
		return BRANCHES.filter(
			(itm) => itm.country_id	=== country_id,
		);
	}

	return BRANCHES.filter(
		(itm) => itm.partner_id	=== partner_id,
	);
}

export default getBranchesData;
