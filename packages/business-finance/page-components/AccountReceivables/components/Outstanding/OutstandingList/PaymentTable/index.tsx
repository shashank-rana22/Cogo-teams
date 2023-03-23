import { Pagination, Input, MultiSelect } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import Filters from '../../../../../commons/Filters';
import StyledTable from '../../../../commons/styledTable';
import PaymentList from '../../../../configs/Payment_Table';
import { UTILIZATION_STATUS } from '../../../../constants';
import useGetPaymentTable from '../../../../hooks/useGetPaymentTable';

import styles from './styles.module.css';

function PaymentTable({ data }) {
	const { organizationId = '' } = data || {};

	const {
		paymentList,
		paymentLoading,
		refetch,
		paymentFilters,
		setPaymentFilters,
		orderBy,
		setOrderBy,
	} = useGetPaymentTable(organizationId);

	const { list = [], pageNo, totalRecords } = paymentList || {};

	console.log('paymentList', paymentList);

	const onChange = (val:string, name:string) => {
		setPaymentFilters((p) => ({ ...p, [name]: val }));
	};

	const sortStyleAsc = orderBy.sortType === 'Asc' ? '#303B67' : '#BDBDBD';

	const sortStyleDesc = orderBy.sortType === 'Desc' ? '#303B67' : '#BDBDBD';

	console.log('paymentFilters', paymentFilters);

	return (
		<div>
			<div className={styles.filter_wrap}>
				<MultiSelect
					placeholder="Select Status"
					value={paymentFilters.statusList}
					onChange={(val:string) => onChange(val, 'statusList')}
					options={UTILIZATION_STATUS}
					style={{ width: 200, marginRight: '16px' }}
				/>
				<Input
					className="primary md"
					placeholder="Search by Payment Number"
					value={paymentFilters.query}
					onChange={(val) => onChange(val, 'query')}
					prefix={<IcMSearchdark size={1.3} />}
					style={{ width: 300 }}
				/>
			</div>

			<StyledTable
				data={list}
				columns={PaymentList({
					paymentFilters,
					setPaymentFilters,
					setOrderBy,
					sortStyleAsc,
					sortStyleDesc,
				})}
				loading={paymentLoading}
			/>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={pageNo}
					totalItems={totalRecords}
					pageSize={paymentFilters.pageLimit}
					onPageChange={(val) => setPaymentFilters({ ...paymentFilters, page: val })}
				/>

			</div>
		</div>
	);
}

export default PaymentTable;
