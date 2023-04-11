import { Pagination, Input, MultiSelect } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import StyledTable from '../../../../commons/styledTable';
import PaymentList from '../../../../configs/Payment_Table';
import { UTILIZATION_STATUS } from '../../../../constants';
import useGetPaymentTable from '../../../../hooks/useGetPaymentTable';

import styles from './styles.module.css';

interface Props {
	organizationId: string,
	entityCode?: string
}

function PaymentTable({ organizationId,	entityCode }: Props) {
	const {
		paymentList,
		paymentLoading,
		paymentFilters,
		setPaymentFilters,
		orderBy,
		setOrderBy,
	} = useGetPaymentTable(organizationId, entityCode);

	const { list = [], pageNo, totalRecords } = paymentList || {};

	const onChange = (val:string, name:string) => {
		setPaymentFilters((p) => ({ ...p, [name]: val }));
	};

	const onChangeStatus = (val:string[], name:string) => {
		setPaymentFilters((p) => ({ ...p, [name]: val }));
	};

	const sortStyleAsc = orderBy.sortType === 'Asc' ? '#303B67' : '#BDBDBD';

	const sortStyleDesc = orderBy.sortType === 'Desc' ? '#303B67' : '#BDBDBD';

	return (
		<div>
			<div className={styles.filter_wrap}>
				<MultiSelect
					placeholder="Select Status"
					value={paymentFilters.statusList}
					onChange={(val:string[]) => onChangeStatus(val, 'statusList')}
					options={UTILIZATION_STATUS}
					style={{ width: 200, marginRight: '16px' }}
				/>
				<Input
					className="primary md"
					placeholder="Search by Payment Number"
					value={paymentFilters.query}
					onChange={(val:string) => onChange(val, 'query')}
					prefix={(
						<IcMSearchdark />
					)}
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
