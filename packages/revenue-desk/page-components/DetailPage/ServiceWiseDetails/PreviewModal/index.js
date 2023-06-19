import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import PreviewSelectedCards from './PreviewSelectedCards';

function PreviewModal({
	modalStep, setModalStep,
	groupedShowServicesData, supplierPayload, shipmentData, updateTrigger,
}) {
	const newFilteredGroupedShowServicesData = {};

	Object.entries(groupedShowServicesData).forEach(([serviceType, serviceData]) => {
		newFilteredGroupedShowServicesData[serviceType] = serviceData.filter(
			(service) => supplierPayload.hasOwnProperty(service?.id) && (supplierPayload[service?.id] || []).length,
		);
	});
	const previewTabsKey = Object.keys(newFilteredGroupedShowServicesData).filter(
		(serviceType) => newFilteredGroupedShowServicesData[serviceType].length > 0,
	);
	const [previewActiveTab, setPreviewActiveTab] = useState(previewTabsKey[0]);

	let hasNegativeProfitability = false;
	Object.values(supplierPayload).forEach((rates) => {
		rates.forEach((rate) => {
			if (rate?.data?.rowData?.profit_percentage < 0) {
				hasNegativeProfitability = true;
			}
		});
	});

	const handleSumbit = () => {
		if (hasNegativeProfitability) {
			setModalStep(2);
		} else {
			updateTrigger();
		}
	};

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
									shipmentType={shipmentData?.shipment_type}
								/>
							</TabPanel>
						))}
					</Tabs>
				</Modal.Body>
				<Modal.Footer>
					<Button
						themeType="accent"
						onClick={() => handleSumbit()}
					>
						Save Preference
					</Button>
				</Modal.Footer>
			</Modal>

		</>
	);
}

export default PreviewModal;
