const notificationsRedirectLink = ({
	link = '',
	push,
	partner_id = '',
	NAVIGATION_LINKS = [],
}) => {
	let isVersionTwo = false;
	let redirectLink = null;

	const isLinkValid = link?.startsWith('/');

	const splittedLink = link?.split('/');

	NAVIGATION_LINKS.forEach((href) => {
		if (redirectLink) return;

		isVersionTwo = href.includes('/v2/');

		let tempHref = href;
		if (isVersionTwo) {
			tempHref = tempHref.replace('/v2/', '/');
		}

		const splittedHref = tempHref.split('/');

		const isLinkMatched = splittedHref.every((hrefItem, index) => {
			if (hrefItem.startsWith('[')) return true;

			return hrefItem === splittedLink[index];
		});

		if (!isLinkMatched) return;

		redirectLink = isLinkValid ? link : `/${link}`;
	});

	if (!redirectLink) {
		redirectLink = isLinkValid ? link : `/${link}`;
		const newHref = `${window.location.origin}/${partner_id}${redirectLink}`;
		window.location.replace(newHref);
		return;
	}

	if (isVersionTwo) {
		push(redirectLink);
	} else {
		const newHref = `${window.location.origin}/${partner_id}${redirectLink}`;
		window.location.replace(newHref);
	}
};

export default notificationsRedirectLink;
