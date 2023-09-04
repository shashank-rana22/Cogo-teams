import { createPortal } from 'react-dom';

import DatesFilterContent from './DatesFilterContent';

function DateFilter({
	applyFilters = () => {},
	openCalendar = false,
	setOpen = () => {},
	date = {},
	setDate = () => {},
	range = '',
	setRange = () => {},
}) {
	return openCalendar ? createPortal(
		<DatesFilterContent
			applyFilters={applyFilters}
			setOpen={setOpen}
			date={date}
			setDate={setDate}
			range={range}
			setRange={setRange}
			openCalendar={openCalendar}
		/>,
		document.body,
	) : null;
}
export default DateFilter;
