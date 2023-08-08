import { Popover, Button } from '@cogoport/components';

import DatesFilterContent from './DatesFilterContent';

function Filters({
	children = null,
	applyFilters = () => {},
	open = false,
	setOpen = () => {},
	name = 'APPLY',
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
			{children || (
				<Button onClick={() => setOpen(!open)}>
					{name}
				</Button>
			)}
		</Popover>
	);
}
export default Filters;
