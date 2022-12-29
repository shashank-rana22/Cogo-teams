import {
	Tabs, TabPanel, Input, Loader, Popover,
} from '@cogoport/components';
import { IcMSearchlight, IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import EmptyState from '../../../commons/EmptyState';

import CompletedJobs from './CompletedJobs';
import Filters from './Filters';
import PendingJobs from './PendingJobs';
import styles from './styles.module.css';

function RevenueList({
	loading = false,
	hookSetters = () => {},
	listData = [],
	setShowBookingOption = () => {},
	total,
	page = 1,
	filters = {},
	refetch = () => {},
	setClickedCard = () => {},
	clickedCard,
	setActiveTab = () => {},
	activeTab = 'pending',
	shipment_type,
}) {
	const [serialId, setSerialId] = useState('');
	const [showFilters, setShowFilters] = useState(false);
	console.log(showFilters, 'naveen');
	const handleChangeSerial = (value) => {
		hookSetters.setFilters({ q: value });
		setSerialId(value);
	};

	const renderBody = () => (
		<Filters
			hookSetters={hookSetters}
			setShowFilters={setShowFilters}
			activeTab={activeTab}
		/>

	);

	const handleRender = () => {
		if (loading) {
			return (
				<div className={styles.loader_container}>
					<Loader />
				</div>
			);
		}

		if (loading && listData?.length === 0) {
			return <EmptyState />;
		}

		return (
			<Tabs
				activeTab={activeTab}
				onChange={(tab) => {
					setActiveTab(tab);
					// eslint-disable-next-line no-param-reassign
					hookSetters.setFilters(page = 1);
				}}
			>
				<TabPanel name="pending" title={<div className={styles.tab_label}>Pending Jobs</div>}>
					<PendingJobs
						setShowBookingOption={setShowBookingOption}
						total={total}
						data={listData}
						hookSetters={hookSetters}
						filters={filters}
						refetch={refetch}
						page={page}
						activeTab={activeTab}
						setClickedCard={setClickedCard}
						clickedCard={clickedCard}
						shipment_type={shipment_type}
						loading={loading}
					/>
				</TabPanel>

				<TabPanel name="completed" title={<div className={styles.tab_label}>Completed Jobs</div>}>
					<CompletedJobs
						setShowBookingOption={setShowBookingOption}
						total={total}
						data={listData}
						hookSetters={hookSetters}
						filters={filters}
						refetch={refetch}
						page={page}
						activeTab={activeTab}
						setClickedCard={setClickedCard}
						clickedCard={clickedCard}
						shipment_type={shipment_type}
						loading={loading}
					/>
				</TabPanel>
			</Tabs>
		);
	};

	return (
		<div>
			<div className={styles.heading}>
				FCL Revenue Desk
			</div>
			<div className={styles.row}>

				<div className={styles.fcl_filters}>
					<Popover
						render={renderBody}
						placement="bottom"
						show={showFilters}
						className={styles.filter_popover}
					>
						<button onClick={() => setShowFilters(!showFilters)} className={styles.filter_button}>
							<IcMFilter width="20px" height="28px" />
						</button>
					</Popover>
				</div>

				<div className={styles.input}>
					<Input
						name="q"
						value={serialId}
						onChange={(e) => handleChangeSerial(e)}
						placeholder="Search by SID"
						style={{ width: '300px' }}
						inputIcon={<IcMSearchlight />}
					/>
				</div>

			</div>
			<div />

			{handleRender()}
			<div />

		</div>
	);
}
export default RevenueList;
