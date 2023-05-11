import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

function Segmented({
	setBillCatogory,
	billCatogory,
}) {
	return (
		<div style={{ marginTop: 10 }}>
			<Tabs
				activeTab={billCatogory}
				themeType="primary"
				onChange={setBillCatogory}
			>
				<TabPanel name="purchase" title="Purchase" />
				<TabPanel name="pass_through" title="Pass Through" />
			</Tabs>
		</div>
	);
}

export default Segmented;
