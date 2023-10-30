import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import ReceivablesPayablesSettlement from './ReceivablesPayablesSettlement';
import styles from './styles.module.css';

function TdsSettlement() {
	const [activeTds, setActiveTds] = useState('AR');
	const [globalFilters, setGlobalFilters] = useState({});
	const handleTabChange = (v) => {
		setActiveTds(v);
	};
	return (
		<div>
			<div className={styles.hr} />
			<Tabs
				themeType="tertiary"
				activeTab={activeTds}
				onChange={handleTabChange}
			>
				<TabPanel name="AR" title="Receivables">
					<ReceivablesPayablesSettlement
						active={activeTds}
						globalFilters={globalFilters}
						setGlobalFilters={setGlobalFilters}
					/>
				</TabPanel>

				<TabPanel name="AP" title="Payables">
					<ReceivablesPayablesSettlement
						active={activeTds}
						globalFilters={globalFilters}
						setGlobalFilters={setGlobalFilters}
					/>
				</TabPanel>
			</Tabs>
		</div>

	);
}

export default TdsSettlement;
