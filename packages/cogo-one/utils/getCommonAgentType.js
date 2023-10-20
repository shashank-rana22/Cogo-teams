import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const getCommonAgentType = ({ viewType = '' }) => {
	if (viewType === 'cogoone_admin') {
		return '';
	}

	if (viewType.includes('supply')) {
		return 'supply';
	}

	if (viewType.includes('sales')) {
		return 'sales';
	}

	if (viewType.includes('cp_support')) {
		return 'cp_support';
	}

	if (viewType.includes('support')) {
		return 'support';
	}

	if (viewType.includes('shipment_specialist')) {
		return 'shipment_specialist';
	}

	if (viewType.includes('credit_controller')) {
		return 'credit_controller';
	}

	if (viewType.includes('marketing')) {
		return 'marketing';
	}

	return viewType;
};

const FILTER_AGENT_TYPES = ['cogoone_admin', 'default'];

export const getAgentTypesList = () => {
	let agentTypes = [];

	Object.keys(VIEW_TYPE_GLOBAL_MAPPING).forEach(
		(itm) => {
			const agentType = getCommonAgentType({ viewType: itm }) || itm;

			if (agentTypes !== 'cogoone_admin' && !agentTypes.includes(agentType)) {
				agentTypes = [
					...agentTypes,
					agentType,
				];
			}
		},
	);

	return {
		agentTypes,
		filteredAgentTypes: agentTypes.filter(
			(itm) => !FILTER_AGENT_TYPES.includes(itm),
		),
	};
};

export default getCommonAgentType;
