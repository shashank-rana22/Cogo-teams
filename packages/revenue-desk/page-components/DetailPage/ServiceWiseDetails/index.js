import { Tabs, TabPanel, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateRatesPreferences from '../../../hooks/useUpdateRatesPreferences';

import SingleService from './SingleService';
import styles from './styles.module.css';

function Rates({ groupedShowServicesData, serviceData }) {
	const tabKeys = Object?.keys(groupedShowServicesData || {});
	const [supplierPayload, setSupplierPayload] = useState({});
	const [inventory, setInventory] = useState([]);
	const [activeTab, setActiveTab] = useState(tabKeys[0]);

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
						onClick={() => updateTrigger()}
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
							activeTab={activeTab}
							groupedShowServicesData={groupedShowServicesData}
							supplierPayload={supplierPayload}
							setSupplierPayload={setSupplierPayload}
							inventory={inventory}
							setInventory={setInventory}
						/>
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}

export default Rates;
