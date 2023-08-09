import CC from './condition-constants';

const canSeeMargin = (scope, viewPermissions, margins = []) => {
	const { isConditionMatches, isChannelPartner } = viewPermissions || {};
	if (scope === 'partner' && !isChannelPartner) {
		if (isConditionMatches(CC.SEE_ALL_MARGINS, 'or') && !isChannelPartner) {
			return { see: true, isSuperAdmin: true, isAgent: false };
		}

		if (isConditionMatches(CC.SEE_SALES_MARGINS) || isChannelPartner) {
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
