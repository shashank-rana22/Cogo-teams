import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { Sop, SopOld } from '@cogoport/ocean-modules';
import { useState } from 'react';

import POCDetails from './POCDetails';
import styles from './styles.module.css';

function PocSopModal({ itemData }) {
	const [activePocTab, setActivePocTab] = useState('poc');
	const [showPocSop, setShowPocSop] = useState(false);
	return (
		<div>
			<Button size="md" themeType="secondary" onClick={() => setShowPocSop(true)}>POC & SOP</Button>
			<Modal
				size="xl"
				show={showPocSop === true}
				onClose={() => setShowPocSop(false)}
				placement="center"
				className={styles.modal_container}
			>
				<Modal.Header title="POC & SOP" />
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
							{['fcl_freight', 'lcl_freight'].includes(itemData?.shipment_type)
								? <div><Sop shipment_data={itemData} /></div>
								: <div><SopOld shipment_data={itemData} /></div>}
						</TabPanel>
					</Tabs>
				</Modal.Body>
			</Modal>
		</div>

	);
}

export default PocSopModal;
