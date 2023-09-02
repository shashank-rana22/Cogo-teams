import { createPortal } from 'react-dom';

import DatesFilterContent from './DatesFilterContent';

const dateFilter = ({
	applyFilters = () => {},
	openCalendar = false,
	setOpen = () => {},
	date = {},
	setDate = () => {},
	range = '',
	setRange = () => {},
}) => (
	openCalendar
		&& createPortal(
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
		)
);
export default dateFilter;
