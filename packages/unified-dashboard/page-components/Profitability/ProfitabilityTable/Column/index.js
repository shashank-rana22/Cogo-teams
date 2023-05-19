import { Tooltip, Tags } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

const importTag = {
	key      : '1',
	children : 'Import',
	color    : '#ded7fc',
	tooltip  : false,
};

const exportTag = {
	key      : '2',
	children : 'Export',
	color    : '#dfe1ef',
	tooltip  : false,
};

function columns() {
	const getAmount = (amt, currency) => formatAmount({
		amount  : amt,
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'symbol',
			notation              : 'compact',
			compactDisplay        : 'short',
			minimumFractionDigits : 2,
		},
	});

	return [
		{
			Header: (
				<div className={styles.head}>
					Serial Id
				</div>
			),
			accessor: (item) => (
				<div className={styles.head}>
					<div className={styles.serial_id}>{item.serial_id}</div>
					<div className={styles.created_at}>
						{format(item.created_at, 'dd MMM yyyy')}
					</div>
				</div>
			),
			id: 'serial_id',
		},
		{
			Header   : <div className={styles.head}>Customer Name</div>,
			accessor : (item) => (
				<Tooltip animation="shift-toward" content={item.customer_name}>
					<div className={styles.container}>
						<div className={styles.data}>{item.customer_name}</div>
						<Tags
							items={[item.trade_type === 'import' ? importTag : exportTag]}
							size="sm"
						/>
					</div>
				</Tooltip>
			),
			id: 'customer_name',
		},
		{
			Header: (
				<div className={styles.head}>
					ETD
				</div>
			),
			width    : 1,
			accessor : (item) => (
				<div className={styles.head}>
					{format(item.etd, 'dd MMM yyyy')}
				</div>
			),
			id: 'etd',
		},
		{
			Header: (
				<div className={styles.head}>
					ETA
				</div>
			),
			width    : 1,
			accessor : (item) => (
				<div className={styles.head}>
					{format(item.eta, 'dd MMM yyyy')}
				</div>
			),
			id: 'eta',
		},
		{
			Header   : <div className={styles.head}>Sale Quotation Amount </div>,
			width    : 1,
			accessor : (item) => (
				<div className={styles.head}>
					{getAmount(item.sale_quotation_amount || 0, item.currency)}
				</div>
			),
			id: 'shipping_line',
		},
		{
			Header   : <div className={styles.head}>Buy Quotation Amount</div>,
			width    : 1,
			accessor : (item) => (
				<div className={styles.head}>
					{getAmount(item.purchase_quotation_amount || 0, item.currency)}
				</div>
			),
			id: 'purchase_quotation_amount',
		},
		{
			Header   : <div className={styles.head}>Tentative Profitablity</div>,
			width    : 2,
			accessor : (item) => (
				<div className={styles.head}>{item.tentative_profitability || '0 %'}</div>
			),
			id: 'tentative_profitability',
		},
		{
			Header   : <div className={styles.head}>Actual Sale Amount</div>,
			width    : 2,
			accessor : (item) => (
				<div className={styles.head}>{getAmount(item.actual_sale_amount || 0, item.currency)}</div>
			),
			id: 'actual_sale_amount',
		},
		{
			Header   : <div className={styles.head}>Actual Purchase Amount</div>,
			width    : 1,
			accessor : (item) => (
				<div className={styles.head}>
					{getAmount(item.actual_purchase_amount || 0, item.currency)}
				</div>
			),
			id: 'actual_purchase_amount',
		},
		{
			Header   : <div className={styles.head}>Actual Profitablity</div>,
			width    : 2,
			accessor : (item) => <div className={styles.head}>{item.actual_profitability || '0 %'}</div>,
			id       : 'actual_profitability',
		},
		{
			Header   : <div className={styles.head}>Job Status</div>,
			width    : 2,
			accessor : (item) => <div className={styles.head}>{item.job_state || '-'}</div>,
			id       : 'job_status',
		},
	];
}

export default columns;
