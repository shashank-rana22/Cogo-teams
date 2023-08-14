import { Popover } from '@cogoport/components';

import DatesFilterContent from './datesContentFilter';
import styles from './styles.module.css';

function FilterContent({
	children = null,
	applyFilters = () => {},
	open = false,
	setOpen = () => {},
	date = {},
	setDate = () => {},
	range = '',
	setRange = () => {},
}) {
	return (
		<div className={styles.main_container}>
			<Popover
				interactive
				placement="bottom"
				onClickOutside={() => setOpen(false)}
				content={(
					<DatesFilterContent
						applyFilters={applyFilters}
						setOpen={setOpen}
						date={date}
						setDate={setDate}
						range={range}
						setRange={setRange}
					/>
				)}
				visible={open}
			>
				{children}
			</Popover>
		</div>

	);
}
export default FilterContent;
