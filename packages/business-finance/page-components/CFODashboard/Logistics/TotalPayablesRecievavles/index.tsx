import { Legend, ProgressBar, cl, Popover } from '@cogoport/components';
import { IcMInfo, IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import SegmentedControl from '../../../commons/SegmentedControl/index';
import getFormattedPrice from '../../../commons/utils/getFormattedPrice';
import totalPayablesKeyMappings from '../../constants/total-payables-key-mapping';
import totalReceivablesKeyMappings from '../../constants/total-receivables-key-mapping';
import totalRecievablesStats from '../../constants/total-recievales';
import useGetPayablesList from '../../hooks/getPayablesData';
import useGetReceivablesList from '../../hooks/getReceivablesData';
import styles from '../styles.module.css';

function TotalPayablesRecievables() {
	const {
		receivablesData,
		recievablesTab,
		setRecievablesTab,
	} = useGetReceivablesList();

	const { payablesData } = useGetPayablesList();
	const { overdueAmount = 0, nonOverdueAmount = 0, notPaidDocumentCount = 0 } = receivablesData || {};
	const {
		overdueAmount:payOverdueAmount = 0, nonOverdueAmount:payNonOverdueAmount = 0,
		notPaidDocumentCount:payNotPaidDocumentCount = 0,
	} = payablesData || {};

	const progressData = overdueAmount + nonOverdueAmount;
	const progressPayableData = payOverdueAmount + payNonOverdueAmount;

	const [progress, setProgress] = useState({
		receiavablesProgress : null,
		payablesProgress     : null,
	});

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
								Total Receivable
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
						<span style={{ marginLeft: '60px', fontSize: '16px', fontWeight: '500' }}>
							{getFormattedPrice(nonOverdueAmount, 'INR')}

						</span>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<span style={{ marginLeft: '60px', fontSize: '16px', fontWeight: '500' }}>
								{getFormattedPrice(overdueAmount, 'INR')}
							</span>
							<Popover
								placement="bottom"
								trigger="click"
								caret={false}
								render={(totalReceivablesKeyMappings({ receivablesData }) || []).map((val) => (
									<div className={styles.receivables_data}>
										<div className={styles.recei_label}>{val.label}</div>
										<div className={styles.label}>{val.valueKey}</div>
									</div>
								))}
							>
								<IcMArrowRotateDown style={{ margin: '0px 20px' }} />
							</Popover>

						</div>
					</div>
					<div className={styles.borders} />
					<ProgressBar progress={progress} />
					<div style={{ display: 'flex' }}>
						<div className={styles.texts}>Total Unpaid invoices:</div>
						<div style={{ marginLeft: '20px' }}>
							{getFormattedPrice(Math.abs(progressData), 'INR')}
							<span style={{ marginLeft: '5px' }}>
								(
								{notPaidDocumentCount}
								)
							</span>
						</div>
					</div>
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
					</div>

					<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
						<Legend hasBackground={false} direction="horizontal" items={items} size="lg" />
						<div style={{ margin: '20px 40% 0px 0px' }} />
					</div>

					<div style={{ display: 'flex', justifyContent: 'space-between', width: '76%' }}>
						<span style={{ marginLeft: '60px', fontSize: '16px', fontWeight: '500' }}>
							{getFormattedPrice(Math.abs(payNonOverdueAmount), 'INR')}

						</span>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<span style={{ marginLeft: '60px', fontSize: '16px', fontWeight: '500' }}>
								{getFormattedPrice(Math.abs(payOverdueAmount), 'INR')}
							</span>
							<Popover
								placement="bottom"
								trigger="click"
								caret={false}
								render={(totalPayablesKeyMappings({ payablesData }) || []).map((val) => (
									<div className={styles.receivables_data}>
										<div className={styles.recei_label}>{val.label}</div>
										<div className={styles.label}>{val.valueKey}</div>
									</div>
								))}
							>
								<IcMArrowRotateDown style={{ margin: '0px 20px' }} />
							</Popover>

						</div>
					</div>
					<div className={styles.borders} />
					<ProgressBar progress={progress} />
					<div style={{ display: 'flex' }}>
						<div className={styles.texts}>Total Unpaid invoices:</div>
						<div style={{ marginLeft: '20px' }}>
							{' '}
							{getFormattedPrice(Math.abs(progressPayableData), 'INR')}
							<span style={{ marginLeft: '5px' }}>
								(
								{payNotPaidDocumentCount}
								)
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TotalPayablesRecievables;
