import { Button, Modal, TabPanel, Tabs } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { DEFAULT_INDEX, VALUE_ZERO, VALUE_ONE, PERCENTAGE_CHECK, VALUE_TWO } from '../../../constants';

import Header from './Header';
import PreviewSelectedCards from './PreviewSelectedCards';

function PreviewModal({
	modalStep, setModalStep,
	groupedShowServicesData, supplierPayload, shipmentData, updateTrigger,
}) {
	const NEW_FILTERED_GROUPED_SHOW_SERVICES_DATA = {};

	Object.entries(groupedShowServicesData).forEach(([serviceType, serviceData]) => {
		NEW_FILTERED_GROUPED_SHOW_SERVICES_DATA[serviceType] = serviceData.filter(
			(service) => supplierPayload?.[(service?.id)] && (supplierPayload[service?.id] || []).length,
		);
	});

	const consBuyPrice = Object.values(supplierPayload)
		.flatMap((arr) => (arr.length > VALUE_ZERO
			? Number(arr[DEFAULT_INDEX]?.data?.rowData?.total_buy_price_in_preferred_currency || VALUE_ZERO)
			|| VALUE_ZERO : []))
		.reduce((sum, price) => sum + price, VALUE_ZERO);

	const preferredCurrency = Object.values(supplierPayload)
		?.filter((arr) => arr?.length)?.[DEFAULT_INDEX]?.[DEFAULT_INDEX]?.data?.rowData?.preferred_currency;

	const conSellPrice = Object.values(supplierPayload)
		.flatMap((arr) => (arr.length > VALUE_ZERO
			? Number(arr[DEFAULT_INDEX]?.data?.rowData?.total_sell_price_in_preferred_currency || VALUE_ZERO)
		|| VALUE_ZERO : []))
		.reduce((sum, price) => sum + price, VALUE_ZERO);

	const previewTabsKey = Object.keys(NEW_FILTERED_GROUPED_SHOW_SERVICES_DATA).filter(
		(serviceType) => NEW_FILTERED_GROUPED_SHOW_SERVICES_DATA[serviceType].length > VALUE_ZERO,
	);

	const [previewActiveTab, setPreviewActiveTab] = useState(previewTabsKey[DEFAULT_INDEX]);
	let hasNegativeProfitability = false;
	Object.values(supplierPayload).forEach((rates) => {
		rates.forEach((rate) => {
			if (rate?.data?.rowData?.profit_percentage < PERCENTAGE_CHECK) {
				hasNegativeProfitability = true;
			}
		});
	});

	const handleSumbit = () => {
		if (hasNegativeProfitability) {
			setModalStep(VALUE_TWO);
		} else {
			updateTrigger();
		}
	};
	return (
		<>
			{' '}
			<Modal size="xl" show={modalStep === VALUE_ONE} onClose={() => setModalStep(VALUE_ZERO)} placement="center">
				<Modal.Header title={(
					<Header
						consBuyPrice={consBuyPrice}
						conSellPrice={conSellPrice}
						preferredCurrency={preferredCurrency}
					/>
				)}
				/>
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
									groupedServicesData={NEW_FILTERED_GROUPED_SHOW_SERVICES_DATA[previewActiveTab]}
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
