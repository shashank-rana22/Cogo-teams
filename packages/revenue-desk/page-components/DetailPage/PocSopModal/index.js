import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import POCDetails from './POCDetails';
import SopRevenueDesk from './SopRevenueDesk';

function PocSopModal({ itemData }) {
	const [activePocTab, setActivePocTab] = useState('poc');
	const [showPocSop, setShowPocSop] = useState(false);
	return (
		<div>
			<Button size="md" themeType="secondary" onClick={() => setShowPocSop(true)}>POC & SOP</Button>
			<Modal size="xl" show={showPocSop === true} onClose={() => setShowPocSop(false)} placement="center">
				<Modal.Body>
					<Tabs
						activeTab={activePocTab}
						themeType="primary"
						fullWidth
						onChange={setActivePocTab}
					>
						<TabPanel name="poc" title="POC">
							<div><POCDetails shipmentData={itemData} /></div>
						</TabPanel>
						<TabPanel name="sop" title="SOP">
							<div><SopRevenueDesk data={itemData} /></div>
						</TabPanel>
					</Tabs>
				</Modal.Body>
			</Modal>
		</div>

	);
}

export default PocSopModal;
