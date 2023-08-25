export default function getEnableConsolidation({ stakeholderConfig = {}, enableConsolidations = false }) {
	const enable = stakeholderConfig?.overview?.enable_consolidation || false;

	return enableConsolidations && enable;
}
