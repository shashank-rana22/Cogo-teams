/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-key */
import { Button } from '@cogoport/components';
import {
	IcMArrowUp,
	IcMLocation,
	IcMCross,
	IcMTick,
	IcMArrowDown,
	IcMCalendar,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function LeaveCard({ isManager = false, data = null }) {
	const { leaveData, pendingCount, request_type } = data;
	const [accordion, setAccordion] = useState(false);
	return (
		<div className={styles.leavecard}>
			<div
				className={styles.card_container}
				onClick={() => setAccordion(!accordion)}
			>
				<div>
					<div className={styles.heading_sp1}>{request_type}</div>
					<div className={styles.heading_sp2}>
						{pendingCount}
						{' '}
						Pending
					</div>
				</div>
				<div className={styles.yes_no}>
					<Button
						size="md"
						themeType="link"
						onClick={(e) => e.stopPropagation()}
					>
						Approve All
					</Button>
					{accordion ? (
						<IcMArrowUp width={16} height={16} />
					) : (
						<IcMArrowDown width={16} height={16} />
					)}
				</div>
			</div>
			{accordion && (
				<div className={styles.parent_div}>
					{leaveData.map((val) => (
						<div className={styles.parent_div}>
							<div className={styles.details}>
								<div className={styles.design}>
									<div className={styles.img}>
										{request_type !== 'Leave Request' ? (
											<IcMLocation width={18} height={18} />
										) : (
											<IcMCalendar width={18} height={18} />
										)}
									</div>
									<div className={styles.sec2}>
										<div className={styles.text1}>
											<span className={styles.text_name}>{val.name}</span>
											{' '}
											requested Geolocation Access for 2 Days, from August 21,
											2023 - August 22, 2023
											{' '}
										</div>
										<div className={styles.text2}>{val.reason}</div>
										<div className={styles.leave_details}>
											<span className={styles.name}>{val.name}</span>
											<span className={styles.dot} />
											<div className={styles.name}>{val.timestamp}</div>
										</div>
									</div>
								</div>
								{isManager ? (
									<div className={styles.yes_no}>
										<div className={styles.deny}>
											<Button size="md" themeType="secondary">
												<div className={styles.reject}>
													<IcMCross width={16} height={22} fill="#BF291E" />
													<span className={styles.rej_content}>Reject</span>
												</div>
											</Button>
										</div>
										<div className={styles.approve}>
											<Button size="md" themeType="secondary">
												<div className={styles.accept}>
													<IcMTick width={25} height={22} fill="#849E4C" />
													<span className={styles.acc_content}>Approve</span>
												</div>
											</Button>
										</div>
									</div>
								) : (
								// <div className={styles.edit_del}>
								// 	<IcMWasteScrap />

								// 	<Button size="md" themeType="secondary" className={styles.del}>
								// 		<IcMEdit className={styles.edit_icon} />
								// 		<span className={styles.edit_text}>Edit</span>

								// 	</Button>
								// </div>

									<div
										className={` ${styles[val.leaveStatus === 'Pending' ? 'pending' : 'accepted']
										}`}
									>
										{val.leaveStatus}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default LeaveCard;
