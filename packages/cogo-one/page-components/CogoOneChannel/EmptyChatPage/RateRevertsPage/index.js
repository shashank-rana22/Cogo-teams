import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import ListRateReverts from '../../../../common/SmtRateReverts/ListRateReverts';
import useListRateJobs from '../../../../hooks/useListRateJobs';

import Header from './Header';
import styles from './styles.module.css';

function RateRevertsPage({
	mailProps = {},
	setActiveTab = () => {},
}) {
	const { viewType = '' } = mailProps || {};

	const {
		setParams = () => {},
		params = {},
		rateJobsData = {},
		loading = false,
		fetchRateJobs = () => {},
		searchQuery = '',
		setSearchQuery = () => {},
	} = useListRateJobs({ viewType });

	const {
		total_count = 0,
		page = 1,
		list = [],
		stats = {},
	} = rateJobsData || {};

	return (
		<>
			<div className={styles.container}>
				<Header
					params={params}
					setParams={setParams}
					stats={stats}
					setSearchQuery={setSearchQuery}
					searchQuery={searchQuery}
					viewType={viewType}
				/>

				{loading ? (
					<div className={styles.loader}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
							alt="load"
							width={160}
							height={160}
						/>
					</div>
				) : (
					<ListRateReverts
						list={list}
						mailProps={mailProps}
						params={params}
						setActiveTab={setActiveTab}
						fetchRateJobs={fetchRateJobs}
					/>
				)}
			</div>

			<div className={styles.footer_bar}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={6}
					disabled={loading}
					onPageChange={(val) => setParams(
						(prev) => ({
							...prev,
							page: val,
						}),
					)}
				/>
			</div>
		</>
	);
}

export default RateRevertsPage;
