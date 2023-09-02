import { Pagination, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import Loader from '../../../common/Loader';
import useListPurchaseAdvanceDocument from '../../../hooks/useListPurchaseAdvanceDocument';

import getColumns from './getColumns';
import Header from './Header';
import styles from './styles.module.css';
import ViewRefundModal from './ViewRefundModal';
import ViewRequestModal from './ViewRequestedModal';

const PAGE_LIMIT = 10;

function PurchaseList() {
	const [searchValue, setSearchValue] = useState('');
	const { loading, data, pagination, setPagination } = useListPurchaseAdvanceDocument(searchValue);
	const { list = [], totalRecords } = data || {};

	const [viewRequestModal, setViewRequestModal] = useState({});
	const [viewRefundModal, setViewRefundModal] = useState({});

	const columns = getColumns({ setViewRequestModal });

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
		</div>
	);
}

export default PurchaseList;
