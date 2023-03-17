import { Modal, TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import POC from '../../../../common/POC';
import SOP from '../../../../common/SOP';

function SopAndPoc() {
	const [activeTab, setActiveTab] = useState('poc');
	return (
		<div>
			<Modal show placement="top-right" size="md" scroll={false}>
				<Modal.Body>
					<Tabs activeTab={activeTab} onChange={setActiveTab}>
						<TabPanel name="poc" title="POC">
							<div style={{ height: '80vh', overflow: 'scroll' }}>
								<POC />
							</div>
						</TabPanel>
						<TabPanel name="sop" title="SOP">
							<div style={{ height: '80vh', overflow: 'scroll' }}>
								<SOP />
							</div>
						</TabPanel>
					</Tabs>

				</Modal.Body>
			</Modal>
		</div>
	);
}

export default SopAndPoc;
