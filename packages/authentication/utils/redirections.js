import getSideBarConfigs from '@cogoport/navigation-configs/side-bar';

const redirections = (profile) => {
	const configs = getSideBarConfigs(profile);
	const { nav_items } = configs;
	const navs = nav_items?.partner || [];

	return navs[0]?.key !== 'dashboards' ? navs[0] : navs?.[1];
};

export default redirections;
