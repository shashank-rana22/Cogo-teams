import { remainControls, requestControls } from './controls';

interface FilterControlsInterface {
	activeTab?:string
	isSettlementExecutive:boolean
	t?:Function;
}

export const getFilterControls = ({ activeTab, isSettlementExecutive, t = () => {} }: FilterControlsInterface) => {
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
