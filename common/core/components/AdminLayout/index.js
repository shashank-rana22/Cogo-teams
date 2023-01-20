import cl from '@cogoport/components/src/utils/classname-processor';
import getSideBarConfigs from '@cogoport/navigation-configs/side-bar';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import styles from './styles.module.css';
import Topbar from './Topbar';

function AdminLayout({
	children = null, showTopbar = true, topbar = {}, showNavbar = false, navbar = {},
}) {
	const [showMobileNavbar, setShowMobileNavbar] = useState(false);
	const [pinnedNavKeys, setPinnedNavKeys] = useState([]);

	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const { user: { id: user_id = '' }, partner: { id: partner_id = '', partner_user_id = '' } } = user_data;

	const [{ loading: pinListLoading = false }, trigger] = useRequest({
		url    : 'list_partner_user_settings',
		method : 'GET',
		params : { filters: { user_id: user_data.id, partner_id } },
	}, { manual: false });

	const fetchPinnedNavs = async () => {
		const response = await trigger({ params: { filters: { user_id, partner_id } } });

		setPinnedNavKeys(
			(response.data?.list || [])
				.map((setting) => setting.setting_config.navigation_preferences)
				.flat(),
		);
	};

	useEffect(() => { fetchPinnedNavs(); }, []);

	const configs = getSideBarConfigs(user_data, pinnedNavKeys);

	const { nav_items = {} } = configs || {};

	const { partner = [], pinnedNavs = [] } = nav_items || {};

	return (
		<div className={cl`
			${styles.container} 
			${showTopbar ? styles.has_topbar : ''} 
			${showNavbar ? styles.has_navbar : ''}`}
		>
			<main className={styles.children_container}>{children}</main>
			{showTopbar ? (
				<Topbar
					className={topbar.className}
					style={topbar.style}
					logo={topbar.logo}
					onClickMobileNav={() => setShowMobileNavbar((s) => !s)}
					showMobileNav={showNavbar}
					showMobileNavbar={showMobileNavbar}
				/>
			) : null}
			{showNavbar ? (
				<Navbar
					className={navbar.className}
					style={navbar.style}
					nav={partner}
					pinListLoading={pinListLoading}
					setPinnedNavKeys={setPinnedNavKeys}
					partner_user_id={partner_user_id}
					pinnedNavs={pinnedNavs}
					mobileShow={showMobileNavbar}
				/>
			) : null}
		</div>
	);
}

export default AdminLayout;
