import { dynamic } from '@cogoport/next';
import { useState } from 'react';

import TableView from '../../../common/TableView';
import useGetSegment from '../../../hooks/useGetSegment';

import getColumns from './Columns';
import styles from './styles.module.css';

const Filters = dynamic(() => import('./Filters'), { ssr: false });
const DeleteRule = dynamic(() => import('./DeleteRule'), { ssr: false });
const AddEditRule = dynamic(() => import('./AddEditRule'), { ssr: false });

const PAGE_ONE = 1;

function SegmentControl() {
	const [statusFilter, setStatusFilter] = useState('active');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [itemData, setItemData] = useState({});

	const {
		data = {}, loading = '', getSegmentData = () => {}, filters,
		setFilters = () => {}, pagination = PAGE_ONE, setPagination = () => {},
	} = useGetSegment({ statusFilter });

	const cols = getColumns({
		page      : data?.page,
		pageLimit : data?.page_limit,
		setShowDeleteModal,
		setItemData,
		statusFilter,
		getSegmentData,
	});

	return (
		<div className={styles.container}>
			<Filters
				statusFilter={statusFilter}
				setStatusFilter={setStatusFilter}
				setShowAddModal={setShowAddModal}
				setFilters={setFilters}
				setPagination={setPagination}
				filters={filters}
			/>

			<TableView
				columns={cols}
				data={data}
				pagination={pagination}
				setPagination={setPagination}
				loading={loading}
			/>
			<DeleteRule
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
				itemData={itemData}
				getSegmentData={getSegmentData}
			/>
			<AddEditRule
				showAddModal={showAddModal}
				setShowAddModal={setShowAddModal}
				getSegmentData={getSegmentData}
				title="Add"
			/>
		</div>
	);
}
export default SegmentControl;
