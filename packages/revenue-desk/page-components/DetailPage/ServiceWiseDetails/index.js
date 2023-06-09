import { Tabs, TabPanel, Button, Modal, Checkbox, Textarea } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateRatesPreferences from '../../../hooks/useUpdateRatesPreferences';

import CancellationModal from './CancellationModal';
import PreviewSelectedCards from './PreviewSelectedCards';
import SingleService from './SingleService';
import styles from './styles.module.css';

function Rates({ groupedShowServicesData, serviceData, shipmentData, priceData }) {
	const tabKeys = Object?.keys(groupedShowServicesData || {});
	const [supplierPayload, setSupplierPayload] = useState({});
	const [showCancelModal, setshowCancelModal] = useState(false);
	const [inventory, setInventory] = useState([]);
	const [activeTab, setActiveTab] = useState(tabKeys[0]);
	const [modalStep, setModalStep] = useState(0);
	const [reason, setReason] = useState(null);
	const [othertext, setOthertext] = useState(null);
	const { loading, updateTrigger } = useUpdateRatesPreferences({
		supplierPayload,
		inventory,
		serviceData,
		reason,
		othertext,
	});
	const handleOnChange = (val) => {
		if (reason === val) {
			setReason(null);
		} else {
			setReason(val);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.button_select_container}>
				<div className={styles.button_container}>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setshowCancelModal(true)}
					>
						Cancel Booking
					</Button>
					<Button
						size="md"
						themeType="primary"
						onClick={() => setModalStep(1)}
						disabled={loading}
					>
						Save preference
					</Button>
				</div>
			</div>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{tabKeys.map((singleTab) => (
					<TabPanel name={singleTab} title={startCase(singleTab.replace('_service', ''))} key={singleTab}>
						<SingleService
							groupedServicesData={groupedShowServicesData[activeTab]}
							supplierPayload={supplierPayload}
							setSupplierPayload={setSupplierPayload}
							inventory={inventory}
							setInventory={setInventory}
							price={priceData[startCase(singleTab)]}
						/>
					</TabPanel>
				))}
			</Tabs>
			{showCancelModal ? (
				<CancellationModal
					shipmentData={shipmentData}
					showCancelModal={showCancelModal}
					setshowCancelModal={setshowCancelModal}
				/>
			) : null}
			{modalStep === 1
				? (
					<Modal size="xl" show={modalStep === 1} onClose={() => setModalStep(0)} placement="center">
						<Modal.Header title="PREVIEW" />
						<Modal.Body>
							<Tabs
								activeTab={activeTab}
								themeType="secondary"
								onChange={setActiveTab}
							>
								{tabKeys.map((singleTab) => (
									<TabPanel
										name={singleTab}
										title={startCase(singleTab.replace('_service', ''))}
										key={singleTab}
									>
										<PreviewSelectedCards
											groupedServicesData={groupedShowServicesData[activeTab]}
											supplierPayload={supplierPayload}
										/>
									</TabPanel>
								))}
							</Tabs>
						</Modal.Body>
						<Modal.Footer>
							<Button themeType="accent" onClick={() => setModalStep(2)}>Save Preference</Button>
						</Modal.Footer>
					</Modal>
				) : null}
			{modalStep === 2
				? (
					<Modal size="lg" show={modalStep === 2} onClose={() => setModalStep(0)} placement="center">
						<Modal.Header title="PREVIEW" />
						<Modal.Body>
							<div className={styles.modal_text}>
								*You have used Revenue Desk wallet to apply discount.
								Please provide a reason for approving this booking at this rate.
							</div>
							<Checkbox
								label="Request not serviceable"
								value="request_not_serviceable"
								onChange={() => handleOnChange('request_not_serviceable')}
								checked={reason === 'request_not_serviceable'}
							/>
							<Checkbox
								label="Rates not available"
								value="rates_not_available"
								onChange={() => handleOnChange('rates_not_available')}
								checked={reason === 'rates_not_available'}
							/>
							<Checkbox
								label="No space with service provider"
								value="no_space_with_service_provider"
								onChange={() => handleOnChange('no_space_with_service_provider')}
								checked={reason === 'no_space_with_service_provider'}
							/>
							<Checkbox
								label="Other"
								value="other"
								onChange={() => handleOnChange('other')}
								checked={reason === 'other'}
							/>
							{reason === 'other' && (
								<div style={{ padding: '0 10px' }}>
									<Textarea
										name="a4"
										size="sm"
										placeholder="Other Reason"
										value={othertext}
										onChange={(val) => setOthertext(val)}
									/>

								</div>
							)}
						</Modal.Body>
						<Modal.Footer>
							<div className={styles.btn_container}>
								<Button themeType="secondary" onClick={() => setModalStep(1)}>Back</Button>
								<Button themeType="accent" onClick={() => updateTrigger()}>Submit</Button>
							</div>
						</Modal.Footer>
					</Modal>
				) : null}
		</div>

	);
}

export default Rates;
