import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SortColumns({ filters = {}, setFilters = () => {}, sortType = '' }) {
	const TYPE_MAPPING = {
		created_at : 'CREATED AT',
		updated_at : 'LAST UPDATED AT',
	};
	const handleSorting = (sortBy) => {
		setFilters({ ...filters, sort_type: filters?.sort_type === 'asc' ? 'desc' : 'asc', sort_by: sortBy });
	};
	const isAscending = filters.sort_type === 'asc';
	const isDescending = filters.sort_type === 'desc';

	return (
		<p>
			{sortType === 'created_at' && (
				<span>
					Created At
					{' '}
					{isAscending && (
						<IcMArrowRotateUp
							onClick={() => handleSorting('created_at')}
							className={styles.sort_icon_active}
							style={{
								width      : '14px',
								height     : '16px',
								marginLeft : '8px',
							}}
						/>
					)}
					{isDescending && (
						<IcMArrowRotateDown
							onClick={() => handleSorting('created_at')}
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
					{isAscending && (
						<IcMArrowRotateUp
							onClick={() => handleSorting('updated_at')}
							className={styles.sort_icon_active}
							style={{
								width      : '14px',
								height     : '16px',
								marginLeft : '8px',
							}}
						/>
					)}
					{isDescending && (
						<IcMArrowRotateDown
							onClick={() => handleSorting('updated_at')}
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
