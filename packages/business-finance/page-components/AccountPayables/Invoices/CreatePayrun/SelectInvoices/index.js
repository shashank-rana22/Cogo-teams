import { Breadcrumb, Input, Toggle } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import React, { useImperativeHandle, forwardRef } from 'react';

import Filter from '../../../../commons/Filters/index';
import List from '../../../../commons/List/index';
import { invoiceFilters } from '../../configurations';
import useGetPayrunInvoices from '../../hooks/useGetPayrunInvoices';
import FilterModal from '../../MoreFilters';

import getFunctions from './getFunctions';
import { GetTableHeaderCheckbox, onChangeTableBodyCheckbox } from './InvoicesCheckbox';
import styles from './styles.module.css';

const FIRST_PAGE = 1;
const MIN_AMOUNT = 0;
const ELEMENT_NOT_FOUND = -1;
const HUNDERED_PERCENT = 100;
const TEN_PERCENT = 10;

const updateApiData = ({
	prevApiData = {}, itemData = {}, key = '', value = '',
	checked = false, index = 0, errorStatus = '',
}) => {
	const newValue = { ...prevApiData };

	if (index !== ELEMENT_NOT_FOUND) {
		newValue.list[index] = {
			...itemData,
			hasError: errorStatus.maxValueCrossed || errorStatus.lessValueCrossed
			|| errorStatus.maxTdsValueCrossed || errorStatus.lessTdsValueCrossed,
			checked,
		};
		newValue.list[index][key] = value;

		if (key === 'tdsAmount' && index >= MIN_AMOUNT) {
			newValue.list[index].payableAmount = (newValue?.list?.[index]?.invoiceAmount || MIN_AMOUNT) - value
				- (newValue?.list?.[index]?.paidAmount || MIN_AMOUNT);
			newValue.list[index].inputAmount = (newValue?.list?.[index]?.invoiceAmount || MIN_AMOUNT) - value
				- (newValue?.list?.[index]?.paidAmount || MIN_AMOUNT);
		}
	}
	return newValue;
};

const calculateErrorStatus = ({
	key = '', value = 0, payableValue = 0, invoiceAmount = 0,
	tdsDeducted = 0, payableAmount = 0, tdsAmount = 0,
}) => {
	const checkAmount = (+invoiceAmount * TEN_PERCENT) / HUNDERED_PERCENT;
	let maxValueCrossed = false;
	let lessValueCrossed = false;
	let lessTdsValueCrossed = false;
	let maxTdsValueCrossed = false;

	if (key === 'inputAmount') {
		maxValueCrossed = +value > +payableAmount;
		lessValueCrossed = Number.parseInt(value, 10) <= MIN_AMOUNT;
		maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
		lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
	} else if (key === 'tdsAmount') {
		maxTdsValueCrossed = +value + +tdsDeducted > +checkAmount;
		lessTdsValueCrossed = Number.parseInt(value, 10) < MIN_AMOUNT;
	} else {
		maxValueCrossed = +payableAmount > +payableValue;
		lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
		maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
		lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
	}

	return { maxValueCrossed, lessValueCrossed, lessTdsValueCrossed, maxTdsValueCrossed };
};

function SelectInvoices({ apiData = {}, setApiData = () => {} }, ref) {
	const { query } = useRouter();
	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/account-payables/invoices/create-pay-run?
		payrun=${query.payrun}&currency=${query.currency}&entity=${query.entity}&payrun_type=${query.payrun_type}`;
	};

	const {
		billsLoading = false,
		filters = {},
		setFilters = () => {},
		orderBy = {},
		setOrderBy = () => {},
		getPayrunInvoices = () => {},
		config = [],
		data = {},
		loading = false,
	} = useGetPayrunInvoices({ apiData, setApiData });

	const renderHeaderCheckbox = () => GetTableHeaderCheckbox({ apiData, data, loading, setApiData });

	const setEditedValue = ({ itemData = {}, value = '', key = '', checked = false }) => {
		setApiData((prevApiData) => {
			const index = prevApiData?.list?.findIndex((item) => item?.id === itemData?.id);
			const {
				payableValue = 0,
				invoiceAmount = 0,
				tdsDeducted = 0,
				payableAmount = 0,
				tdsAmount = 0,
			} = prevApiData?.list[index] || {};
			const errorStatus = calculateErrorStatus({
				key,
				value,
				payableValue,
				invoiceAmount,
				tdsDeducted,
				payableAmount,
				tdsAmount,
			});
			const updatedData = updateApiData({ prevApiData, itemData, key, value, checked, index, errorStatus });
			return updatedData;
		});
	};

	useImperativeHandle(ref, () => ({
		getPayrunInvoices,
	}));

	const LIST_FUNCTIONS = getFunctions({ onChangeTableBodyCheckbox, setEditedValue, apiData, setApiData });

	return (
		<div>
			<div className={styles.breadcrumb}>
				<Breadcrumb>
					<Breadcrumb.Item label={(
						<Link href="/business-finance/account-payables/invoices">
							Invoices
						</Link>
					)}
					/>
					<Breadcrumb.Item label="PayRun Creation" />
					<Breadcrumb.Item label="Select Invoices" />
				</Breadcrumb>

				<Toggle
					name="toggle"
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleVersionChange}
				/>
			</div>

			<div className={styles.filters}>
				<div className={styles.filtercontainer}>
					<Filter controls={invoiceFilters} filters={filters} setFilters={setFilters} />
					<FilterModal filters={filters} setFilters={setFilters} filterLength={5} />
				</div>

				<div className={styles.search_filter}>
					<Input
						name="search"
						size="sm"
						value={filters?.search || ''}
						onChange={(val) => setFilters((prevFilters) => ({
							...prevFilters,
							search    : val,
							pageIndex : 1,
						}))}
						placeholder="Search By Name/Invoice Number/Sid"
						suffix={(
							<div style={{ margin: '4px', display: 'flex' }}>
								<IcMSearchdark height={15} width={15} />
							</div>
						)}
					/>
				</div>
			</div>

			<div className={styles.list_container}>
				<List
					itemData={apiData}
					loading={billsLoading}
					config={config}
					functions={LIST_FUNCTIONS}
					sort={orderBy}
					setSort={setOrderBy}
					page={filters?.pageIndex || FIRST_PAGE}
					pageSize={10}
					handlePageChange={(val) => setFilters({
						...filters,
						pageIndex: val,
					})}
					renderHeaderCheckbox={renderHeaderCheckbox}
					rowStyle="border"
					showPagination
					paginationType="number"
				/>
			</div>
		</div>
	);
}

export default forwardRef(SelectInvoices);
