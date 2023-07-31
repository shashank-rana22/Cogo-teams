export default function checkIsEndToEnd({ booking_agents = [], trade_type = '', userId = '' }) {
	const isExport = trade_type === 'export';
	const isImport = trade_type === 'import';

	return booking_agents.some((item) => {
		const isDestinationAgent = item?.stakeholder_type === 'destination_booking_agent';
		const isOriginAgent = item?.stakeholder_type === 'origin_booking_agent';

		if ((isDestinationAgent && isExport && userId === item?.id)
        || (isOriginAgent && isImport && userId === item?.id)) {
			return true;
		}

		return false;
	});
}
