const getModifiedRoutes = ({
	href, as, partnerId = null, withPrefix,
}) => {
	const hrefPrefix = '/[partner_id]';
	const asPrefix = `/${partnerId || ''}`;

	let newHref = href;
	let newAs = as;
	if (withPrefix) {
		if (!as) {
			newHref = `${asPrefix || ''}${newHref}`;
			newAs = null;
		} else {
			newHref = `${hrefPrefix || ''}${href}`;
			newAs = `${asPrefix || ''}${as}`;
		}
	}

	return { newHref, newAs };
};

export default getModifiedRoutes;
