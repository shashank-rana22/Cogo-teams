/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-key */
import { Button } from '@cogoport/components';
import { IcMArrowUp, IcMPlus, IcMCross, IcMTick, IcMWasteScrap, IcMEdit, IcMArrowDown }
	from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function LeaveCard({ isManager, data }) {
	const { leaveData, pendingCount, requestType } = data;
	const [accordion, setAccordion] = useState(false);
	return (
		<>
			<div className={styles.leaveReqHeading} onClick={() => setAccordion(!accordion)}>
				<div>
					<div className={styles.headingSp1}>{requestType}</div>
					<div className={styles.headingSp2}>
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
						<div className={styles.parentDiv}>
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
										<div className={styles.leaveDetails}>
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
								<div className={styles.yesNo}>
									<Button size="md" themeType="secondary">
										<div className={styles.reject}>

											<IcMCross width={16} height={22} />
											<span className={styles.rejContent}>Reject</span>

										</div>

									</Button>
									<Button size="md" themeType="primary">

										<div className={styles.accept}>

											<IcMTick width={25} height={22} />
											<span className={styles.accContent}>Approve</span>

										</div>

									</Button>
								</div>
							) : (
								<div className={styles.editDel}>
									<IcMWasteScrap />

									<Button size="md" themeType="secondary" className={styles.del}>
										<IcMEdit className={styles.editIcon} />
										<span className={styles.editText}>Edit</span>

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
