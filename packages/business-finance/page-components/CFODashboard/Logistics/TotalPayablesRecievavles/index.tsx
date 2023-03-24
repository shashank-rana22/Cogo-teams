import { Legend, ProgressBar, cl, Popover } from '@cogoport/components';
import { IcMInfo, IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import SegmentedControl from '../../../commons/SegmentedControl/index';
import totalPayablesStats from '../../constants/total-payables';
import totalPayablesReceivablesKeyMappings from '../../constants/total-payables-receivables-key-mapping';
import totalRecievablesStats from '../../constants/total-recievales';
import styles from '../styles.module.css';

function TotalPayablesRecievables({
	payablesTab,
	setPayablesTab,
	recievablesTab,
	setRecievablesTab,
}) {
	const [progress, setProgress] = useState('20');

	const items = [
		{ label: 'Current', color: 'orange', key: 'current' },
		{ label: 'Overdue', color: '#88CAD1', key: 'overdue' },
	];

	return (
		<div>
			<div className={cl`${styles.space_between} ${styles.legend} ${styles.progress_bar}`}>
				<div className={styles.service_stats}>
					<div className={styles.main}>
						<div className={styles.text_filters_gap}>
							<div className={styles.text_style}>
								Total Recievables
								<div className={styles.border} />
							</div>
							<div className={styles.icon}>
								<IcMInfo />
							</div>
						</div>
						<div className={styles.segment_filters}>
							<SegmentedControl
								options={totalRecievablesStats()}
								activeTab={recievablesTab}
								setActiveTab={setRecievablesTab}
								color="#ED3726"
								background="#FFFAEB"
							/>
						</div>
					</div>
					<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
						<Legend hasBackground={false} direction="horizontal" items={items} size="lg" />
						<div style={{ margin: '20px 40% 0px 0px' }} />
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between', width: '76%' }}>
						<span style={{ marginLeft: '60px', fontSize: '16px', fontWeight: '500' }}>INR 20,00,000</span>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<span style={{ marginLeft: '60px', fontSize: '16px', fontWeight: '500' }}>
								INR 20,00,000
							</span>
							<Popover
								placement="bottom"
								trigger="click"
								caret={false}
								render={(totalPayablesReceivablesKeyMappings || []).map((val) => (
									<div>
										<div className={styles.label}>{val.label}</div>
									</div>
								))}
							>
								<IcMArrowRotateDown style={{ margin: '0px 20px' }} />
							</Popover>

						</div>
					</div>
					<div className={styles.borders} />
					<ProgressBar progress={progress} />
					<div className={styles.texts}>Total Unpaid invoices</div>
				</div>

				<div className={styles.service_stats}>
					<div className={styles.main}>
						<div className={styles.text_filters_gap}>
							<div className={styles.text_style}>
								Total Payables
								<div className={styles.border} />
							</div>
							<div className={styles.icon}>
								<IcMInfo />
							</div>
						</div>
						<div className={styles.segment_filters}>
							<SegmentedControl
								options={totalPayablesStats()}
								activeTab={payablesTab}
								setActiveTab={setPayablesTab}
								color="#ED3726"
								background="#FFFAEB"
							/>
						</div>
					</div>
					<Legend hasBackground={false} direction="horizontal" items={items} size="lg" />
					<span style={{ marginLeft: '60px', fontSize: '16px', fontWeight: '500' }}>INR 20,00,000</span>
					<div className={styles.borders} />
					<ProgressBar progress={progress} />
					<div className={styles.texts}>Total Unpaid invoices</div>
				</div>
			</div>
		</div>
	);
}

export default TotalPayablesRecievables;
