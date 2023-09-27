import { Table, Modal, TabPanel, Tabs, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import EmptyState from '../../../common/EmptyState';
import { columns } from '../../../config/air-tracking-columns';
import useGetAirData from '../../../hooks/useGetAirData';
import Form from '../../Forms/FormAir/index';

import styles from './styles.module.css';
import TrackerDetails from './TrackerDetails';

function AirTracking({
	loading = false,
	list = [],
	refetch = () => {},
	setFilters = () => {},
	filters = {},
}) {
	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });
	const [activeTab, setActiveTab] = useState('add_location');
	const handleShowModal = (item) => {
		setShowUpdate({ show: true, data: item?.data });
	};
	const handleCloseModal = () => {
		setShowUpdate({ show: false, data: {} });
		setActiveTab('add_location');
	};
	const column = columns({
		handleShowModal,
		setFilters,
		filters,
	});
	const formRef = useRef(null);
	const { apiTrigger, createLoading } = useGetAirData({
		refetch: () => {
			setShowUpdate({ show: false, data: {} });
			setActiveTab('add_location');
			refetch();
		},
	});
	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	const handleSubmitForm = ({ values }) => {
		apiTrigger({ values, showUpdate, setShowUpdate });
	};
	if (isEmpty(list)) {
		return <EmptyState />;
	}
	return (
		<div>
			<Table className={styles.table} data={list || []} columns={column} loading={loading} />
			<Modal
				show={showUpdate.show}
				onClose={handleCloseModal}
				onOuterClick={handleCloseModal}
				closeOnOuterClick
				placement="top"
				size="lg"
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
								refetch={refetch}
								ref={formRef}
								handleSubmitForm={handleSubmitForm}
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

				<Modal.Footer>
					{
					activeTab === 'add_location' ? (
						<Button
							className={styles.btn_align}
							onClick={onSubmit}
							disabled={createLoading}
						>
							Submit
						</Button>
					) :	(
						<Button onClick={() => handleCloseModal()}>Close</Button>
					)
				}
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default AirTracking;
