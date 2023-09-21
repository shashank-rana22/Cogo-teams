const extractNavLinks = (obj) => {
	const NAV_LINKS = [];

	Object.values(obj).forEach((item) => {
		NAV_LINKS.push(item.href);

		if (item?.options) {
			item?.options.forEach((option) => NAV_LINKS.push(option?.href));
		}
	});

	return NAV_LINKS.filter((item) => item);
};

export default extractNavLinks;
