import { cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowUp, IcMArrowDown, IcMDocument } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { v4 as uuid } from 'uuid';

import getTableFormatedData from '../../../helpers/getTableFormatedData';
import useGetBill from '../../../hooks/useGetBill';
import ClickableDiv from '../../ClickableDiv';
import PendingKnockOff from '../PendingKnockOff';

import ExportInvoices from './ExportInvoices';
import styles from './styles.module.css';
import { columns } from './tableColumn';

const MINIMUM_INVOICES = 3;
const MINIMUM_TOOLTIP_DISPLAY_VALUE = 1;

const TRADE_TYPE_COMPONENT_MAPPING = {
	import : PendingKnockOff,
	export : ExportInvoices,
};

function InvoiceHover({ invoice = {} }) {
	return (
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
							currency : invoice?.invoice_currency || 'INR',
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
}

function RenderAccordion({
	item = {},
	tasks = [],
	handleAccordionOpen = () => {},
	refetch = () => {},
	getShipmentPendingTask = () => {},
	taskLoading = false,
	tableData = [],
}) {
	const propsMapping = {
		import: {
			item,
			tasks,
			handleAccordionOpen,
			refetchList: refetch,
			getShipmentPendingTask,
			taskLoading,
		},

		export: {
			columns,
			tableData,
		},
	};

	const props = propsMapping[item?.trade_type];

	const Component = !isEmpty(item?.trade_type)
		? TRADE_TYPE_COMPONENT_MAPPING[item?.trade_type]
		: null;

	if (!Component) return null;

	return <Component key={item?.id} {...props} />;
}

export default function Invoices({
	item = {},
	accordionOpen = false,
	handleAccordionOpen = () => {},
	tasks = [],
	refetch = () => {},
	getShipmentPendingTask = () => {},
	taskLoading = false,
}) {
	const list_of_invoices = (item?.invoice_data || []).filter(
		(inv) => inv.status !== 'init',
	);
	const { data } = useGetBill({ serial_id: item?.serial_id, accordionOpen });
	const tableData = getTableFormatedData({ list_of_invoices, data });

	const renderPart = (list_of_invoices || []).slice(GLOBAL_CONSTANTS.zeroth_index, MINIMUM_INVOICES);
	const invoiceLength = list_of_invoices.length;
	const remainLength = invoiceLength > MINIMUM_INVOICES ? invoiceLength - MINIMUM_INVOICES
		: GLOBAL_CONSTANTS.zeroth_index;

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
								content={<InvoiceHover invoice={invoice} />}
								className={styles.tooltip}
								caret={false}
								key={uuid()}
							>
								<div className={cl`${styles.text} ${styles.invoice_hover}`}>
									{invoice?.invoice_no}
									{i < renderPart.length - MINIMUM_TOOLTIP_DISPLAY_VALUE ? ', ' : ' '}
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

			{accordionOpen ? (
				<RenderAccordion
					item={item}
					tasks={tasks}
					handleAccordionOpen={handleAccordionOpen}
					refetch={refetch}
					getShipmentPendingTask={getShipmentPendingTask}
					taskLoading={taskLoading}
					tableData={tableData}
				/>
			) : null}
		</>
	);
}
