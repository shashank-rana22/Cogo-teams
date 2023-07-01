/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Expenses from './Expenses/index';
import styles from './styles.module.css';
import Vendors from './Vendors/index';

function Overheads() {
	const { query } = useRouter();

	const [activeTab, setActiveTab] = useState(query?.active_tab || 'vendors');
	const { push } = useRouter();

	const handleChange = (tab:any) => {
		setActiveTab(tab);
		push(
			'/business-finance/overheads/[active_tab]',
			`/business-finance/overheads/${tab}`,
		);
	};

	return (

		<div>
			<div className={styles.main_heading}>Overheads</div>

			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="primary"
				onChange={(tab) => handleChange(tab)}
			>
				<TabPanel name="vendors" title="Vendors">
					<Vendors />
				</TabPanel>

				<TabPanel name="expenses" title="Expenses">
					<Expenses />
				</TabPanel>

				<TabPanel name="reports" title="Reports">
					<div className={styles.coming_soon}>
						<img
							alt="coming soon"
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/coming soon.png"
						/>
					</div>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Overheads;
