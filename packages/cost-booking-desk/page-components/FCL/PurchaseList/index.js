import { Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useContext } from 'react';

import EmptyState from '../../../common/EmptyState';
import Loader from '../../../common/Loader';
import CostBookingDeskContext from '../../../context/CostBookingDeskContext';
import useListPurchaseAdvanceDocument from '../../../hooks/useListPurchaseAdvanceDocument';

import getColumns from './getColumns';
import Header from './Header';
import styles from './styles.module.css';
import UpdateRefundModal from './UpdateRefundModal';
import ViewRefundModal from './ViewRefundModal';
import ViewRequestModal from './ViewRequestedModal';

const INIT_RECORDS = 0;
const INIT_PAGE = 1;
const PAGE_LIMIT = 10;

function PurchaseList() {
	const { paymentActiveTab } = useContext(CostBookingDeskContext);

	const [searchValue, setSearchValue] = useState('');
	const [modalData, setModalData] = useState({
		data : {},
		type : '',
	});

	const {
		loading = false,
		data = {},
		pagination = INIT_PAGE,
		setPagination = () => {},
	} = useListPurchaseAdvanceDocument({ searchValue });

	const { list = [], totalRecords = INIT_RECORDS } = data || {};

	const columns = getColumns({ paymentActiveTab, setModalData });

	return (
		<div>
			<Header
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			{loading ? <Loader /> : (
				<div className={styles.table_container}>
					<Table
						columns={columns}
						data={list}
					/>
					{isEmpty(list) ? <EmptyState /> : null}
					{totalRecords > PAGE_LIMIT ? (
						<div className={styles.footer}>
							<Pagination
								type="table"
								currentPage={pagination}
								totalItems={totalRecords}
								pageSize={PAGE_LIMIT}
								onPageChange={setPagination}
							/>
						</div>
					) : null}
				</div>
			)}

			{modalData?.type === 'viewDeposit' ? (
				<ViewRequestModal
					viewRequestModal={modalData}
					setViewRequestModal={setModalData}
				/>
			) : null}

			{modalData?.type === 'viewRefund' ? (
				<ViewRefundModal
					viewRefundModal={modalData}
					setViewRefundModal={setModalData}
				/>
			) : null}

			{modalData?.type === 'requestRefund' ? (
				<UpdateRefundModal
					updateRefundModal={modalData}
					setUpdateRefundModal={setModalData}
				/>
			) : null}
		</div>
	);
}

export default PurchaseList;
