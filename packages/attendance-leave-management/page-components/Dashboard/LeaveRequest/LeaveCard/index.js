import { Button, Pagination } from '@cogoport/components';
import {
	IcMArrowUp,
	IcMArrowDown,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import EmptyState from '../../../../common/EmptyState';
import Loader from '../../../../common/Loader';
import useGetEmployeeCollections from '../../../../hooks/useGetEmployeeCollections';
import useUpdateLeaveStatus from '../../../../hooks/useGetUpdateLeaveStatus';

import HandleShowSubCards from './handleShowSubCard';
import styles from './styles.module.css';

const TOTAL_COUNT = 10;

function LeaveCard({ isManager = false, data = null, activeTab = ' ', searchQuery = '' }) {
	const { request_label, pending_count, request_key } = data;
	const [accordion, setAccordion] = useState(false);

	const { data : requestData, setFilters, loading } = useGetEmployeeCollections({
		isManager,
		request_type : request_key,
		isOpen       : accordion,
		searchQuery,
	});

	const { loading : updateLoading, updateLeaveStatus } = useUpdateLeaveStatus(setFilters);

	const { page, page_limit, total_count, list } = requestData || {};

	useEffect(() => {
		setFilters((prev) => ({ ...prev, page: 1 }));
		setAccordion(false);
	}, [activeTab, setFilters]);

	const handleLeaveUpdate = (id, type) => {
		const valObj = {
			leave_application_id : id,
			application_status   : type,
		};
		updateLeaveStatus(valObj);
	};

	return (
		<div className={styles.leavecard}>
			{isEmpty(searchQuery) ? (
				<div>
					<div className={styles.card_container} aria-hidden onClick={() => setAccordion(!accordion)}>
						<div>
							<div className={styles.heading_sp1}>{request_label}</div>
							<div className={styles.heading_sp2}>
								{pending_count}
								{' '}
								Pending
							</div>
						</div>
						<div className={styles.yes_no}>
							{isManager && request_label === 'LEAVE REQUESTS' && (
								<Button
									size="md"
									themeType="link"
									onClick={() => handleLeaveUpdate(undefined, 'approved')}
								>
									Approve All
								</Button>
							)}
							{accordion ? (
								<IcMArrowUp width={16} height={16} />
							) : (
								<IcMArrowDown width={16} height={16} />
							)}
						</div>
					</div>
					{accordion && (
						<div>
							{loading ? <Loader /> : (
								<HandleShowSubCards
									updateLoading={updateLoading}
									isManager={isManager}
									handleLeaveUpdate={handleLeaveUpdate}
									list={list}
									request_label={request_label}
								/>
							)}
						</div>
					)}
				</div>
			) : (
				<div>
					{(isEmpty(list)) ? (<EmptyState />) : (
						<div>
							<div className={styles.padding_top} />
							<div className={styles.parent_div}>
								<HandleShowSubCards
									updateLoading={updateLoading}
									isManager={isManager}
									handleLeaveUpdate={handleLeaveUpdate}
									list={list}
									request_label={request_label}
								/>
							</div>
						</div>
					)}
				</div>
			)}
			{total_count > TOTAL_COUNT && accordion && (
				<div className={styles.pagination_container}>
					<Pagination
						className="md"
						totalItems={total_count}
						type="table"
						currentPage={page}
						pageSize={page_limit}
						onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}
					/>
				</div>
			)}
		</div>
	);
}

export default LeaveCard;
