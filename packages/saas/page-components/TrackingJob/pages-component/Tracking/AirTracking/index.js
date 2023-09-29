import { Table, Modal, TabPanel, Tabs, Button, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import EmptyState from '../../../common/EmptyState';
import ListPagination from '../../../common/ListPagination';
import { columns } from '../../../config/air-tracking-columns';
import useGetAirData from '../../../hooks/useGetAirData';
import useGetAirTrackingList from '../../../hooks/useGetAirTrackingList';
import SearchFilters from '../../Filter/Search/search';
import Form from '../../Forms/FormAir/index';

import styles from './styles.module.css';
import TrackerDetails from './TrackerDetails';

function AirTracking() {
	const {
		data,
		loading,
		filters,
		setFilters,
		searchString,
		serialId,
		setSearchString,
		setSerialId,
		refetch,
	} = useGetAirTrackingList();

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

	if (!loading && isEmpty(data?.list)) {
		return <EmptyState />;
	}
	return (
		<div>
			<SearchFilters
				searchString={searchString}
				serialId={serialId}
				setSearchString={setSearchString}
				activeTab="ocean_tracking"
				filters={filters}
				setFilters={setFilters}
				setSerialId={setSerialId}
			/>
			<ListPagination filters={filters} setFilters={setFilters} data={data} />
			{!loading && isEmpty(data?.list)
				? <EmptyState /> : null}

			{loading
				? <Loader className={styles.loader} />
				: null}
			{!loading
			&& !isEmpty(data?.list)
				? <Table columns={column} data={data?.list || []} loading={loading} className={styles.table} /> : null}
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
			<ListPagination filters={filters} setFilters={setFilters} data={data} />
		</div>
	);
}

export default AirTracking;
