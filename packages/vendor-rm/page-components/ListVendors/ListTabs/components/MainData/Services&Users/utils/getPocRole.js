import formatArrayValues from '../../../../../../../utils/formatArrayValues';
import workScopes from '../../../../../../../utils/work-scopes.json';

const getPocRole = (arr) => {
	const scopeArr = arr.map((val) => {
		const obj = workScopes.find((scope) => scope.value === val);
		return obj.label;
	});

	return formatArrayValues(scopeArr, false);
};

export default getPocRole;
