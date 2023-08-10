import { Popover } from '@cogoport/components';

import DatesFilterContent from './DatesFilterContent';

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
	);
}
export default FilterContent;
