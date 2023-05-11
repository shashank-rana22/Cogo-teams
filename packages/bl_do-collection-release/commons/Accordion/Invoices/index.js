import { cl, Tooltip, Table } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowUp, IcMArrowDown, IcMDocument } from '@cogoport/icons-react';
import { useState } from 'react';

import getTableFormatedData from '../../../helpers/getTableFormatedData';
import ClickableDiv from '../../ClickableDiv';
import PendingKnockOff from '../PendingKnockOff';

import styles from './styles.module.css';
import { columns } from './tableColumn';

export default function Invoices({
	item = {},
	accordionOpen = false,
	handleAccordionOpen = () => {},
	tasks = [],
	refetch = () => {},
	getShipmentPendingTask = () => {},
	taskLoading = false,
}) {
	const [knockoffTabs, setKnockoffTabs] = useState('invoice');
	const list_of_invoices = (item?.invoice_data || []).filter(
		(inv) => inv.status !== 'init',
	);
	const tableData = getTableFormatedData(list_of_invoices);

	const renderPart = (list_of_invoices || []).slice(0, 3);
	const invoiceLength = list_of_invoices.length;
	const remainLength = invoiceLength > 3 ? invoiceLength - 3 : 0;

	const invoiceHover = (invoice) => (
		<div className={styles.invoice_hover_container}>
			<div className={cl`${styles.text} ${styles.bold}`}>{invoice?.invoice_no}</div>

			<div className={cl`${styles.invoice_hover_container} ${styles.row}`}>
				<div className={cl`${styles.text}`}>
					<div className={cl`${styles.text}`}>UTR</div>
					<div className={cl`${styles.text} ${styles.bold_colored}`}>{invoice?.utr_nos}</div>
				</div>

				<div className={cl`${styles.text} ${styles.margin_left}`}>
					<div className={cl`${styles.text}`}>AMOUNT</div>
					<div className={cl`${styles.text} ${styles.bold_colored}`}>
						{formatAmount({
							amount   : invoice?.inr_invoice_total,
							currency : invoice?.invoice_currency || 'inr',
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
				</div>
			</div>
		</div>
	);

	const renderAccordion = () => {
		if (item?.trade_type === 'import') {
			return (
				<PendingKnockOff
					item={item}
					tasks={tasks}
					handleAccordionOpen={handleAccordionOpen}
					refetch={refetch}
					getShipmentPendingTask={getShipmentPendingTask}
					taskLoading={taskLoading}
					knockoffTabs={knockoffTabs}
					setKnockoffTabs={setKnockoffTabs}
				/>
			);
		}

		if (item?.trade_type === 'export') {
			return (
				<div className={styles.list_container}>
					<Table columns={columns} data={tableData} />
				</div>
			);
		}

		return null;
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.invoice_container}>
					<IcMDocument fill="#393f70" height={20} width={20} />

					<div className={styles.invoice_container}>
						<div className={cl`${styles.text} ${styles.invoice_faded}`}>INVOICE(S): </div>

						{renderPart.map((invoice, i) => (
							<Tooltip
								interactive
								content={invoiceHover(invoice)}
								className={styles.tooltip}
								caret={false}
							>
								<div className={cl`${styles.text} ${styles.invoice_hover}`}>
									{invoice?.invoice_no}
									{i < renderPart.length - 1 ? ', ' : ' '}
								</div>
							</Tooltip>
						))}

						{remainLength ? (
							<div className={styles.more_invoices}>
								+
								{remainLength}
								{' '}
								MORE
							</div>
						) : null}
					</div>

				</div>

				<div className={styles.action_container}>
					<ClickableDiv onClick={handleAccordionOpen}>
						{accordionOpen ? 'Hide' : 'View'}
						{' '}
						Details
						{accordionOpen ? (
							<IcMArrowUp style={{ marginLeft: 4 }} />
						) : (
							<IcMArrowDown style={{ marginLeft: 4 }} />
						)}
					</ClickableDiv>
				</div>
			</div>

			{accordionOpen ? renderAccordion() : null}
		</>
	);
}
