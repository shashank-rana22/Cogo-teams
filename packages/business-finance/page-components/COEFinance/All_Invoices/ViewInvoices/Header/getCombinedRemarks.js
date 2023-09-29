import { isEmpty } from '@cogoport/utils';

function getCombinedRemarks(data = {}) {
	const RESULT = [];

	function recursiveTraversal(obj = {}) {
		Object.values(obj)?.forEach((item) => {
			if (typeof item === 'string' && !isEmpty(item)) {
				RESULT.push(item);
			} else if (typeof item === 'object') {
				recursiveTraversal(item);
			}
		});
	}

	recursiveTraversal(data);
	return RESULT;
}

export default getCombinedRemarks;
