import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import useListRateJobs from '../../../../hooks/useListRateJobs';

import Header from './Header';
import ListRateReverts from './ListRateReverts';
import styles from './styles.module.css';

function RateRevertsPage({
	mailProps = {},
	setActiveTab = () => {},
}) {
	const {
		setParams = () => {},
		params = {},
		rateJobsData = {},
		loading = false,
		fetchRateJobs = () => {},
	} = useListRateJobs();

	const {
		total_count = 0,
		page = 1,
		list = [],
	} = rateJobsData || {};

	return (
		<>
			<div className={styles.container}>
				<Header
					params={params}
					setParams={setParams}
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
					onPageChange={() => setParams(
						(prev) => ({
							...prev,
							page: page + 1,
						}),
					)}
				/>
			</div>
		</>
	);
}

export default RateRevertsPage;
