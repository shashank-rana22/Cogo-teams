import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { IcCRedCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import POCDetails from './POCDetails';
import Sop from './Sop';
import SopOld from './SopOld';
import styles from './styles.module.css';

function PocSopModal({ itemData }) {
	const [activePocTab, setActivePocTab] = useState('sop');
	const [showPocSop, setShowPocSop] = useState(false);
	const [indicator, showIndicator] = useState(false);
	return (
		<div>
			<div>
				<Button size="xl" themeType="secondary" onClick={() => setShowPocSop(true)}>
					{indicator
						? <IcCRedCircle /> : null}
					POC & SOP
					{' '}
				</Button>
			</div>

			<Modal
				size="xl"
				show={showPocSop}
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
								? (
									<div>
										<Sop
											shipment_data={itemData}
											showIndicator={showIndicator}
										/>
									</div>
								)
								: <div><SopOld shipment_data={itemData} /></div>}
						</TabPanel>
					</Tabs>
				</Modal.Body>
			</Modal>
		</div>

	);
}

export default PocSopModal;
