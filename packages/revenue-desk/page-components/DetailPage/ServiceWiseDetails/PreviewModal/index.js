import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import PreviewSelectedCards from './PreviewSelectedCards';

function PreviewModal({
	modalStep, setModalStep,
	groupedShowServicesData, supplierPayload, priceData, shipmentData,
}) {
	const newFilteredGroupedShowServicesData = {};
	Object.entries(groupedShowServicesData).forEach(([serviceType, serviceData]) => {
		newFilteredGroupedShowServicesData[serviceType] = serviceData.filter(
			(service) => supplierPayload.hasOwnProperty(service.id) && (supplierPayload[service.id] || []).length,
		);
	});
	const previewTabsKey = Object.keys(newFilteredGroupedShowServicesData).filter(
		(serviceType) => newFilteredGroupedShowServicesData[serviceType].length > 0,
	);
	const [previewActiveTab, setPreviewActiveTab] = useState(previewTabsKey[0]);
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
						{previewTabsKey.map((singleTab) => (
							<TabPanel
								name={singleTab}
								title={startCase(singleTab.replace('_service', ''))}
								key={singleTab}
							>
								<PreviewSelectedCards
									groupedServicesData={newFilteredGroupedShowServicesData[previewActiveTab]}
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
