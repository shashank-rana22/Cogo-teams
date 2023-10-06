import { Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcCFtick } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';

import useGetBillTimeline from '../../../hook/useGetBillTimeline';
import useGetInvoiceTimeline from '../../../hook/useGetinvoiceTimeline';

import BuySellStatusContent from './BuySellStatusContent';
import styles from './styles.module.css';

const ZERO_VALUE = 0;
export default function Timeline({
	loading = false,
	data = {},
	getClosedTasks = () => {},
	operationCardOpen = {},
	setOperationCardOpen = () => {},
	financeCardOpen = {},
	setFinanceCardOpen = () => {},
	type = '',
	source = '',
}) {
	const { grand_total: income = '', profitability = '', id = '', document_id = '' } = data || {};

	const key = `${upperCase(type)}_${id}`;
	const isOpen = source === 'OPR' ? operationCardOpen?.[key] : financeCardOpen?.[key];

	const {
		data: timeLineData = {},
		loading: timeLineLoading = false, getInvoiceDetailsApi = () => {},
	} = useGetInvoiceTimeline({ id: document_id });

	const {
		data: billTimeLineData = [],
		loading: billTimeLineLoading = false, getBillTimeLine = () => {},
	} = useGetBillTimeline({ id: document_id });

	const callTimeLineApi = (currentState) => {
		if (source === 'OPR') {
			if (currentState === 'closed') {
				if (type === 'buy') {
					getBillTimeLine();
				} else {
					getInvoiceDetailsApi();
				}
			}
			setOperationCardOpen((prev) => ({ ...prev, [key]: !(prev?.[key]) }));
		} else {
			if (currentState === 'closed') {
				if (type === 'buy') {
					getBillTimeLine();
				} else {
					getInvoiceDetailsApi();
				}
			}
			setFinanceCardOpen((prev) => ({ ...prev, [key]: !(prev?.[key]) }));
		}
	};

	return (
		<div className={styles.custom_accordion}>
			{loading ? <Placeholder /> : (
				<div>
					<div className={styles.accord_title}>
						<div className={styles.status}>
							<div className={styles.accordion_title}>
								{type === 'buy' ? 'Bill' : 'Invoice'}
							</div>

							{data?.quotation_state === 'APPROVED' ? <IcCFtick /> : null}
						</div>

						<div className={`${isOpen ? styles.nothing : styles.other_title}`}>
							<div className={styles.regular}>{type === 'buy' ? 'Expense: ' : 'Income: '}</div>
							<div>
								{formatAmount({
									amount   : income,
									currency : 'INR',
									options  : {
										currencyDisplay : 'code',
										style           : 'currency',
									},
								})}
							</div>
						</div>
						<div className={`${isOpen ? styles.nothing : styles.other_title}`}>
							<div className={styles.regular}>Profitability :</div>
							<div className={`${profitability > ZERO_VALUE ? styles.green : styles.red}`}>
								{profitability}
							</div>
						</div>
						{isOpen ? (
							<IcMArrowRotateUp
								style={{ cursor: 'pointer' }}
								onClick={() => callTimeLineApi('open')}
							/>
						)
							: (
								<IcMArrowRotateDown
									style={{ cursor: 'pointer' }}
									onClick={() => callTimeLineApi('closed')}
								/>
							)}
					</div>
					<div className={`${!isOpen ? styles.nothing : styles.content}`}>
						<BuySellStatusContent
							data={data}
							loading={type === 'sell' ? timeLineLoading : billTimeLineLoading}
							timeLineData={type === 'sell' ? timeLineData?.timelineDetail : billTimeLineData}
							getClosedTasks={getClosedTasks}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
