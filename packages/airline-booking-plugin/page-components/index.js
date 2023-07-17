import { Tabs, TabPanel, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import tabs from '../configurations/tabs';

import AirIndiaAWB from './AirIndiaAWB';
import AirIndiaBooking from './AirIndiaBooking';
import Header from './Header';
import styles from './styles.module.css';

function AirlinePluginBooking() {
	const [activeTab, setActiveTab] = useState('air_india');
	const [showPlugInModal, setShowPlugInModal] = useState(null);
	const [edit, setEdit] = useState(false);

	const showModal = !isEmpty(showPlugInModal);

	return (
		<div>
			<Header setShow={setShowPlugInModal} />
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{tabs.map((tab) => (
						<TabPanel name={tab.name} title={tab.title} key={tab.key}>
							<AirIndiaAWB
								activeTab={activeTab}
								setEditPlugInModal={setShowPlugInModal}
								edit={edit}
								setEdit={setEdit}
							/>
						</TabPanel>
					))}
				</Tabs>
			</div>
			{showModal && (
				<Modal
					show={showModal}
					onClose={() => setShowPlugInModal([])}
					showCloseIcon
					className={styles.modal_container}
					size="xl"
				>
					<AirIndiaBooking
						showPlugInModa={showPlugInModal}
						setShowPlugInModal={setShowPlugInModal}
						edit={edit}
					/>
				</Modal>
			)}
		</div>
	);
}

export default AirlinePluginBooking;
