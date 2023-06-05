import { Tabs, TabPanel, Select, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getSupplierPrefrencePayload from '../../../helper/getSupplierPreferencePayload';
import useListRevenueDeskAvailableRates from '../../../hooks/useListRevenueDeskAvailableRates';

import ExistingInventory from './ExistingInventory';
import RatesCard from './RatesCard';
import SelectedRatesCard from './SelectedRatesCard';
import styles from './styles.module.css';

function Rates({ groupedShowServicesData }) {
	const tabKeys = Object?.keys(groupedShowServicesData || {});
	const [prefrences, setPrefrences] = useState([]);
	const [activeTab, setActiveTab] = useState(tabKeys[0]);
	const singleServiceData = groupedShowServicesData[activeTab][0];
	const { data: ratesData, loading: ratesLoading } = useListRevenueDeskAvailableRates({ singleServiceData });
	const rateCardObj = [
		{
			prefrence_key : 'system',
			type          : 'System Rates',
			data          : ratesData?.system_rates,
		},
		{
			prefrence_key : 'current',
			type          : 'Rates from Current Flash Alerts',
			data          : ratesData?.flashed_rates?.list,
		},
	];

	const { service_providers = [] } = getSupplierPrefrencePayload({
		currentRates : ratesData?.flashed_rates?.list,
		systemRates  : ratesData?.system_rates,
		prefrences,
	});

	useEffect(() => {
		setPayload({ service_providers: service_providers || [] });
	}, [JSON.stringify(prefrences)]);

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{tabKeys.map((singleTab) => (
					<TabPanel name={singleTab} title={startCase(singleTab.replace('_service', ''))} key={singleTab}>
						<div className={styles.button_select_container}>
							<div className={styles.select_container}>
								<Select
									// value={value}
									// onChange={onChange}
									placeholder="Select Books"
									// options={options}
									size="sm"
								/>
							</div>
							<div className={styles.button_container}>
								<Button size="md" themeType="secondary">Cancel Booking</Button>
								<Button size="md" themeType="primary">Save preference</Button>
							</div>
						</div>
						<SelectedRatesCard prefrences={prefrences} />
						<ExistingInventory
							docs={ratesData?.eligible_booking_document?.docs}
							loading={ratesLoading}
							prefrences={prefrences}
							setPrefrences={setPrefrences}
						/>
						{rateCardObj.map((item) => (
							<RatesCard
								ratesData={item}
								key={item}
								prefrences={prefrences}
								setPrefrences={setPrefrences}
								prefrence_key={item?.prefrence_key}
							/>
						))}
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}

export default Rates;
