import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import PreviewSelectedCards from '../PreviewSelectedCards';

function PreviewModal({
	modalStep, setModalStep, tabKeys,
	groupedShowServicesData, supplierPayload, priceData, shipmentData,
}) {
	const [previewActiveTab, setPreviewActiveTab] = useState(tabKeys[0]);
	return (
		<>
			{' '}
			<Modal size="xl" show={modalStep === 1} onClose={() => setModalStep(0)} placement="center">
				<Modal.Header title="PREVIEW" />
				<Modal.Body>
					<Tabs
						activeTab={previewActiveTab}
						themeType="secondary"
						onChange={setPreviewActiveTab}
					>
						{tabKeys.map((singleTab) => (
							<TabPanel
								name={singleTab}
								title={startCase(singleTab.replace('_service', ''))}
								key={singleTab}
							>
								<PreviewSelectedCards
									groupedServicesData={groupedShowServicesData[previewActiveTab]}
									supplierPayload={supplierPayload}
									price={priceData[startCase(singleTab)]}
									shipmentType={shipmentData?.shipment_type}
								/>
							</TabPanel>
						))}
					</Tabs>
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="accent" onClick={() => setModalStep(2)}>Save Preference</Button>
				</Modal.Footer>
			</Modal>

		</>
	);
}

export default PreviewModal;
