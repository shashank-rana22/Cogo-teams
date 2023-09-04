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

const PAGE_LIMIT = 10;

function PurchaseList() {
	const { paymentActiveTab } = useContext(CostBookingDeskContext);
	const [searchValue, setSearchValue] = useState('');
	const { loading, data, pagination, setPagination } = useListPurchaseAdvanceDocument(searchValue);
	const { list = [], totalRecords } = data || {};

	const [viewRequestModal, setViewRequestModal] = useState({});
	const [viewRefundModal, setViewRefundModal] = useState({});
	const [updateRefundModal, setUpdateRefundModal] = useState({});

	const columns = getColumns({ paymentActiveTab, setViewRequestModal, setViewRefundModal, setUpdateRefundModal });

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
					<div className={styles.footer}>
						<Pagination
							type="table"
							currentPage={pagination}
							totalItems={totalRecords}
							pageSize={PAGE_LIMIT}
							onPageChange={setPagination}
						/>
					</div>
				</div>
			)}

			{!isEmpty(viewRequestModal) ? (
				<ViewRequestModal
					viewRequestModal={viewRequestModal}
					setViewRequestModal={setViewRequestModal}
				/>
			) : null}

			{!isEmpty(viewRefundModal) ? (
				<ViewRefundModal
					viewRefundModal={viewRefundModal}
					setViewRefundModal={setViewRefundModal}
				/>
			) : null}

			{!isEmpty(updateRefundModal) ? (
				<UpdateRefundModal
					updateRefundModal={updateRefundModal}
					setUpdateRefundModal={setUpdateRefundModal}
				/>
			) : null}
		</div>
	);
}

export default PurchaseList;
