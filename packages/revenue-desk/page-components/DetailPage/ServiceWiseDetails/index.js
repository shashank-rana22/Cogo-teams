import { Tabs, TabPanel, Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateRatesPreferences from '../../../hooks/useUpdateRatesPreferences';

import PreviewSelectedCards from './PreviewSelectedCards';
import SingleService from './SingleService';
import styles from './styles.module.css';

function Rates({ groupedShowServicesData, serviceData }) {
	const tabKeys = Object?.keys(groupedShowServicesData || {});
	const [supplierPayload, setSupplierPayload] = useState({});
	const [inventory, setInventory] = useState([]);
	const [activeTab, setActiveTab] = useState(tabKeys[0]);
	const [modalStep, setModalStep] = useState(0);

	const { loading, updateTrigger } = useUpdateRatesPreferences({
		supplierPayload,
		inventory,
		serviceData,
	});

	return (
		<div className={styles.container}>
			<div className={styles.button_select_container}>
				<div className={styles.button_container}>
					<Button size="md" themeType="secondary">Cancel Booking</Button>
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
						/>
					</TabPanel>
				))}
			</Tabs>
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
					<Modal size="xl" show={modalStep === 2} onClose={() => setModalStep(0)} placement="center">
						<Modal.Header title="PREVIEW" />
						<Modal.Body>
							hello
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
