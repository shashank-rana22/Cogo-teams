import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import TdsSettlement from './TdsSettlement';

function Settlement() {
	const { push, query } = useRouter();
	const { activeTab } = query;
	const [activePayables, setActivePayables] = useState(activeTab);
	const handleTabChange = (v) => {
		setActivePayables(v);
		push(
			'/business-finance/settlement/[activeTab]',
			`/business-finance/settlement/${v}`,
		);
	};
	return (
		<div>
			<Tabs
				themeType="primary"
				activeTab={activePayables}
				onChange={handleTabChange}
			>
				<TabPanel
					name="tds-settlement"
					title="TDS Settlement"
					id="tds-settlement-tab"
				>
					<TdsSettlement />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Settlement;
