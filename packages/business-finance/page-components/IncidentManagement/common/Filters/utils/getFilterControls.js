import { remainControls, requestControls } from './controls';

export const getFilterControls = ({
	activeTab, isSettlementExecutive, t = () => {},
	entityCode = '', filters,
}) => {
	switch (activeTab) {
		case 'requested':
			return requestControls({ t, isSettlementExecutive, entityCode, activeTab: 'REQUESTED', filters });
		case 'approved':
			return remainControls({ t, isSettlementExecutive, entityCode, activeTab: 'APPROVED', filters });
		case 'rejected':
			return remainControls({ t, isSettlementExecutive, entityCode, activeTab: 'REJECTED', filters });
		default:
			return [{}];
	}
};
