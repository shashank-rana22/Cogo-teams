import { BRANCHES } from '../constants/branchesData';

function getBranchesData({ country_id = '' }) {
	return BRANCHES.filter(
		(itm) => itm.country_id	=== country_id,
	);
}

export default getBranchesData;
