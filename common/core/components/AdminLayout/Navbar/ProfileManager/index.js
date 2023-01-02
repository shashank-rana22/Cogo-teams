import logout from '@cogoport/authentication/utils/getLogout';
import { IcMLogout } from '@cogoport/icons-react';
import React from 'react';

import Items from './Items';
import styles from './styles.module.css';

function ProfileManager({ resetSubnavs }) {
	const profileComponents = [
		{
			title : 'Product Code Mappings',
			fun   : logout,
			icon  : IcMLogout,
		},
	];

	return (
		<ul className={styles.list_container}>
			<Items item={profileComponents} resetSubnavs={resetSubnavs} />
		</ul>
	);
}

export default ProfileManager;
