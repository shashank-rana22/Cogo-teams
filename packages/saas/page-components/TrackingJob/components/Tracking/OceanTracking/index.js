import { Table, Modal, TabPanel, Popover, Tabs, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useMemo } from 'react';

import EmptyState from '../../../common/EmptyState';
import ListPagination from '../../../common/ListPagination';
import getColumns from '../../../config/ocean-tracking-columns';
import useListUntrackedContainers from '../../../hooks/useListUntrackedContainers';
import useUpdateContainerAndBlMiles from '../../../hooks/useUpdateContainerAndBlMiles';
import Filters from '../../Filter';
import SearchFilters from '../../Filter/Search/search';
import Form from '../../Forms/FormOcean/index';

import styles from './styles.module.css';
import TrackerDetails from './TrackerDetails';

function OceanTracking() {
	const formRef = useRef(null);

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
	} = useListUntrackedContainers();

	const [filterVisible, setFilterVisible] = useState(false);
	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });
	const [activeTab, setActiveTab] = useState('add_location');

	const handleShowModal = (item) => setShowUpdate({ show: true, data: item?.data });

	const handleCloseModal = () => {
		setShowUpdate({ show: false, data: {} });
	};

	const columns = useMemo(() => getColumns({
		handleShowModal,
		filters,
		setFilters,
	}), [setFilters, filters]);

	const { apiTrigger, createLoading } = useUpdateContainerAndBlMiles({
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
					placement="bottom"
					theme="light"
					visible={filterVisible}
					onClickOutside={() => setFilterVisible(false)}
					content={filterVisible ? (
						<Filters
							filters={filters}
							setFilters={setFilters}
							setShow={setFilterVisible}
							show={filterVisible}
						/>
					) : null}
				>
					<Button themeType="secondary" size="md" onClick={() => setFilterVisible(!filterVisible)}>
						<IcMFilter />
						{' '}
						FILTERS
					</Button>
				</Popover>

			</div>
			<ListPagination filters={filters} setFilters={setFilters} data={data} />

			<Table columns={columns || []} data={data?.list || []} loading={loading} className={styles.table} />

			{!loading && isEmpty(data?.list) ? <EmptyState /> : null}

			<ListPagination filters={filters} setFilters={setFilters} data={data} />

			<Modal
				show={showUpdate.show}
				onClose={handleCloseModal}
				onOuterClick={handleCloseModal}
				placement="top"
				size="xl"
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
					{activeTab === 'add_location' ? (
						<Button
							className={styles.btn_align}
							onClick={onSubmit}
							disabled={createLoading}
						>
							Submit
						</Button>
					) :	(
						<Button onClick={handleCloseModal}>Close</Button>
					)}
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default OceanTracking;
