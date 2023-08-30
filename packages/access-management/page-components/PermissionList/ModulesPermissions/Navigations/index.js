import { Tabs, TabPanel } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
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

function Navigations(props = {}) {
	const { t } = useTranslation(['accessManagement', 'common']);
	const {
		roleData = {},
		navigationMappings = {},
		authRoleId = '',
		getRole = () => {},
		getNavOptions = () => {},
		searchString,
		navStatus = 'all',
		loading = false,
		activeNavsLoading = false,
		activeNavs = [],
	} = props || {};

	const [activeTab, setActiveTab] = React.useState('crm');

	const navigationvalues = Object.values(navigationMappings);

	let navigationOptions = applyRegEx(searchString, navigationvalues, 'title', ['key']);

	if (navStatus === 'assigned') {
		navigationOptions = navigationOptions.filter((nav) => (activeNavs || []).includes(nav.key));
	}
	if (navStatus === 'not_assigned') {
		navigationOptions = navigationOptions.filter((nav) => !(activeNavs || []).includes(nav.key));
	}
	const crmNavs = navigationOptions.filter((nav) => nav?.module_type === 'crm');
	const dashBoardNavs = navigationOptions.filter((nav) => nav?.module_type === 'dashboards' || !nav?.module_type);

	const navElement = (navigation) => (navigation.options && navigation.isSubNavs ? NestedNavigations : Navigation);
	return (
		<section className={styles.container}>
			<Tabs activeTab={activeTab} onChange={setActiveTab}>
				<TabPanel title={t('accessManagement:roles_and_permission_permission_list_navigations_crm')} name="crm">
					{(crmNavs || []).map((navigation) => {
						const NavElement = navElement(navigation);
						return (
							<NavElement
								key={navigation.key}
								navigation={navigation}
								roleData={{
									...(roleData || {}),
									permissions     : roleData?.permissions,
									old_permissions : roleData?.permissions,
								}}
								authRoleId={authRoleId}
								getRole={getRole}
								getNavOptions={getNavOptions}
								loading={loading || activeNavsLoading}
								activeNavs={activeNavs}
							/>
						);
					})}
				</TabPanel>
				<TabPanel
					title={t('accessManagement:roles_and_permission_permission_list_navigations_dashboards')}
					name="dashboard"
				>
					{(dashBoardNavs || []).map((navigation) => {
						const NavElement = navElement(navigation);
						return (
							<NavElement
								key={navigation.key}
								navigation={navigation}
								roleData={{
									...(roleData || {}),
									permissions     : roleData?.permissions,
									old_permissions : roleData?.permissions,
								}}
								authRoleId={authRoleId}
								getRole={getRole}
								getNavOptions={getNavOptions}
								loading={loading || activeNavsLoading}
								activeNavs={activeNavs}
							/>
						);
					})}
				</TabPanel>
			</Tabs>
		</section>
	);
}
export default Navigations;
