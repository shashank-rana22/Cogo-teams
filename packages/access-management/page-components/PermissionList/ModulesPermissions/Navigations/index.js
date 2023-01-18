import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import applyRegEx from '../../../../utils/apply-regex';

import Navigation from './Navigation';
import NestedNavigations from './NestedNavigation';
import styles from './styles.module.css';

/**
 * Renders all the navigations
 * @param {object} props
 * @param {object} [props.navigationMappings={}]
 * @param {object} [props.roleData={}]
 * @param {string} [props.authRoleId={}]
 * @param {function} [props.getRole=() => {}]
 * @param {function} [props.getNavOptions=() => {}]
 * @returns  Navigations UI
 */

function Navigations(props) {
	const {
		roleData = {},
		navigationMappings = {},
		authRoleId = '',
		getRole = () => {},
		getNavOptions = () => {},
		searchString,
		navStatus = 'all',
		loading = false,
	} = props || {};

	const [activeTab, setActiveTab] = React.useState('crm');

	const navigationvalues = Object.values(navigationMappings);

	let navigationOptions = applyRegEx(searchString, navigationvalues, 'title', ['key']);

	if (navStatus === 'assigned') {
		navigationOptions = navigationOptions.filter((nav) => !!(roleData?.permissions || []).find(
			(item) => item.navigation === nav.key && item.status === 'active',
		));
	}
	if (navStatus === 'not_assigned') {
		navigationOptions = navigationOptions.filter((nav) => !(roleData?.permissions || [])
			.find((item) => item.navigation === nav.key) || !!(roleData?.permissions || []).find(
			(item) => item.navigation === nav.key && item.status === 'inactive',
		));
	}
	const crmNavs = navigationOptions.filter((nav) => nav?.module_type === 'crm');
	const dashBoardNavs = navigationOptions.filter((nav) => nav?.module_type === 'dashboards' || !nav?.module_type);

	const navElement = (navigation) => (navigation.options ? NestedNavigations : Navigation);
	return (
		<section className={styles.container}>
			<Tabs activeTab={activeTab} onChange={setActiveTab}>
				<TabPanel title="CRM" name="crm">
					{(crmNavs || []).map((navigation) => {
						const NavElement = navElement(navigation);
						return (
							<NavElement
								navigation={navigation}
								roleData={{
									...(roleData || {}),
									permissions     : roleData?.permissions,
									old_permissions : roleData?.permissions,
								}}
								authRoleId={authRoleId}
								getRole={getRole}
								getNavOptions={getNavOptions}
								loading={loading}
							/>
						);
					})}
				</TabPanel>
				<TabPanel title="Dashboards" name="dashboard">
					{(dashBoardNavs || []).map((navigation) => {
						const NavElement = navElement(navigation);
						return (
							<NavElement
								navigation={navigation}
								roleData={{
									...(roleData || {}),
									permissions     : roleData?.permissions,
									old_permissions : roleData?.permissions,
								}}
								authRoleId={authRoleId}
								getRole={getRole}
								getNavOptions={getNavOptions}
								loading={loading}
							/>
						);
					})}
				</TabPanel>
			</Tabs>
		</section>
	);
}
export default Navigations;
