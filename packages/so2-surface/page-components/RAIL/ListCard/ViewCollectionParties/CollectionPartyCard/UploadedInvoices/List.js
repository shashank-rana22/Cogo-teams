import { Button, Pill, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const MAX_ROWS = 2;
const DEFAULT_BANK_DETAIL_INDEX = 0;

const PURCHASE_TYPE_LIST = [
	{
		label : 'Purchase',
		value : 'purchase_invoice',
	},
	{
		label : 'Proforma',
		value : 'proforma_invoice',
	},
	{
		label : 'CN',
		value : 'credit_note',
	},
	{
		label : 'Reimbursement',
		value : 'reimbursement',
	},
];

function List({ data, limit }) {
	const handleLineItemsMapping = (services) => {
		const SERVICE_LINE_ITEM_MAPPING = {};
		(services?.mappings || []).forEach((item) => {
			(item?.buy_line_items || []).forEach((lineItem) => {
				SERVICE_LINE_ITEM_MAPPING[lineItem?.service_type] = !isEmpty(
					SERVICE_LINE_ITEM_MAPPING[lineItem?.service_type],
				)
					? [...SERVICE_LINE_ITEM_MAPPING[lineItem?.service_type], lineItem?.code]
					: [lineItem?.code];
			});
		});

		const servicesKeys = Object.keys(SERVICE_LINE_ITEM_MAPPING);

		return (
			<Tooltip
				theme="light"
				interactive
				content={(servicesKeys || []).map((item) => (
					<div key={item}>
						{startCase(item)}
						{' '}
						-
						{SERVICE_LINE_ITEM_MAPPING[item]?.join(', ')}
					</div>
				))}
			>
				<div className={styles.service_types}>
					{(servicesKeys || []).map((item) => (
						<span key={item}>
							{startCase(item)}
							{' '}
							-
							{SERVICE_LINE_ITEM_MAPPING[item]?.join(', ')}
						</span>
					))}
				</div>
			</Tooltip>
		);
	};

	const purchaseType = (item) => {
		const label = PURCHASE_TYPE_LIST.find((val) => val?.value === item?.invoice_type)?.label;
		const displayType = label || 'Purchase';

		if (item?.status === 'init') return `${displayType} Uploaded`;
		if (item?.status === 'coe_approved' && item?.utr_nos?.length) { return `${displayType} Payment Processed`; }
		if (item?.status === 'coe_approved') { return `${displayType} Pending For Payment`; }

		return `${displayType} ${startCase(item?.status)}`;
	};
	return (
		<div className={styles.table}>
			{(data || []).map((item, index) => {
				if (limit && index > MAX_ROWS) {
					return null;
				}

				return (
					<div key={data?.id} className={styles.row}>
						<div
							className={styles.column}
							style={{
								width: '15%',
							}}
						>
							<Tooltip
								content={item?.invoice_no}
							>
								<a
									href={item?.invoice_url}
									target="_blank"
									rel="noreferrer"
									className={styles.invoice_url}
								>
									{item?.invoice_no}
								</a>
							</Tooltip>
						</div>
						<div className={styles.column} style={{ width: '20%' }}>
							{handleLineItemsMapping(item)}
						</div>
						<div className={styles.column} style={{ width: '20%' }}>
							<Tooltip
								content={(
									<div>
										<span>{item?.bank_details?.[DEFAULT_BANK_DETAIL_INDEX]?.bank_name}</span>
										{' - A/C '}
										<span>
											{item?.bank_details?.[DEFAULT_BANK_DETAIL_INDEX]?.bank_account_number}
										</span>
									</div>
								)}
							>
								<div className={styles.bank_details}>
									<span>{item?.bank_details?.[DEFAULT_BANK_DETAIL_INDEX]?.bank_name}</span>
									{' - A/C '}
									<span>{item?.bank_details?.[DEFAULT_BANK_DETAIL_INDEX]?.bank_account_number}</span>
								</div>
							</Tooltip>
						</div>
						<div className={styles.column} style={{ width: '15%' }}>
							<Tooltip
								content={(
									<div>
										Invoice Total :
										{' '}
										{formatAmount({
											amount   : item?.invoice_total,
											currency : item?.invoice_currency,
											options  : {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : 2,
											},
										})}

									</div>
								)}
							>
								<div>
									Invoice Total :
									{' '}
									{formatAmount({
										amount   : item?.invoice_total,
										currency : item?.invoice_currency,
										options  : {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 2,
										},
									})}

								</div>
							</Tooltip>

						</div>
						<div className={styles.column} style={{ width: '10%' }}>
							<Button themeType="linkUi">View Detail</Button>
						</div>
						<div className={styles.column} style={{ width: '20%' }}>
							{item?.status === 'coe_rejected' ? (
								<Tooltip
									content={<p>{(item.remarks || []).join(' , ')}</p>}
								>
									<Pill>{purchaseType(item)}</Pill>
								</Tooltip>
							) : (
								<Pill>{purchaseType(item)}</Pill>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default List;
