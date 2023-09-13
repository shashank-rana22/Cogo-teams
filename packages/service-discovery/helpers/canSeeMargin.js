import CC from './condition-constants';

const canSeeMargin = (scope, viewPermissions, margins = []) => {
	const { isConditionMatches } = viewPermissions || {};
	if (scope === 'partner') {
		if (isConditionMatches(CC.SEE_ALL_MARGINS, 'or')) {
			return { see: true, isSuperAdmin: true, isAgent: false };
		}

		if (isConditionMatches(CC.SEE_SALES_MARGINS)) {
			margins.filter((margin) => margin?.margin_type === 'demand');
			if (margins.length) {
				return { see: true, isSuperAdmin: false, isAgent: true };
			}
			return { see: true, isSuperAdmin: false, isAgent: true };
		}
		return { see: false, isSuperAdmin: false, isAgent: false };
	}
	return { see: false, isSuperAdmin: false, isAgent: false };
};

export default canSeeMargin;
