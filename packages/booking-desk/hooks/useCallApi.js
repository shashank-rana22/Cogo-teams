import { useEffect, useRef } from 'react';

export default function useCallApi({
	listShipments = () => {},
	filters = {},
	authParams = '',
	activeTab = '',
	selected_agent_id = '',
}) {
	const [, scope, view_type] = (authParams || '').split(':');

	const debounceQuery = useRef({ q: filters.q });

	useEffect(() => {
		if (debounceQuery.current.q !== filters.q) {
			clearTimeout(debounceQuery.current.timerId);

			debounceQuery.current.q = filters.q;
			debounceQuery.current.timerId = setTimeout(listShipments, 600);
		} else {
			listShipments();
		}

		localStorage.setItem(
			'booking_desk_stored_values',
			JSON.stringify({
				filters,
				activeTab,
				scopeFilters: { scope, view_type, selected_agent_id },
			}),
		);
	}, [
		listShipments,
		activeTab,
		scope,
		view_type,
		filters,
		authParams,
		selected_agent_id,
	]);
}
