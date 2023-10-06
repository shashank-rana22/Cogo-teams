import { remainControls, requestControls } from './controls';

export const getFilterControls = ({ activeTab, isSettlementExecutive, t = () => {} }) => {
	switch (activeTab) {
		case 'requested':
			return requestControls({ t, isSettlementExecutive });
		case 'approved':
			return remainControls({ t, isSettlementExecutive });
		case 'rejected':
			return remainControls({ t, isSettlementExecutive });
		default:
			return [{}];
	}
};
