import { Input, Tabs, TabPanel } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowLeft, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import Loader from '../../../common/Loader';
import useGetLeaveGroupings from '../../../hooks/useGetLeaveGroupings';

import LeaveCard from './LeaveCard';
import styles from './styles.module.css';

function LeaveRequest({ setShowInbox = () => {}, isManager = false }) {
	const [activeTab, setActiveTab] = useState('employee');
	const { push, query:queryParams } = useRouter();
	const { loading, data } = useGetLeaveGroupings(activeTab);
	const { query = '', debounceQuery } = useDebounceQuery();

	const { back } = queryParams;

	const { total_self_pending_count, list, total_employees_pending_count } = data || {};

	const [searchQuery, setSearchQuery] = useState('');
	const handleSearch = (event) => {
		debounceQuery(event);
		setSearchQuery(event);
	};

	const handleGoBack = () => {
		if (back === 'hrms') {
			push('/hrms');
		} else {
			push('/attendance-leave-management');
			setShowInbox(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left_header}>
					<IcMArrowLeft width={20} height={20} onClick={handleGoBack} />
					<div className={styles.card_content}>
						<span className={styles.above_text}>MY INBOX</span>
						<span className={styles.below_text}>
							View and manage all requests
						</span>
					</div>
				</div>
			</div>
			<div className={styles.filters}>
				<div className={styles.tab_switch}>
					<Tabs
						activeTab={activeTab}
						themeType="tertiary"
						onChange={setActiveTab}
					>
						<TabPanel
							name="employee"
							title="My Requests"
							badge={total_self_pending_count || GLOBAL_CONSTANTS.zeroth_index}
						/>
						{ (isManager || total_employees_pending_count > GLOBAL_CONSTANTS.zeroth_index) && (
							<TabPanel
								name="manager"
								title="Employee Requests"
								badge={total_employees_pending_count || GLOBAL_CONSTANTS.zeroth_index}
							/>
						)}
					</Tabs>
				</div>
				{(activeTab !== 'employee') ? (
					<div className={styles.selection_options}>
						<Input
							size="md"
							prefix={<IcMSearchlight />}
							placeholder="Search"
							value={searchQuery}
							onChange={handleSearch}
						/>
					</div>
				) : null}
			</div>
			{loading ? (<Loader />) : (
				<div className={styles.leave_card_container}>
					{!isEmpty(list) ? (
						(list || []).map((leaveData) => (
							<LeaveCard
								isManager={activeTab === 'manager'}
								data={leaveData}
								activeTab={activeTab}
								key={leaveData.leave_request}
								loading={loading}
								searchQuery={query}
							/>
						))
					) : <EmptyState />}
				</div>
			)}
		</div>
	);
}

export default LeaveRequest;
