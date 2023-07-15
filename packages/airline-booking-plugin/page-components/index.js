import { Tabs, TabPanel, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import tabs from '../configurations/tabs';

import Header from './Header';
import styles from './styles.module.css';

function AirlinePluginBooking() {
	const [activeTab, setActiveTab] = useState('air_india');
	const [show, setShow] = useState(false);

	return (
		<div>
			<Header setShow={setShow} />
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{tabs.map((tab) => (
						<TabPanel name={tab.name} title={tab.title} key={tab.key}>
							Air India
						</TabPanel>
					))}
				</Tabs>
			</div>
			{show && (
				<Modal
					show={show}
					onClose={() => setShow(false)}
					className={styles.modal_container}
				>
					Hello
				</Modal>
			)}
		</div>
	);
}

export default AirlinePluginBooking;
