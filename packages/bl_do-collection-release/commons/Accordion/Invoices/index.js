// import CardList from '@cogo/bookings/commons/CardList';
// import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { cl, ToolTip } from '@cogoport/components';
import { IcMArrowUp, IcMArrowDown, IcMDocument } from '@cogoport/icons-react';

import PendingKnockOff from '../PendingKnockOff';

import styles from './styles.module.css';
import tableColumn from './tableColumn';

export default function Invoices({
	item = {},
	accordionOpen = false,
	handleAccordionOpen = () => {},
	tasks = [],
	refetchList = () => {},
	getShipmentPendingTask = () => {},
	taskLoading = false,
}) {
	const list_of_invoices = (item?.invoice_data || []).filter(
		(inv) => inv.status !== 'init',
	);
	const renderPart = (list_of_invoices || []).slice(0, 3);
	const invoiceLength = list_of_invoices.length;
	const remainLength = invoiceLength > 3 ? invoiceLength - 3 : 0;

	const invoiceHover = (invoice) => (
		<div className={styles.invoice_hover_container}>
			<div className={cl`${styles.text} ${styles.bold}`}>{invoice?.invoice_no}</div>

			<div className={cl`${styles.invoice_hover_container} ${styles.row}`}>
				<div className={cl`${styles.text}`}>
					<div className={cl`${styles.text}`}>UTR</div>
					<div className={cl`${styles.text} ${styles.bold - colored}`}>{invoice?.utr_nos}</div>
				</div>

				<div className={cl`${styles.text} ${styles.margin - left}`}>
					<div className={cl`${styles.text}`}>AMOUNT</div>
					<div className={cl`${styles.text} ${styles.bold - colored}`}>
						{/* {formatAmount({
							amount   : invoice?.inr_invoice_total,
							currency : invoice?.invoice_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})} */}
						Ammount comes here
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
					refetchForTask={refetchList}
					getShipmentPendingTask={getShipmentPendingTask}
					taskLoading={taskLoading}
				/>
			);
		}

		if (item?.trade_type === 'export') {
			return (
				<div className={styles.list_container}>
					{/* <CardList fields={tableColumn()} data={list_of_invoices} /> */}
					<div>Card list here</div>
				</div>
			);
		}

		return null;
	};

	return (
		<>
			<div className={styles.container} item={item}>
				{item?.trade_type === 'export' ? (
					<div className={styles.invoice_container}>
						<IcMDocument fill="#393f70" height={20} width={20} />

						<div className={styles.invoice_container}>
							<div className={cl`${styles.text} ${styles.invoice - faded}`}>INVOICE(S): </div>

							{renderPart.map((invoice, i) => (
								<ToolTip
									animation="shift-away"
									theme="light-border"
									content={invoiceHover(invoice)}
								>
									<div className={cl`${styles.text} ${styles.invoice - hover}`}>
										{invoice?.invoice_no}
										{i < renderPart?.length - 1 ? ', ' : ' '}
									</div>
								</ToolTip>
							))}
						</div>

						{remainLength ? (
							<div className={styles.more_invoices}>
								+
								{remainLength}
								{' '}
								MORE
							</div>
						) : null}
					</div>
				) : null}

				<div className={styles.action_container} onClick={handleAccordionOpen}>
					{accordionOpen ? 'Hide' : 'View'}
					{' '}
					Details
					{accordionOpen ? (
						<IcMArrowUp style={{ marginLeft: 4 }} />
					) : (
						<IcMArrowDown style={{ marginLeft: 4 }} />
					)}
				</div>
			</div>

			{accordionOpen ? renderAccordion() : null}
		</>
	);
}
