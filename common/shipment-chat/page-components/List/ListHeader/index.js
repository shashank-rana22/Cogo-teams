import { Tabs, TabPanel } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import React from 'react';

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
				<IcMPlusInCircle />
				<div style={{ marginLeft: '4px' }}>User</div>
			</div>
		</div>
	);
}

export default ListHeader;
