import { Tooltip, Pill } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import getFormattedAmount from '../common/helpers/formatAmount';
import RenderLink from '../common/RenderLink';
import { purchaseTypeList } from '../constants';

import styles from './styles.module.css';

export const invoiceconfig = [
	{
		Header   : 'Invoice No.',
		accessor : (row) => <RenderLink text={row?.invoice_no} url={row?.invoice_url || row?.invoice_url} />,
		id       : 'invoice_no',
	},
	{
		Header   : 'Services - Line Item',
		accessor : (row) => {
			const handleLineItemsMapping = (services) => {
				const serviceLineitemMapping = {};
				(services?.mappings || []).forEach((item) => {
					(item?.buy_line_items || []).map((lineItem) => {
						serviceLineitemMapping[lineItem.service_type] = !isEmpty(
							serviceLineitemMapping[lineItem?.service_type],
						)
							? [...serviceLineitemMapping[lineItem?.service_type], lineItem?.code]
							: [lineItem?.code];

						return serviceLineitemMapping;
					});
				});

				const servicesKeys = Object.keys(serviceLineitemMapping);

				return (
					<Tooltip
						theme="light"
						interactive
						content={(servicesKeys || []).map((item) => (
							<div className={styles.servicetooltip} key={item}>
								{startCase(item)}
								{' '}
								-
								{serviceLineitemMapping[item]?.join(', ')}
							</div>
						))}
					>
						<div className={styles.flex}>
							<span className={styles.servicemappings}>
								{(servicesKeys || []).map((item) => (
									<span style={{ marginRight: '10px' }} key={item}>
										{startCase(item)}
										{' '}
										-
										{serviceLineitemMapping[item]?.join(', ')}
									</span>
								))}
							</span>
						</div>
					</Tooltip>
				);
			};

			return <div className={styles.value}>{handleLineItemsMapping(row)}</div>;
		},
		id: 'services_line_item',
	},
	{
		Header   : 'Collection Party',
		accessor : (row) => {
			const bankName = row?.bank_details?.[0]?.bank_name;
			const accountNumber = row?.bank_details?.[0]?.bank_account_number;
			return (
				<div className={styles.value}>
					<Tooltip
						theme="light"
						interactive
						content={`${bankName} - A/C ${accountNumber}`}
					>
						<div className={styles.flexcol}>
							{`${bankName} - A/C ${accountNumber}`}
						</div>
					</Tooltip>
				</div>
			);
		},
		id: 'collection_party',
	},
	{
		Header   : 'Invoice value',
		accessor : (row) => (
			<div className={styles.value}>
				<Tooltip
					theme="light"
					interactive
					content={getFormattedAmount(
						row?.invoice_total,
						row?.invoice_currency,
					)}
				>
					<div className={styles.flexcol}>
						{getFormattedAmount(
							row?.invoice_total,
							row?.invoice_currency,
						)}
					</div>
				</Tooltip>
			</div>
		),
		id: 'invoice_value',
	},
	{
		Header   : 'Status',
		accessor : (row) => {
			const purchaseType = (item) => {
				let displayType = 'Purchase';
				purchaseTypeList.forEach((val) => {
					if (val?.value === item?.invoice_type) {
						displayType = val?.label;
					}
				});

				if (item?.status === 'init') return `${displayType} Uploaded`;

				if (item?.status === 'coe_approved' && item?.utr_nos?.length) {
					return `${displayType} Payment Processed`;
				}
				if (item?.status === 'coe_approved') { return `${displayType} Pending For Payment`; }

				return `${displayType} ${startCase(item?.status)}`;
			};
			return (
				<div className={styles.value}>
					{ row?.status === 'coe_rejected' ? (
						<Tooltip
							theme="light"
							interactive
							content={<p>{(row.remarks || []).join(' , ')}</p>}
						>
							<Pill size="sm" color="#FEF1DF">{purchaseType(row)}</Pill>
						</Tooltip>
					) : (
						<Pill size="sm" color="#FEF1DF">{purchaseType(row)}</Pill>
					)}
				</div>
			);
		},
		id: 'status',
	},
];

export default invoiceconfig;
