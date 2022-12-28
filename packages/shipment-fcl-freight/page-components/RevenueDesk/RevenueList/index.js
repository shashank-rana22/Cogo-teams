import {
	Tabs, TabPanel, Input, Loader,
} from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import EmptyState from '../../../commons/EmptyState';

import CompletedJobs from './CompletedJobs';
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
	const handleChangeSerial = (value) => {
		hookSetters.setFilters({ q: value });
		setSerialId(value);
	};

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
			{handleRender()}
			<div />

		</div>
	);
}
export default RevenueList;
