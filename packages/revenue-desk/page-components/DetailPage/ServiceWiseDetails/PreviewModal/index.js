import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useListShipmentCurrencyConversions from '../../../../hooks/useListShipmentCurrencyConversions';

import PreviewSelectedCards from './PreviewSelectedCards';

function PreviewModal({
	modalStep, setModalStep,
	groupedShowServicesData, supplierPayload, shipmentData, updateTrigger, priceData,
}) {
	const newFilteredGroupedShowServicesData = {};
	const { data, loading } = useListShipmentCurrencyConversions({ shipmentData });

	Object.entries(groupedShowServicesData).forEach(([serviceType, serviceData]) => {
		newFilteredGroupedShowServicesData[serviceType] = serviceData.filter(
			(service) => supplierPayload?.[(service?.id)] && (supplierPayload[service?.id] || []).length,
		);
	});
	const filteredPriceData = Object.keys(supplierPayload)
		.filter((key) => supplierPayload[key].length > 0)
		.reduce((x, key) => {
			const obj = x;
			obj[key] = priceData[key];
			return obj;
		}, {});

	const consBuyPrice = Object.values(supplierPayload)
		.flatMap((arr) => (arr.length > 0 ? arr[0]?.data?.rowData?.total_price_in_preferred_currency || 0 : []))
		.reduce((sum, price) => sum + price, 0);
	const exchangesRates = data?.list?.[0]?.updated_currency_conversion_rate?.currencies
	|| data?.list?.[0]?.currency_conversion_rate?.currencies;

	const conSellPrice = Object.values(filteredPriceData)
		.reduce((sum, value) => {
			const currency = value.match(/[A-Z]+/)[0];
			const amount = value.replace(/[^\d]/g, '');
			const exchangeRate1 = exchangesRates?.[currency] || 1;
			const exchangeRate2 = exchangesRates?.USD || 1;
			return sum + ((amount * exchangeRate1) / exchangeRate2);
		}, 0);

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
