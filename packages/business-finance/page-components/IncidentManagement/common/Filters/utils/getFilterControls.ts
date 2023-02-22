import { remainControls, requestControls } from './controls';

interface Controls {
	activeTab?:string
	isSettlementExecutive:boolean
}

export const getFilterControls = ({ activeTab, isSettlementExecutive }: Controls) => {
	switch (activeTab) {
		case 'requested':
			return requestControls(isSettlementExecutive);
		case 'approved':
			return remainControls(isSettlementExecutive);
		case 'rejected':
			return remainControls(isSettlementExecutive);
		default:
			return [{}];
	}
};
