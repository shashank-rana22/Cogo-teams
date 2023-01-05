import {
	Tabs, TabPanel, Loader,
} from '@cogoport/components';
import React from 'react';

import EmptyState from '../../../commons/EmptyState';

import CompletedJobs from './CompletedJobs';
import Header from './Header';
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
	return (
		<div>
			<Header hookSetters={hookSetters} activeTab={activeTab} />

			<Tabs
				className={styles.tabs}
				activeTab={activeTab}
				onChange={(tab) => {
					setActiveTab(tab);
					// eslint-disable-next-line no-param-reassign
					hookSetters.setFilters(page = 1);
				}}
			>
				<TabPanel name="pending" title={<div className={styles.tab_label}>Pending Jobs</div>}>
					{
						loading && (
							<div className={styles.loader_container}>
								<Loader />
							</div>
						)
					}
					{!loading && listData.length === 0 && <EmptyState />}

					{ !loading && listData.length > 0
						&& (
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
						) }

				</TabPanel>

				<TabPanel name="completed" title={<div className={styles.tab_label}>Completed Jobs</div>}>
					{
						loading && (
							<div className={styles.loader_container}>
								<Loader />
							</div>
						)
					}
					{!loading && listData.length === 0 && <EmptyState />}
					{!loading && listData.length > 0
						? (
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
						)
						: null}
				</TabPanel>
			</Tabs>
			<div />

		</div>
	);
}
export default RevenueList;
