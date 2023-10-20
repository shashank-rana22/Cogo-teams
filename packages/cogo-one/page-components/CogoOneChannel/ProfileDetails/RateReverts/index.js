import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import { ListRateReverts } from '../../../../common/SmtRateReverts';
import { FIREBASE_TABS } from '../../../../constants';
import useListRateJobs from '../../../../hooks/useListRateJobs';

import Header from './Header';
import styles from './styles.module.css';

function RateReverts({
	mailProps = {},
	setActiveTab = () => {},
	formattedMessageData = {},
	activeVoiceCard = {},
	activeTab = '',
}) {
	const {
		organization_id: messageOrgId,
	} = formattedMessageData || {};
	const { organization_id: voiceCallOrgId = '' } = activeVoiceCard || {};

	const orgId = FIREBASE_TABS.includes(activeTab) ? messageOrgId : voiceCallOrgId;

	const { viewType = '' } = mailProps || {};

	const {
		setParams = () => {},
		params = {},
		rateJobsData = {},
		loading = false,
		fetchRateJobs = () => {},
	} = useListRateJobs({ orgId, triggeredFrom: 'sideBar', viewType });

	const {
		total_count = 0,
		page = 1,
		list = [],
	} = rateJobsData || {};

	return (
		<div className={styles.container}>
			<Header
				params={params}
				setParams={setParams}
				viewType={viewType}
			/>

			<div className={styles.body}>
				{loading ? (
					<div className={styles.loader}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
							alt="loader"
							width={100}
							height={100}
						/>
					</div>
				) : (
					<ListRateReverts
						list={list}
						mailProps={mailProps}
						params={params}
						setActiveTab={setActiveTab}
						fetchRateJobs={fetchRateJobs}
						triggeredFrom="sideBar"
					/>
				)}
			</div>

			<div className={styles.footer}>
				<Pagination
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
		</div>
	);
}

export default RateReverts;
