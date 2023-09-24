import { Table, Placeholder } from '@cogoport/components';
import { useState } from 'react';

import TableView from '../../../common/TableView';
import useCreateSegment from '../../../hooks/useCreateSegment';
import useGetSegment from '../../../hooks/useGetSegment';
import useUpdateSegment from '../../../hooks/useUpdateSegment';

import AddEditRule from './AddEditRule';
import columns from './Columns';
import DeleteRule from './DeleteRule';
import Filters from './Filters';
import styles from './styles.module.css';

const PAGE_ONE = 1;

function SegmentControl() {
	const [statusFilter, setStatusFilter] = useState('active');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [itemData, setItemData] = useState({});
	const [pagination, setPagination] = useState(PAGE_ONE);

	const {
		data = {}, loading = '', getSegmentData = () => {},
		setFilters = () => {},
	} = useGetSegment({ statusFilter, pagination });

	const { createSegment = () => {}, createSegmentLoading = '' } = useCreateSegment({ getSegmentData });

	const { updateSegment = () => {}, updateLoading = '' } = useUpdateSegment({ getSegmentData });

	const cols = columns({
		page      : data?.page,
		pageLimit : data?.page_limit,
		setShowDeleteModal,
		setItemData,
		statusFilter,
		updateSegment,
		updateLoading,
	});

	const loadingColumn = [
		{
			Header   : 'LOADING...',
			accessor : (item) => (
				<Placeholder key={item?.id} height="50px" />
			),
		},
	];

	return (
		<div className={styles.container}>
			<Filters
				statusFilter={statusFilter}
				setStatusFilter={setStatusFilter}
				setShowAddModal={setShowAddModal}
				setFilters={setFilters}
			/>
			{loading
				? (
					<div className={styles.table_container}>
						<Table
							columns={loadingColumn}
							data={[{}, {}, {}]}
						/>
					</div>
				) : (
					<TableView
						columns={cols}
						data={data}
						pagination={pagination}
						setPagination={setPagination}
						loading={loading}
					/>
				)}
			<DeleteRule
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
				itemData={itemData}
				updateSegment={updateSegment}
			/>
			<AddEditRule
				showAddModal={showAddModal}
				setShowAddModal={setShowAddModal}
				submit={createSegment}
				loading={createSegmentLoading}
				title="Add"
			/>
		</div>
	);
}
export default SegmentControl;
