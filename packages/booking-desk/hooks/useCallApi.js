import { useEffect, useRef } from 'react';

import NUMERICAL_VALUES from '../config/NUMERICAL_VALUES.json';

export default function useCallApi({
	listShipments = () => {},
	filters = {},
	tabState = '',
	authParams = '',
	selected_agent_id = '',
}) {
	const [, scope, view_type] = (authParams || '').split(':');

	const debounceQuery = useRef({ q: filters.q });

	useEffect(() => {
		if (debounceQuery.current.q !== filters.q) {
			clearTimeout(debounceQuery.current.timerId);

			debounceQuery.current.q = filters.q;
			debounceQuery.current.timerId = setTimeout(listShipments, NUMERICAL_VALUES.API_DEBOUNCE_TIME);
		} else {
			listShipments();
		}

		localStorage.setItem(
			'booking_desk_stored_values',
			JSON.stringify({
				filters,
				tabState,
				scopeFilters: { scope, view_type, selected_agent_id },
			}),
		);
	}, [
		listShipments,
		tabState,
		view_type,
		filters,
		scope,
		authParams,
		selected_agent_id,
	]);
}
