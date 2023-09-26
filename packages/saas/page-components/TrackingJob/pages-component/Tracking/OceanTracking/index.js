import { Table, Modal, TabPanel, Tabs, Button } from '@cogoport/components';
import React, { useState, useRef } from 'react';

import { columns } from '../../../config/ocean-tracking-columns';
import useGetContainerData from '../../../hooks/useGetContainerData';
import Form from '../../Forms/FormOcean/index';

import styles from './styles.module.css';
import TrackerDetails from './TrackerDetails';

function OceanTracking({
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
		filters,
		setFilters,
	});
	const formRef = useRef(null);
	const { apiTrigger, createLoading } = useGetContainerData({
		refetch: () => {
			setShowUpdate({ show: false, data: {} });
		},
	});
	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	const handleSubmitForm = ({ values }) => {
		apiTrigger({ values, showUpdate, setShowUpdate });
	};
	return (
		<div>

			<Table columns={column} data={list || []} loading={loading} className={styles.table} />
			<Modal
				show={showUpdate.show}
				onClose={() => handleCloseModal()}
				onOuterClick={() => handleCloseModal()}
			>
				<Modal.Header title={`Search Value. -
				${showUpdate?.data?.search_value}`}
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
								ref={formRef}
								handleSubmitForm={handleSubmitForm}
								showUpdate={showUpdate}
								setShowUpdate={setShowUpdate}
								shipping_line_id={showUpdate?.data?.saas_container_subscription_id}
							/>
						</TabPanel>

						<TabPanel name="tracking" title="Tracking">
							<TrackerDetails id={showUpdate?.data?.saas_container_subscription_id} />
						</TabPanel>
					</Tabs>
					<div />

				</Modal.Body>
				{
					activeTab === 'add_location' && (
						<Modal.Footer>
							<Button
								className={styles.btn_align}
								onClick={onSubmit}
								disabled={createLoading}
							>
								Submit
							</Button>
						</Modal.Footer>
					)
				}
			</Modal>

		</div>
	);
}

export default OceanTracking;
