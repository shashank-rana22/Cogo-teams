import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

function SelectFilter() {
	const [normal, setNormal] = useState('normal');
	return (
		<div>
			<Tabs
				activeTab={normal}
				themeType="tertiary"
				onChange={setNormal}
			>
				<TabPanel name="normal" title="Normal Add" badge={3}>
					{/* <div>Pending</div> */}
				</TabPanel>

				<TabPanel name="BulkAdd" title="Bulk Add" badge={5}>
					{/* <div>History</div> */}
				</TabPanel>
			</Tabs>
		</div>
	);
}
export default SelectFilter;
