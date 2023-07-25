import { Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

// import controls from './controls';
// import FilterContent from './FilterContent';
import styles from './styles.module.css';

function Filter() {
	const [openFilter, setOpenFilter] = useState(false);

	return (
		<Popover
			theme="light"
			interactive
			animation="perspective"
			caret={false}
			placement="bottom"
			// content={(
			// 	<FilterContent
			// 		controls={finalControls}
			// 		fields={fields}
			// 		reset={reset}
			// 		applyFilters={applyFilters}
			// 		setFilters={setFilters}
			// 		setOpen={setOpenFilter}
			// 	/>
			// )}
			visible={openFilter}
			onClickOutside={() => setOpenFilter(false)}
		>
			<div
				className={`${styles.filter_container} ${openFilter ? styles.active : ''}`}
				aria-hidden="true"
				onClick={() => {
					setOpenFilter((prev) => !prev);
				}}
			>
				<IcMFilter width={16} height={16} className={styles.filter_icon} />

				<div>Filter</div>

				{/* {filtersApplied && <div className={styles.filter_dot} />} */}
			</div>
		</Popover>
	);
}

export default Filter;
