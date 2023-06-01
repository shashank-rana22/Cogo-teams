import { Pill, TabPanel, Tabs, Tooltip } from '@cogoport/components';
import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { format } from '@cogoport/utils';
import startCase from '@cogoport/utils/src/utilities/startCase';
import { useEffect, useState, CSSProperties } from 'react';

import List from '../../../commons/List';
import showOverflowingNumber from '../../../commons/showOverflowingNumber';
import InvoiceDetails from '../../commons/invoiceDetails';
import Remarks from '../../commons/Remarks';
import RenderIRNGenerated from '../../commons/RenderIRNGenerated';
import ShipmentView from '../../configs/ShipmentView';
import useGetDefaulters from '../../hooks/useGetDefaulters';
import { getDocumentNumber, getDocumentUrl } from '../../Utils/getDocumentNumber';

import { invoiceListConfig } from './config/listConfig';
import DefaultersFilters from './DefaultersFilters';
import styles from './styles.module.css';

const invoiceType = {
	REIMBURSEMENT : '#FEF1DF',
	CREDIT_NOTE   : '#D9EAFD',
	INVOICE       : '#CDF7D4',
};

const statusMapping = {
	UNPAID           : '#FEF1DF',
	'PARTIALLY PAID' : '#D9EAFD',
	PAID             : '#CDF7D4',
};

const invoiceStatusMapping = {
	DRAFT            : '#fcedbf',
	POSTED           : '#a1f0ae',
	FINANCE_ACCEPTED : '#CDF7D4',
	CONSOLIDATED     : '#D9EAFD',
	IRN_GENERATED    : '#b8debe',
	IRN_FAILED       : '#F89880',
	FAILED           : '#f9b498',
	IRN_CANCELLED    : '#fbc5b0',
	FINANCE_REJECTED : '#f9ac98',
};

interface GlobalInterface {
	page?:number,
	type?:string,
	migrated?:boolean | string,
	pageIndex?:number,
	pageLimit?:number,
	cogoEntity?: string,
	invoiceStatus?: string,
	status?: string,
	services?: string[] | string,
	invoiceDate?: { startDate?: string, endDate?: string },
	dueDate?: { startDate?: string, endDate?: string },
	currency?: string,
	zone?:string,
}

