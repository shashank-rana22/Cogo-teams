import { Table, Modal, TabPanel, Tabs } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import { columns } from '../configurations/ocean-tracking-columns';
import Form from '../FormAir/index';

import TrackerDetails from './TrackerDetails';

// import styles from './styles.module.css';

// import PriceDetail from './ContainerData';

function OceanTracking({

	loading,
	list,

}) {
	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });
	const [activeTab, setActiveTab] = useState('add_location');
	const handleShowModal = (item) => {
		setShowUpdate({ show: true, data: item?.data });
	};
	const handleCloseModal = () => {
		setShowUpdate({ show: false, data: {} });
	};
	const column = columns({
		handleShowModal,
	});

	return (
		<div>

			<Table columns={column} data={list || []} loading={loading} />
			<Modal
				show={showUpdate.show}
				onClose={() => handleCloseModal()}
				onOuterClick={() => handleCloseModal()}
			>
				<Modal.Header title={`Airway Bill NO. -
				${showUpdate?.data?.airway_bill_no}`}
				/>

				<Modal.Body>
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						<TabPanel name="add_location" title="Add Location">
							<Form
							// refetch={refetch}
								showUpdate={showUpdate}
								setShowUpdate={setShowUpdate}
							/>
						</TabPanel>

						<TabPanel name="tracking" title="Tracking">
							<TrackerDetails id={showUpdate?.data?.saas_container_subscription_id} />
						</TabPanel>
					</Tabs>
					<div />

				</Modal.Body>

			</Modal>

		</div>
	);
}

export default OceanTracking;
