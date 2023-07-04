import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import CampaignManagement from './components/CampaignManagement';
import Dashboard from './components/Dashboard';
import ExceptionsManagement from './components/ExceptionsManagement';
import MainHeader from './components/MainHeader';
import styles from './styles.module.css';

function Dunnings() {
	const { query } = useRouter();

	const [activeTab, setActiveTab] = useState(query?.active_tab || 'campaign-management');

	const TABS_MAPPING = {
		'campaign-management'   : <CampaignManagement />,
		'exceptions-management' : <ExceptionsManagement />,
		dashboard               : <Dashboard />,
	};

	return (
		<div>
			<div className={styles.header} />
			<div>
				<MainHeader
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>
			<div>
				{TABS_MAPPING[activeTab]}
			</div>
		</div>
	);
}

export default Dunnings;
