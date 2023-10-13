import { Tooltip, Pill, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMInformation } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import getFormattedAmount from '../common/helpers/formatAmount';
import RenderLink from '../common/RenderLink';
import { PURCHASE_TYPE_LIST } from '../constants';

import styles from './styles.module.css';

export const invoiceconfig = ({ utrData = [], utrLoading = false }) => [
	{
		Header   : 'Invoice No.',
		accessor : (row) => <RenderLink text={row?.invoice_no} url={row?.invoice_url || row?.invoice_url} />,
		id       : 'invoice_no',
	},
	{
		Header   : 'Services - Line Item',
		accessor : (row) => {
			function HandleLineItemsMapping({ services = {} }) {
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
			}

			return <div className={styles.value}><HandleLineItemsMapping services={row} /></div>;
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
		accessor : ({ utr_nos = [], finance_job_number }) => {
			const utrDetailsBills = utrData.filter((utr) => (utr?.billId === finance_job_number));

			return (
				utrLoading ? <Placeholder /> : (
					<Tooltip
						theme="light"
						interactive
						placement="left"
						content={(
							<div className={styles.contentutr}>
								{!isEmpty(utrDetailsBills) ? (utrDetailsBills || []).map(({
									transactionRef, createdAt, billId,
								}) => (
									<div key={billId} className={styles.singleutr}>
										<div className={styles.utrval}>{transactionRef}</div>
										{utrDetailsBills?.[GLOBAL_CONSTANTS.zeroth_index]?.createdAt
											? formatDate({
												date       : createdAt,
												dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
												formatType : 'date',
											}) : '-'}
									</div>

								)) : (utr_nos || []).map((number) => (
									<div
										key={number}
										className={styles.utrval}
									>
										{number}
									</div>
								))}
							</div>
						)}
					>
						<div className={styles.utr}>
							{utrDetailsBills?.[GLOBAL_CONSTANTS.zeroth_index]?.transactionRef
								|| utr_nos?.[GLOBAL_CONSTANTS.zeroth_index]}
						</div>
						<div className={styles.utr}>
							{utrDetailsBills?.[GLOBAL_CONSTANTS.zeroth_index]?.createdAt
								? formatDate({
									date       : utrDetailsBills?.[GLOBAL_CONSTANTS.zeroth_index]?.createdAt,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								}) : '-'}
						</div>
					</Tooltip>
				)
			);
		},
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
					{row?.status === 'coe_rejected' ? (
						<Tooltip
							theme="light"
							interactive
							content={(
								<p>
									{' '}
									{(row?.remarks || []).filter((item) => (item !== ''))?.join(' , ')}
								</p>
							)}
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
