import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SortColumns({ filters = {}, setFilters = () => {}, sortType = '' }) {
	const handleSorting = (sortBy, sort) => {
		setFilters({ ...filters, sort_type: sort, sort_by: sortBy });
	};
	const isAscending = filters.sort_type === 'asc';
	const isDescending = filters.sort_type === 'desc';

	return (
		<p>
			{sortType === 'created_at' && (
				<span>
					Created At
					{' '}
					{(isAscending && filters.sort_by !== 'updated_at') && (
						<IcMArrowRotateUp
							onClick={() => handleSorting('created_at', 'desc')}
							className={styles.sort_icon_active}
							style={{
								width      : '14px',
								height     : '16px',
								marginLeft : '8px',
							}}
						/>
					)}
					{(isDescending || filters.sort_by === 'updated_at') && (
						<IcMArrowRotateDown
							onClick={() => handleSorting('created_at', 'asc')}
							className={styles.sort_icon_active}
							style={{
								width      : '14px',
								height     : '16px',
								marginLeft : '8px',
							}}
						/>
					)}
				</span>
			)}
			{sortType === 'updated_at' && (
				<span>
					Updated At
					{' '}
					{(isAscending && filters.sort_by !== 'created_at') && (
						<IcMArrowRotateUp
							onClick={() => handleSorting('updated_at', 'desc')}
							className={styles.sort_icon_active}
							style={{
								width      : '14px',
								height     : '16px',
								marginLeft : '8px',
							}}
						/>
					)}
					{(isDescending || filters.sort_by === 'created_at') && (
						<IcMArrowRotateDown
							onClick={() => handleSorting('updated_at', 'asc')}
							className={styles.sort_icon_active}
							style={{
								width      : '14px',
								height     : '16px',
								marginLeft : '8px',
							}}
						/>
					)}
				</span>
			)}
		</p>
	);
}

export default SortColumns;
