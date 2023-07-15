import { useEffect, useRef } from 'react';

const MILLISECONDS_IN_SET_TIME_OUT = 600;

export default function useCallApi({
	listShipments = () => {},
	filters = {},
	tabState = '',
	authParams = '',
	selected_agent_id = '',
}) {
	const [, view_type] = (authParams || '').split(':');

	const debounceQuery = useRef({ q: filters.q });

	useEffect(() => {
		if (debounceQuery.current.q !== filters.q) {
			clearTimeout(debounceQuery.current.timerId);

			debounceQuery.current.q = filters.q;
			debounceQuery.current.timerId = setTimeout(listShipments, MILLISECONDS_IN_SET_TIME_OUT);
		} else {
			listShipments();
		}

		localStorage.setItem(
			'igm_desk_stored_values',
			JSON.stringify({
				filters,
				tabState,
			}),
		);
	}, [
		listShipments,
		tabState,
		view_type,
		filters,
		authParams,
		selected_agent_id,
	]);
}
