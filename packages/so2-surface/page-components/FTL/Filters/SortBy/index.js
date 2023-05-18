import { Button, Select, Chips } from '@cogoport/components';
import { useContext, useState } from 'react';
import DashboardContext from '../../../../context/DashboardContext';
import styles from './styles.module.css';

function SortBy({
	popoverFilter = {},
	setShowPopover = () => {},
}) {
	const SORT_BY_OPTIONS = [{ value: 'created_at', label: 'Shipment Creation Date' },
		{ value: 'task_created_at', label: 'Task Creation Date' },
		{ value: 'task_deadline', label: 'Task Deadline Date' }];

	const SORTING_ORDER = [{ key: 'asc', children: 'Ascending' }, { key: 'desc', children: 'Descending' }];

	const [order, setOrder] = useState('asc');
	const { filters = {}, setFilters } = useContext(DashboardContext);

	const [sortValue, setSortValue] = useState('created_at');
	const handleReset = () => {
		setSortValue('created_at');
		setFilters({});
		setShowPopover(false);
	};

	return (
		<div>
			<div className={styles.action_buttons}>
				<Button
					size="sm"
					onClick={handleReset}
					themeType="tertiary"
				>
					<div className={styles.action_text}>Reset</div>
				</Button>

				<Button
					size="sm"
					onClick={() => {
						setFilters({ ...filters, ...popoverFilter, sortValue, order });
						setShowPopover(false);
					}}
				>
					<div className={styles.action_text}>Apply</div>
				</Button>
			</div>

			<div className={styles.filter_container}>
				<Select
					value={sortValue}
					onChange={(e) => setSortValue(e)}
					placeholder="Sort By"
					options={SORT_BY_OPTIONS}
					size="sm"
				/>
			</div>
			<Chips
				size="md"
				items={SORTING_ORDER}
				selectedItems={order}
				onItemChange={(e) => { setOrder(e); }}
			/>

		</div>
	);
}
export default SortBy;