function Defaulters() {
	const [globalFilters, setGlobalFilters] = useState<GlobalInterface>({
		pageIndex : 1,
		pageLimit : 10,
	});
	const [isClear, setIsClear] = useState(true);
	const [activeTab, setActiveTab] = useState('overall');
	const [sort, setSort] = useState({});
	const {
		invoiceData,
		invoiceListLoading,
		refetch,
		sendReport,
	} = useGetDefaulters({ globalFilters, activeTab, sort });

	useEffect(() => {
		const {
			migrated, cogoEntity, invoiceStatus, status, services, invoiceDate, dueDate, currency,
		} = globalFilters || {};

		const isFilterApplied = String(migrated)?.length > 0 || cogoEntity?.length > 0
		|| invoiceStatus?.length > 0 || status.length > 0 || services?.length > 0
		|| invoiceDate?.startDate?.length > 0 || invoiceDate?.endDate?.length > 0 || dueDate?.startDate?.length > 0
		|| dueDate?.endDate?.length > 0 || currency?.length > 0;

		if (isFilterApplied) {
			setIsClear(false);
		} else {
			setIsClear(true);
		}
	}, [globalFilters, isClear]);

	const clearFilters = () => {
		setGlobalFilters({
			page      : 1,
			type      : 'overall',
			pageLimit : 10,
		});

		setIsClear(true);
		// refetch();
	};

	const functions = {
		showOrgName       : ({ organizationName }) => (<div>{showOverflowingNumber(organizationName || '-', 10)}</div>),
		showInvoiceNumber : (row) => (
			<div className={styles.fieldPair}>
				{(getDocumentNumber({ itemData: row }) as string)?.length > 10 ? (
					<Tooltip
						interactive
						placement="top"
						content={(
							<div className={styles.tool_tip}>
								{getDocumentNumber({ itemData: row }) as string}
							</div>
						)}
					>
						<text
							className={styles.link}
							onClick={() => window.open(getDocumentUrl({ itemData: row }) as string, '_blank')}
							role="presentation"
						>
							{`${(getDocumentNumber({ itemData: row }) as string).substring(
								0,
								10,
							)}...`}
						</text>
					</Tooltip>
				)
					: (
						<div
							className={styles.link}
							onClick={() => window.open(getDocumentUrl({ itemData: row }) as string, '_blank')}
							role="presentation"
						>
							{getDocumentNumber({ itemData: row }) as string}
						</div>
					)}
				<div>
					<Pill size="sm" color={invoiceType[(row?.invoiceType as string)]}>

						{row?.eInvoicePdfUrl ? 'E INVOICE' : startCase(row?.invoiceType)}

					</Pill>
				</div>
			</div>
		),
		showSid: (row) => (
			<ShipmentView row={row} />
		),
		showInvoiceAmount: (row) => (
			<div className={styles.fieldPair}>
				<div>
					<div>
						{getPrice(
							row?.invoiceAmount,
							row?.invoiceCurrency,
						)}

					</div>
				</div>

				<div
					className={styles.styled_pills}
					style={{
						'--color': statusMapping[row?.status],
					} as CSSProperties}
				>

					{startCase(row?.status)?.length > 10 ? (
						<Tooltip
							interactive
							placement="top"
							content={(
								<div className={styles.tool_tip}>
									{startCase(row?.status)}
								</div>
							)}
						>
							<text className={styles.style_text}>
								{`${startCase(row?.status).substring(
									0,
									10,
								)}...`}
							</text>
						</Tooltip>
					)
						: (
							<div className={styles.style_text}>
								{startCase(row?.status)}
							</div>
						)}
				</div>

			</div>
		),
		showLedgerAmount: (row) => (
			<div>
				<div>
					{getPrice(
						row?.ledgerAmount,
						row?.ledgerCurrency,
					)}

				</div>
			</div>
		),
		showBalanceAmount: (row) => (
			<div>
				<div>
					{getPrice(
						row?.balanceAmount,
						row?.invoiceCurrency,
					)}

				</div>
			</div>
		),
		showInvoiceDate: (row) => (
			<div>
				<div>{format(row?.invoiceDate, 'dd MMM yy', {}, false)}</div>
			</div>
		),
		showDueDate: (row) => (
			<div>
				<div>{format(row?.dueDate, 'dd MMM yy', {}, false)}</div>
			</div>
		),
		showProformaStatus: (row) => (

			<div
				className={styles.styled_pills}
				style={{
					'--color': invoiceStatusMapping[row?.invoiceStatus],
				} as CSSProperties}
			>
				{row?.isFinalPosted ? <text className={styles.style_text}>FINAL POSTED</text> : (
					<div>
						{startCase(row?.invoiceStatus).length > 10 ? (
							<Tooltip
								interactive
								placement="top"
								content={(
									<div
										className={styles.tool_tip}
									>
										{row?.eInvoicePdfUrl
											? 'E INVOICE GENERATED'
											: startCase(row?.invoiceStatus)}

									</div>
								)}
							>
								<text className={styles.style_text}>
									{row?.eInvoicePdfUrl
										? `${'E INVOICE GENERATED'.substring(
											0,
											10,
										)}...`
										: `${startCase(row?.invoiceStatus).substring(
											0,
											10,
										)}...`}

								</text>
							</Tooltip>
						)
							: (
								<div className={styles.style_text}>
									{startCase(row?.invoiceStatus)}
								</div>
							)}
					</div>
				)}
			</div>

		),
		showActions: (row) => (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Remarks itemData={row} />
				<InvoiceDetails
					item={row}
				/>
				<RenderIRNGenerated
					itemData={row}
					refetch={refetch}
				/>
			</div>
		),
	};

	return (
		<div>
			<DefaultersFilters
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}
				isClear={isClear}
				clearFilters={clearFilters}
			/>

			<div className={styles.toggle_header}>
				<div>
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						<TabPanel
							name="overall"
							title="Overall"
							badge={invoiceData?.totalRecords}
						/>
					</Tabs>

				</div>

				<div className={styles.toggle_right}>
					<div>
						<div
							className={styles.send_report}
							onClick={() => { sendReport(); }}
							role="presentation"
						>
							Send Report
						</div>
					</div>

				</div>
			</div>

			{activeTab === 'overall' && (
				<List
					config={invoiceListConfig()}
					itemData={invoiceData}
					loading={invoiceListLoading}
					functions={functions}
					sort={sort}
					setSort={setSort}
					page={globalFilters.pageIndex || 1}
					pageSize={globalFilters.pageLimit || 10}
					handlePageChange={(pageValue:number) => {
						setGlobalFilters((p) => ({ ...p, pageIndex: pageValue }));
					}}
					showPagination
				/>
			)}

		</div>
	);
}

export default Defaulters;
