import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useContext } from 'react';

import BookingDeskContext from '../../context/BookingDeskContext';

export default function Search() {
	const { filters = {}, setFilters = () => {} } = useContext(BookingDeskContext) || {};

	return (
		<Input
			placeholder="Search SID"
			type="search"
			size="sm"
			value={filters.q || ''}
			onChange={(val) => setFilters({ ...filters, q: val, page: 1 })}
			prefix={<IcMSearchlight />}
		/>
	);
}
