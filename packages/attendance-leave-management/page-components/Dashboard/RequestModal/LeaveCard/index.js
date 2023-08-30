import { Button, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcMArrowUp,
	IcMCross,
	IcMTick,
	IcMArrowDown,
	IcMCalendar,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { formatDistanceToNow } from 'date-fns';
import React, { useState, useEffect } from 'react';

import useGetEmployeeCollections from '../../../../hooks/useGetEmployeeCollections';
import useUpdateLeaveStatus from '../../../../hooks/useGetUpdateLeaveStatus';

import styles from './styles.module.css';

const TOTAL_COUNT = 10;
const DEFAULT_COUNT = 1;

function LeaveCard({ isManager = false, data = null, activeTab }) {
	const { request_label, pending_count, request_key } = data;
	const [accordion, setAccordion] = useState(false);

	const { data : requestData, setFilters } = useGetEmployeeCollections({
		isManager,
		request_type : request_key,
		isOpen       : accordion,
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
						{isManager && (
							<Button
								size="md"
								themeType="link"
								onClick={() => handleLeaveUpdate(undefined)}
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
					<div className={styles.parent_div}>
						{(list || []).map((val) => (
							<div className={styles.details} key={val.id}>
								<div className={styles.design}>
									<div className={styles.img}>
										<IcMCalendar width={18} height={18} />
									</div>
									<div className={styles.sec2}>
										<div className={styles.text1}>
											<span className={styles.text_name}>{val.name}</span>
											{' '}
											requested
											{' '}
											{ startCase(val.leave_type) }
											{' '}
											for
											{' '}
											{val.leave_count}
											{' '}
											{`Day${val.leave_count > DEFAULT_COUNT ? 's' : ''}`}
											, from
											{' '}
											{formatDate({
												date       : new Date(val.leave_start_date),
												dateFormat : GLOBAL_CONSTANTS.formats.date['MMM dd yyyy'],
												formatType : 'date',
											})}
											{' '}
											-
											{' '}
											{formatDate({
												date       : new Date(val.leave_end_date),
												dateFormat : GLOBAL_CONSTANTS.formats.date['MMM dd yyyy'],
												formatType : 'date',
											})}
										</div>
										<div className={styles.text2}>{val.leave_reason}</div>
										<div className={styles.leave_details}>
											<div className={styles.name}>
												{formatDistanceToNow(
													new Date(val.created_at),
													{ addSuffix: true },
												)}
											</div>
										</div>
									</div>
								</div>
								{isManager ? (
									<div className={styles.yes_no}>
										<div className={styles.deny}>
											<Button
												size="md"
												themeType="secondary"
												onClick={() => handleLeaveUpdate(val.id, 'rejected')}
												disabled={updateLoading}
											>
												<div className={styles.reject}>
													<IcMCross width={16} height={22} fill="#BF291E" />
													<span className={styles.rej_content}>Reject</span>
												</div>
											</Button>
										</div>
										<div className={styles.approve}>
											<Button
												size="md"
												themeType="secondary"
												onClick={() => handleLeaveUpdate(val.id, 'approved')}
												disabled={updateLoading}
											>
												<div className={styles.accept}>
													<IcMTick width={25} height={22} fill="#849E4C" />
													<span className={styles.acc_content}>Approve</span>
												</div>
											</Button>
										</div>
									</div>
								) : (
									<div
										className={` ${styles[val.leave_status === 'pending' ? 'pending' : 'accepted']
										}`}
									>
										{startCase(val.leave_status)}
									</div>
								)}
							</div>
						))}
						{total_count > TOTAL_COUNT && (
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
				)}
			</div>
		</div>
	);
}

export default LeaveCard;
