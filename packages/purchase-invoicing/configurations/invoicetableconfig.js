import { Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInformation } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import getFormattedAmount from '../common/helpers/formatAmount';
import RenderLink from '../common/RenderLink';
import { PURCHASE_TYPE_LIST } from '../constants';

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
				const SERVICE_LINE_ITEMS_MAPPING = {};
				(services?.mappings || []).forEach((item) => {
					(item?.buy_line_items || []).map((lineItem) => {
						SERVICE_LINE_ITEMS_MAPPING[lineItem?.service_type] = !isEmpty(
							SERVICE_LINE_ITEMS_MAPPING[lineItem?.service_type],
						)
							? [...SERVICE_LINE_ITEMS_MAPPING[lineItem?.service_type], lineItem?.code]
							: [lineItem?.code];

						return SERVICE_LINE_ITEMS_MAPPING;
					});
				});

				const servicesKeys = Object.keys(SERVICE_LINE_ITEMS_MAPPING);

				return (
					<Tooltip
						theme="light"
						interactive
						content={(servicesKeys || []).map((item) => (
							<div className={styles.servicetooltip} key={item}>
								{startCase(item)}
								{' '}
								-
								{SERVICE_LINE_ITEMS_MAPPING[item]?.join(', ')}
							</div>
						))}
					>
						<div className={styles.flex}>
							<span className={styles.servicemappings}>
								{(servicesKeys || []).map((item) => (
									<span className={styles.marginright} key={item}>
										{startCase(item)}
										{' '}
										-
										{SERVICE_LINE_ITEMS_MAPPING[item]?.join(', ')}
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
			const bankName = row?.bank_details?.[GLOBAL_CONSTANTS.zeroth_index]?.bank_name || '';
			const accountNumber = row?.bank_details?.[GLOBAL_CONSTANTS.zeroth_index]?.bank_account_number || '';
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
		Header   : 'UTR',
		accessor : ({ utr_nos = [] }) => (
			<Tooltip
				theme="light"
				interactive
				content={(utr_nos || []).map((number) => (
					<ul key={number}>
						<li>{number}</li>
					</ul>
				))}
			>
				<div className={styles.utr}>{utr_nos?.[GLOBAL_CONSTANTS.zeroth_index]}</div>
			</Tooltip>
		),
		id: 'utr',
	},
	{
		Header   : 'Status',
		accessor : (row) => {
			const purchaseType = (item) => {
				let displayType = 'Purchase';
				PURCHASE_TYPE_LIST.forEach((val) => {
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
							content={<p>{(row?.remarks || []).join(' , ')}</p>}
						>
							<Pill size="sm" color="#FEF1DF">
								{purchaseType(row)}
								<IcMInformation color="red" className={styles.icon} height={10} width={10} />
							</Pill>
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
