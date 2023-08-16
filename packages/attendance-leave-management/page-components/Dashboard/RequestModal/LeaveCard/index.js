/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-key */
import { Button } from '@cogoport/components';
import { IcMArrowUp, IcMPlus, IcMCross, IcMTick, IcMWasteScrap, IcMEdit, IcMArrowDown }
	from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function LeaveCard({ isManager, data }) {
	const { leaveData, pendingCount, request_type } = data;
	const [accordion, setAccordion] = useState(false);
	return (
		<>
			<div className={styles.leave_req_reading} onClick={() => setAccordion(!accordion)}>
				<div>
					<div className={styles.heading_sp1}>{request_type}</div>
					<div className={styles.heading_sp2}>
						{pendingCount}
						{' '}
						Pending
					</div>
				</div>
				<div>{accordion ? <IcMArrowUp width={16} height={16} /> : <IcMArrowDown width={16} height={16} />}</div>
			</div>
			{accordion && (
				<div>
					{leaveData.map((val) => (
						<div className={styles.parent_div}>
							<div className={styles.details}>
								<div className={styles.design}>
									<div className={styles.img}><IcMPlus width={18} height={18} /></div>
									<div className={styles.sec2}>
										<div className={styles.text1}>
											{val.leaveType}
											{' '}
											Leave (2 Days)
										</div>
										<div className={styles.text2}>
											{val.startDate}
											{' '}
											-
											{' '}
											{val.endDate}
										</div>
										<div className={styles.leave_details}>
											<div className={styles.name}>
												{val.name}
											</div>
											<div className={styles.name}>
												.
											</div>
											<div className={styles.name}>
												August 16, 2023
											</div>

										</div>

									</div>
								</div>

								<div className={styles.pending}>
									<span className={styles.dot}>.</span>
									<span>Pending</span>

								</div>
							</div>

							{isManager ?	(
								<div className={styles.yes_no}>
									<Button size="md" themeType="secondary">
										<div className={styles.reject}>

											<IcMCross width={16} height={22} />
											<span className={styles.rej_content}>Reject</span>

										</div>

									</Button>
									<Button size="md" themeType="primary">

										<div className={styles.accept}>

											<IcMTick width={25} height={22} />
											<span className={styles.acc_content}>Approve</span>

										</div>

									</Button>
								</div>
							) : (
								<div className={styles.edit_del}>
									<IcMWasteScrap />

									<Button size="md" themeType="secondary" className={styles.del}>
										<IcMEdit className={styles.edit_icon} />
										<span className={styles.edit_text}>Edit</span>

									</Button>
								</div>
							) }
						</div>
					))}
				</div>
			) }
		</>
	);
}

export default LeaveCard;
