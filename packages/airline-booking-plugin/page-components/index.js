import { Tabs, TabPanel, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import tabs from '../configurations/tabs';

import AirIndiaAWB from './AirIndiaAWB';
import AirIndiaBooking from './AirIndiaBooking';
import Header from './Header';
import styles from './styles.module.css';

function AirlinePluginBooking() {
	const [activeTab, setActiveTab] = useState('air_india');
	const [pluginData, setPluginData] = useState([]);
	const [edit, setEdit] = useState(false);
	const [show, setShow] = useState(false);
	const [item, setItem] = useState({});
	const [refresh, setRefresh] = useState({});

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
							<AirIndiaAWB
								activeTab={activeTab}
								setEdit={setEdit}
								item={item}
								setItem={setItem}
								setRefresh={setRefresh}
							/>
						</TabPanel>
					))}
				</Tabs>
			</div>
			{(show || edit) && (
				<Modal
					show={show || edit}
					onClose={() => { setShow(false); setEdit(false); setPluginData([]); }}
					showCloseIcon
					className={styles.modal_container}
					size="xl"
				>
					<AirIndiaBooking
						pluginData={pluginData}
						setPluginData={setPluginData}
						edit={edit}
						item={item}
						refresh={refresh}
						setEdit={setEdit}
					/>
				</Modal>
			)}
		</div>
	);
}

export default AirlinePluginBooking;
