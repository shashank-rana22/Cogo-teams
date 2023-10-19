import { Pagination, Input, MultiSelect, cl } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import StyledTable from '../../../../../commons/styledTable';
import invoicePaymentList from '../../../../../configs/Payment_Table';
import { UTILIZATION_STATUS } from '../../../../../constants';
import useGetPaymentTable from '../../../../../hooks/useGetPaymentTable';

import styles from './styles.module.css';

const STATUS_FILTER_MAX_LEN = 3;
function PaymentTable({ organizationId = '', entityCode = '' }) {
	const {
		paymentList,
		paymentLoading,
		paymentFilters,
		setPaymentFilters,
		orderBy,
		setOrderBy,
	} = useGetPaymentTable(organizationId, entityCode);

	const { list = [], pageNo, totalRecords } = paymentList || {};

	const onChange = (val, name) => {
		setPaymentFilters((p) => ({ ...p, [name]: val }));
	};

	const onChangeStatus = (val, name) => {
		setPaymentFilters((p) => ({ ...p, [name]: val }));
	};

	const sortStyleAsc = orderBy.sortType === 'Asc' ? '#303B67' : '#BDBDBD';

	const sortStyleDesc = orderBy.sortType === 'Desc' ? '#303B67' : '#BDBDBD';

	const tableColumns = invoicePaymentList({
		paymentFilters,
		setPaymentFilters,
		setOrderBy,
		sortStyleAsc,
		sortStyleDesc,
	});

	const filterTableColumns = tableColumns.filter((item) => entityCode !== '501' || item.id !== 'sageRefNumber');
	return (
		<div>
			<div className={cl`
				${styles.filter_wrap} 
				${(paymentFilters?.statusList?.length === STATUS_FILTER_MAX_LEN) && styles.empty} 
			`}
			>
				<MultiSelect
					placeholder="Select Status"
					value={paymentFilters.statusList}
					onChange={(val) => onChangeStatus(val, 'statusList')}
					options={UTILIZATION_STATUS}
					style={{ width: 200, marginRight: '16px' }}
				/>
				<Input
					className="primary md"
					placeholder="Search by Payment Number / Sage Reference Number"
					value={paymentFilters.query}
					onChange={(val) => onChange(val, 'query')}
					prefix={(
						<IcMSearchdark />
					)}
					style={{ width: 400 }}
				/>
			</div>

			<StyledTable
				data={list}
				columns={filterTableColumns}
				loading={paymentLoading}
			/>

			{totalRecords >= paymentFilters.pageLimit
				? (
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={pageNo}
							totalItems={totalRecords}
							pageSize={paymentFilters.pageLimit}
							onPageChange={(val) => setPaymentFilters({ ...paymentFilters, page: val })}
						/>
					</div>
				)
				: null}
		</div>
	);
}

export default PaymentTable;
