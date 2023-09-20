import { Table, Modal, TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import { columns } from '../configurations/air-tracking-columns';
import Form from '../FormAir/index';

import styles from './styles.module.css';
import TrackerDetails from './TrackerDetails';

function AirTracking({
	loading = false,
	list = [],
	filters = {},
	setFilters = () => {},
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

			<Table className={styles.styled_table} data={list || []} columns={column} loading={loading} />
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
							<TrackerDetails id={showUpdate?.data?.saas_air_subscription_id} trackingType="air" />
						</TabPanel>
					</Tabs>
					<div />

				</Modal.Body>

			</Modal>

		</div>
	);
}

export default AirTracking;
