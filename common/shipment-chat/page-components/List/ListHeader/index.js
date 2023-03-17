import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import AddUser from './ic-add-user.svg';
import styles from './styles.module.css';

function ListHeader({ status = '', setStatus = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.tabs_container}>
				<Tabs activeTab={status} onChange={setStatus}>
					<TabPanel name="active" title="Active" />
					<TabPanel name="inactive" title="Inactive" />
				</Tabs>
			</div>

			<div className={styles.add_user}>
				<AddUser />
				<div style={{ marginLeft: '4px' }}>User</div>
			</div>
		</div>
	);
}

export default ListHeader;
