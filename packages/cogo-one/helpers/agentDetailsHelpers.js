export function getHasAccessToEditGroup({ sessionType, accountType, activeMessageCard, agentId, viewType }) {
	return (sessionType === 'admin' && accountType === 'service_provider')
	&& (activeMessageCard.group_members?.includes(agentId)
	|| activeMessageCard.support_agent_id === agentId || viewType === 'admin_view');
}
