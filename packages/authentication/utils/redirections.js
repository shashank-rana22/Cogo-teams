import getSideBarConfigs from '@cogoport/navigation-configs/side-bar';

const redirections = (profile) => {
	const configs = getSideBarConfigs({ userData: profile });
	const { nav_items } = configs;
	const navs = nav_items?.partner || [];

	let navItemToShow = navs[0]?.key !== 'dashboards' ? navs[0] : navs?.[1];

	if (navItemToShow?.options?.length > 0) {
		// eslint-disable-next-line prefer-destructuring
		navItemToShow = navItemToShow.options[0];
	}

	return navItemToShow;
};

export default redirections;
