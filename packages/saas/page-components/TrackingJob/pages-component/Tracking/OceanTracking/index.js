import { Table, Modal, TabPanel, Popover, Tabs, Button, Loader } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef } from 'react';

import EmptyState from '../../../common/EmptyState';
import ListPagination from '../../../common/ListPagination';
import { columns } from '../../../config/ocean-tracking-columns';
import useGetContainerData from '../../../hooks/useGetContainerData';
import useGetOceanTrackingList from '../../../hooks/useGetOceanTrackingList';
import Filters from '../../Filter';
import SearchFilters from '../../Filter/Search/search';
import Form from '../../Forms/FormOcean/index';

import styles from './styles.module.css';
import TrackerDetails from './TrackerDetails';

function OceanTracking() {
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
	} = useGetOceanTrackingList();

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
			refetch();
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
			<div className={styles.filter_container}>
				<SearchFilters
					searchString={searchString}
					serialId={serialId}
					setSearchString={setSearchString}
					activeTab="ocean_tracking"
					filters={filters}
					setFilters={setFilters}
					setSerialId={setSerialId}
				/>
				<Popover
					placement="right"
					theme="light"
					interactive
					content={(
						<Filters
							filters={filters}
							setFilters={setFilters}
						/>
					)}
				>
					<Button themeType="secondary" size="lg">
						<IcMFilter />
						{' '}
						FILTERS
					</Button>
				</Popover>

			</div>
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
				onClose={() => handleCloseModal()}
				onOuterClick={() => handleCloseModal()}
				size="lg"
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

export default OceanTracking;
