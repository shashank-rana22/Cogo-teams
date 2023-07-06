import { Breadcrumb, Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import React, { useImperativeHandle, forwardRef } from 'react';

import Filter from '../../../../commons/Filters/index.tsx';
import List from '../../../../commons/List/index.tsx';
import { invoiceFilters } from '../../configurations';
import useGetPayrunInvoices from '../../hooks/useGetPayrunInvoices';
import { RenderAction } from '../../InvoiceTable/RenderFunctions/RenderAction';
import { RenderInvoiceDates } from '../../InvoiceTable/RenderFunctions/RenderInvoiceDates';
import { RenderToolTip } from '../../InvoiceTable/RenderFunctions/RenderToolTip';
import { RenderUrgency } from '../../InvoiceTable/RenderFunctions/RenderUrgency';
import FilterModal from '../../MoreFilters';
import { CREATE_PAYRUN_CONFIG } from '../Configurations/createPayrunConfig';

import BankDetails from './EditableBankDetails/BankDetails';
import EditableTdsInput from './EditableInput';
import EditablePayableAmount from './EditableInput/EditablePayableAmount';
import styles from './styles.module.css';

const FIRST_PAGE = 1;

const MIN_AMOUNT = 0;

const ELEMENT_NOT_FOUND = -1;

const HUNDERED_PERCENT = 100;

const TEN_PERCENT = 10;

function SelectInvoices({ apiData, setApiData }, ref) {
	const {
		billsLoading,
		filters,
		setFilters,
		orderBy,
		setOrderBy,
		getPayrunInvoices,
		getTableBodyCheckbox,
		getTableHeaderCheckbox,
	} = useGetPayrunInvoices({ apiData, setApiData });

	const setEditedValue = (itemData, value, key, checked = false) => {
		setApiData((p) => {
			const newValue = { ...p };
			const index = newValue?.list?.findIndex(
				(item) => item?.id === itemData?.id,
			);
			const {
				payableValue,
				invoiceAmount,
				tdsDeducted,
				payableAmount,
				tdsAmount,
			} = newValue.list[index];
			const checkAmount = (+invoiceAmount * TEN_PERCENT) / HUNDERED_PERCENT;

			let maxValueCrossed = false;
			let lessValueCrossed = false;
			let lessTdsValueCrossed = false;
			let maxTdsValueCrossed = false;

			if (key === 'payableAmount') {
				maxValueCrossed = +value > +payableValue;
				lessValueCrossed = Number.parseInt(value, 10) <= MIN_AMOUNT;
				maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
				lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
			} else if (key === 'tdsAmount') {
				maxValueCrossed = +payableAmount > +payableValue;
				lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
				maxTdsValueCrossed = +value + +tdsDeducted > +checkAmount;
				lessTdsValueCrossed = Number.parseInt(value, 10) < MIN_AMOUNT;
			} else {
				maxValueCrossed = +payableAmount > +payableValue;
				lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
				maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
				lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
			}

			const isError = lessTdsValueCrossed || maxTdsValueCrossed || lessValueCrossed || maxValueCrossed;

			if (index !== ELEMENT_NOT_FOUND) {
				newValue.list[index] = {
					...itemData,
					hasError: isError,
					checked,
				};
				newValue.list[index][key] = value;
			}
			return newValue;
		});
	};

	useImperativeHandle(ref, () => ({
		getPayrunInvoices,
	}));

	const FUNCTIONS = {
		renderCheckbox : (itemData) => getTableBodyCheckbox(itemData),
		renderToolTip  : (itemData, field) => (
			<RenderToolTip itemData={itemData} field={field} />
		),
		renderInvoiceDates: (itemData, field) => (
			<RenderInvoiceDates itemData={itemData} field={field} />
		),
		renderUrgencyTag: (itemData, field) => (
			<RenderUrgency itemData={itemData} field={field} />
		),
		renderAction: (itemData) => (
			<RenderAction itemData={itemData} />
		),
		renderEditableTds: (itemData, field) => (
			<EditableTdsInput itemData={itemData} field={field} setEditedValue={setEditedValue} />
		),
		renderEditablePayable: (itemData, field) => (
			<EditablePayableAmount
				itemData={itemData}
				field={field}
				setEditedValue={setEditedValue}
			/>
		),
		renderBankDetails: (itemData, field) => (<BankDetails itemData={itemData} field={field} />),
	};

	return (
		<div>
			<div>
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
			</div>
			<div className={styles.filters}>
				<div className={styles.filtercontainer}>
					<Filter controls={invoiceFilters} filters={filters} setFilters={setFilters} />
					<FilterModal filters={filters} setFilters={setFilters} filterLength={5} />
				</div>
				<div className={styles.search_filter}>
					<div className={styles.search}>
						<Input
							name="search"
							size="sm"
							value={filters?.search || ''}
							onChange={(val) => setFilters((p) => ({ ...p, search: val, pageIndex: 1 }))}
							placeholder="Search By Name/Invoice Number/Sid"
							suffix={(
								<div style={{ margin: '4px', display: 'flex' }}>
									<IcMSearchdark height={15} width={15} />
								</div>
							)}
						/>
					</div>
				</div>
			</div>
			<div className={styles.list_container}>
				<List
					itemData={apiData}
					loading={billsLoading}
					config={CREATE_PAYRUN_CONFIG}
					functions={FUNCTIONS}
					sort={orderBy}
					setSort={setOrderBy}
					page={filters?.pageIndex || FIRST_PAGE}
					pageSize={10}
					handlePageChange={(val) => setFilters({
						...filters,
						pageIndex: val,
					})}
					renderHeaderCheckbox={getTableHeaderCheckbox}
					rowStyle="border"
					showPagination
					paginationType="number"
				/>
			</div>
		</div>
	);
}

export default forwardRef(SelectInvoices);
