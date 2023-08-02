/* eslint-disable max-len */
import { Popover, Button, Input, Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMInfo, IcMSearchlight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import { ListDataProps } from '../../AccountPayables/commons/Interfaces';
import Filter from '../../commons/Filters';
import SegmentedControl from '../../commons/SegmentedControl';
import showOverflowingNumber from '../../commons/showOverflowingNumber';
import List from '../commons/List';
import {
	nonRecurringFilters,
	recurringFilters,
} from '../Controls/nonRecurringFilters';

import AddExpenseModal from './AddExpenseModal';
import CreateExpenseModal from './CreateExpenseModal';
import ViewRecurringSummery from './CreateExpenseModal/ViewRecurringSummery';
import useListExpense from './hooks/useListExpense';
import useListExpenseConfig from './hooks/useListExpenseConfig';
import useSendEmail from './hooks/useSendEmail';
import ShowMore from './ShowMore';
import styles from './styles.module.css';
import {
	expenseRecurringConfig,
	expenseNonRecurringConfig,
} from './utils/config';
import WarningModal from './WarningModal';

const DEFAULT_COUNT = 1;

interface ItemDataInterface {
	expensePeriod?: string;
	recurringAmount?: number | string;
	grandTotal?: number;
	paidAmount?: number;
	dueDate?: Date;
	billDate?: Date;
	createdDate?: Date;
	status?: string;
	approvedByUser?: { id?: string | number; name?: string };
	billNumber?: string | number;
	billDocumentUrl?: string;
	startDate?: Date;
	endDate?: Date;
	maxPayoutAllowed?: number;
	currency?: string;
	updatedAt?: Date;
	proofDocuments?: string[];
	createdAt?: Date;
	category?: string;
	billCurrency?: string;
	approvedByName?: string;
	payableTds?: number;
	incidentId?: string;
	categoryName?: string;
}

const MIN_AMOUNT = 0;

function ExpenseComponent() {
	const [recurringState, setRecurringState] = useState('recurring');
	const [createExpenseType, setCreateExpenseType] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const [showExpenseModal, setShowExpenseModal] = useState(false);
	const [rowData, setRowData] = useState({});
	const [expenseFilters, setExpenseFilters] = useState({
		expenseType     : recurringState,
		expenseCategory : null,
		searchValue     : '',
		pageIndex       : 1,
		pageSize        : 10,
	});
	const [sort, setSort] = useState({
		invoiceAmountSortType : null,
		tdsSortType           : null,
		payableSortType       : null,
		paidAmountSortType    : null,
		createdDateSortBy     : null,
		amountSortBy          : null,
	});

	const geo = getGeoConstants();

	const { getList, listData, listLoading } = useListExpense({
		expenseFilters,
		sort,
	});
	const { getRecurringList, recurringListData, recurringListLoading } =		useListExpenseConfig({ expenseFilters, sort });
	const { sendMail, loading: mailLoading } = useSendEmail();

	useEffect(() => {
		if (recurringState === 'nonRecurring') {
			getList();
		}
		if (recurringState === 'recurring') {
			getRecurringList();
		}
	}, [getList, recurringState, expenseFilters, getRecurringList]);

	useEffect(() => {
		setExpenseFilters((p) => ({
			...p,
			expenseCategory : null,
			branch          : null,
			repeatsEvery    : null,
			searchValue     : '',
			pageIndex       : 1,
		}));
	}, [recurringState]);

	const OPTIONS = [
		{
			label : 'Recurring',
			value : 'recurring',
		},
		{
			label : 'Non-Recurring',
			value : 'nonRecurring',
		},
	];

	const handleChange = (e: string) => {
		setExpenseFilters((previousState) => ({
			...previousState,
			searchValue: e,
		}));
	};

	const handleAddExpense = (itemData: object) => {
		setShowExpenseModal(true);
		setRowData(itemData);
	};

	const BUTTON_TEXT = {
		recurring    : 'Create Expense Record',
		nonRecurring : 'Create Expense',
	};

	const renderHeaders = () => (
		<div className={styles.header_container}>
			<div className={styles.left_container}>
				{recurringState === 'nonRecurring' && (
					<Filter
						controls={nonRecurringFilters}
						filters={expenseFilters}
						setFilters={setExpenseFilters}
					/>
				)}
				{recurringState === 'recurring' && (
					<Filter
						controls={recurringFilters}
						filters={expenseFilters}
						setFilters={setExpenseFilters}
					/>
				)}
			</div>
			<div className={styles.right_container}>
				<div className={styles.input_container}>
					<Input
						size="md"
						placeholder={`Search by Vendor Name/${geo.others.identification_number.label}/Organization ID/Sage ID`}
						suffix={<IcMSearchlight />}
						value={expenseFilters.searchValue}
						onChange={(e: any) => handleChange(e)}
						className={styles.search}
					/>
				</div>
				<div>
					<Button
						size="lg"
						themeType="secondary"
						onClick={() => {
							setCreateExpenseType(recurringState);
							setShowModal(true);
						}}
						className={styles.cta_button}
					>
						{BUTTON_TEXT[recurringState]}
					</Button>
				</div>
			</div>
		</div>
	);

	const functions = {
		addExpense: (itemData: ItemDataInterface) => (
			<Button
				themeType="secondary"
				disabled={itemData?.status !== 'ACCEPTED'}
				size="md"
				style={{ border: '1px solid #E0E0E0' }}
				onClick={() => handleAddExpense(itemData)}
			>
				Add Expense
			</Button>
		),
		renderCategory: (itemData: ItemDataInterface) => {
			const { categoryName = '', category = '' } = itemData || {};
			return (
				<div style={{ fontSize: '14px' }}>
					{startCase(categoryName || category)}
				</div>
			);
		},
		renderExpensePeriod: (itemData: ItemDataInterface) => {
			const { startDate, endDate } = itemData || {};
			let difference: string = '';
			if (startDate && endDate) {
				const date1 = new Date(startDate);
				const date2 = new Date(endDate);
				const timeDifference = date2.getTime() - date1.getTime();
				const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
				const monthDifference = Math.floor(daysDifference / 30);
				if (Number(monthDifference) < 1) {
					difference = `${daysDifference} days`;
				} else {
					difference = `${monthDifference} months`;
				}
			}

			if (startDate && endDate) {
				return (
					<div className={styles.data_container}>
						<div>
							<div>
								{formatDate({
									date       : startDate,
									formatType : 'date',
									dateFormat:
										GLOBAL_CONSTANTS.formats.date[
											'dd MMM yyyy'
										],
								})}
								-
							</div>
							<div style={{ display: 'flex' }}>
								<div>
									{formatDate({
										date       : endDate,
										formatType : 'date',
										dateFormat:
											GLOBAL_CONSTANTS.formats.date[
												'dd MMM yyyy'
											],
									})}
								</div>
								<Tooltip content={`Duration: ${difference} `}>
									<div style={{ margin: '0px 4px' }}>
										<IcMInfo />
									</div>
								</Tooltip>
							</div>
						</div>
					</div>
				);
			}
			return <div>-</div>;
		},
		renderRecurringAmount: (itemData: ItemDataInterface) => {
			const { maxPayoutAllowed, currency = '' } = itemData || {};
			return (
				<div className={styles.data_container}>
					<div className={styles.recurring_amount_data}>
						<div>
							{formatAmount({
								amount  : maxPayoutAllowed as any,
								currency,
								options : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							}) || '-'}
						</div>
					</div>
					{/* <Tooltip content="Due on xth every month">
						<div><IcMInfo /></div>
					</Tooltip> */}
				</div>
			);
		},
		renderLedgerAmount: (itemData) => {
			const {
				ledgerMaxPayoutAllowed,
				ledgerCurrency = '',
				ledgerTotal,
			} = itemData || {};
			return (
				<div className={styles.data_container}>
					<div className={styles.recurring_amount_data}>
						<div>
							{formatAmount({
								amount   : ledgerTotal || ledgerMaxPayoutAllowed,
								currency : ledgerCurrency,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							}) || '-'}
						</div>
					</div>
				</div>
			);
		},
		getPayable: (itemData: ItemDataInterface) => {
			const {
				grandTotal,
				paidAmount,
				billCurrency = '',
			} = itemData || {};
			const value = grandTotal - paidAmount;

			const amount = formatAmount({
				amount   : value as any,
				currency : billCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			});
			return (
				<div>
					{grandTotal >= MIN_AMOUNT && paidAmount >= MIN_AMOUNT
						? amount
						: '-'}
				</div>
			);
		},
		getInvoiceDates: (itemData: ItemDataInterface) => {
			const { dueDate, billDate, createdDate } = itemData || {};
			return (
				<div style={{ fontSize: '10px' }}>
					{dueDate && billDate && createdDate && (
						<div>
							<div>
								Due Date:
								{' '}
								{formatDate({
									date       : dueDate,
									formatType : 'date',
									dateFormat:
										GLOBAL_CONSTANTS.formats.date[
											'dd MMM yyyy'
										],
								})}
							</div>
							<div>
								Invoice Date:
								{' '}
								{formatDate({
									date       : billDate,
									formatType : 'date',
									dateFormat:
										GLOBAL_CONSTANTS.formats.date[
											'dd MMM yyyy'
										],
								})}
							</div>
							<div>
								Upload Date:
								{' '}
								{formatDate({
									date       : createdDate,
									formatType : 'date',
									dateFormat:
										GLOBAL_CONSTANTS.formats.date[
											'dd MMM yyyy'
										],
								})}
							</div>
						</div>
					)}
				</div>
			);
		},
		getApprovedByRecurring: (itemData: ItemDataInterface) => {
			const { updatedAt, status, approvedByName } = itemData || {};
			return (
				<div>
					{!['LOCKED', 'INITIATED']?.includes(status) ? (
						<div style={{ fontSize: '12px' }}>
							<div>{approvedByName}</div>
							<div>
								{formatDate({
									date       : updatedAt,
									formatType : 'date',
									dateFormat:
										GLOBAL_CONSTANTS.formats.date[
											'dd MMM yyyy'
										],
								})}
							</div>
						</div>
					) : (
						<>
							<div className={styles.pending_approval}>
								Pending Approval
							</div>
							<div className={styles.link}>
								<Button
									style={{
										background : 'none',
										color      : mailLoading
											? '#b0b0b0'
											: '#F68B21',
										fontSize : '11px',
										padding  : '0px 4px',
									}}
									disabled={mailLoading}
									onClick={() => {
										sendMail({
											incidentId: itemData?.incidentId,
										});
									}}
								>
									Re-send Email
								</Button>
							</div>
						</>
					)}
				</div>
			);
		},
		showAgreement: (itemData: ItemDataInterface) => {
			const { proofDocuments = [] } = itemData || {};
			const proofCount = proofDocuments.length;
			if (proofCount === 1) {
				return (
					<a
						href={proofDocuments[GLOBAL_CONSTANTS.zeroth_index]}
						target="_blank"
						className={styles.proof}
						rel="noreferrer"
					>
						1 Document
					</a>
				);
			}
			const showDocuments = () => (
				<div>
					{proofDocuments.map((proof: string) => (
						<div key={proof}>
							{proof && (
								<a
									href={proof}
									className={styles.multiple_proof}
									target="_blank"
									rel="noreferrer"
								>
									{proof}
								</a>
							)}
						</div>
					))}
				</div>
			);
			return (
				<div>
					<div>
						<Popover placement="top" render={showDocuments()}>
							<div className={styles.multiple_proof}>
								{proofCount}
								{' '}
								Documents
							</div>
						</Popover>
					</div>
				</div>
			);
		},
		getCreatedOn: (itemData: ItemDataInterface) => {
			const { createdAt } = itemData || {};
			return (
				<div>
					{createdAt
						? formatDate({
							date       : createdAt,
							formatType : 'date',
							dateFormat:
									GLOBAL_CONSTANTS.formats.date[
										'dd MMM yyyy'
									],
						})
						: '-'}
				</div>
			);
		},
		getInvoiceNumber: (itemData: ItemDataInterface) => {
			const { billNumber, billDocumentUrl = '' } = itemData || {};
			return (
				<div>
					{billNumber ? (
						<div className={styles.link}>
							<a
								href={billDocumentUrl}
								target="_blank"
								rel="noreferrer"
								style={{ color: '#F68B21' }}
							>
								{showOverflowingNumber(billNumber, 12)}
							</a>
						</div>
					) : (
						'-'
					)}
				</div>
			);
		},
		renderInvoiceAmount: (itemData: ItemDataInterface) => {
			const { grandTotal, billCurrency = '' } = itemData || {};
			const amount = formatAmount({
				amount   : grandTotal as any,
				currency : billCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			});
			return <div>{showOverflowingNumber(amount || '', 12)}</div>;
		},
		renderTds: (itemData: ItemDataInterface) => {
			const { payableTds, billCurrency = '' } = itemData || {};
			const amount = formatAmount({
				amount   : payableTds as any,
				currency : billCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			});
			return <div>{showOverflowingNumber(amount || '', 12)}</div>;
		},
		renderPaid: (itemData: ItemDataInterface) => {
			const { paidAmount, billCurrency = '' } = itemData || {};
			const amount = formatAmount({
				amount   : paidAmount as any,
				currency : billCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			});
			return <div>{showOverflowingNumber(amount || '', 12)}</div>;
		},
		renderView: (itemData) => (
			<div>
				<ViewRecurringSummery
					itemData={itemData}
					recurringState={recurringState}
				/>
			</div>
		),
	};

	const showDropDown = (singleItem: { id?: string; incidentId?: string }) => {
		const { id, incidentId } = singleItem || {};

		if (recurringState === 'recurring') {
			return (
				<ShowMore
					id={id}
					showExpenseModal={showExpenseModal}
					incidentId={incidentId}
				/>
			);
		}
		return null;
	};

	let listConfig: any;
	let listItemData: ListDataProps;
	let loading: boolean;

	if (recurringState === 'recurring') {
		listConfig = expenseRecurringConfig;
		listItemData = recurringListData;
		loading = false;
	} else if (recurringState === 'nonRecurring') {
		listConfig = expenseNonRecurringConfig;
		listItemData = listData;
		loading = listLoading;
	}

	return (
		<div className={styles.expense_container}>
			<div className={styles.segmented_control}>
				<SegmentedControl
					options={OPTIONS}
					activeTab={recurringState}
					setActiveTab={setRecurringState}
					color="#ED3726"
					background="#FFFAEB"
				/>
			</div>
			<div className={styles.styled_div}>
				{renderHeaders()}
				<List
					config={listConfig()}
					itemData={listItemData}
					loading={loading || recurringListLoading}
					functions={functions}
					sort={sort}
					setSort={setSort}
					page={expenseFilters.pageIndex || DEFAULT_COUNT}
					pageSize={expenseFilters.pageSize}
					handlePageChange={(pageValue: number) => {
						setExpenseFilters((p) => ({
							...p,
							pageIndex: pageValue,
						}));
					}}
					showPagination
					renderDropdown={showDropDown}
					showRibbon
				/>
			</div>

			{showModal && (
				<CreateExpenseModal
					setShowModal={setShowModal}
					showModal={showModal}
					createExpenseType={createExpenseType}
					getList={getList}
					getRecurringList={getRecurringList}
					setShowWarning={setShowWarning}
				/>
			)}

			{showExpenseModal && (
				<AddExpenseModal
					showExpenseModal={showExpenseModal}
					setShowExpenseModal={setShowExpenseModal}
					rowData={rowData}
					setShowWarning={setShowWarning}
				/>
			)}

			{showWarning && (
				<WarningModal
					setShowModal={setShowModal}
					setShowExpenseModal={setShowExpenseModal}
					showWarning={showWarning}
					setShowWarning={setShowWarning}
				/>
			)}
		</div>
	);
}

export default ExpenseComponent;
