export const sortNavs = (navsList) => navsList.sort((a, b) => {
	const titleA = a.title;
	const titleB = b.title;
	return titleA.localeCompare(titleB);
});
