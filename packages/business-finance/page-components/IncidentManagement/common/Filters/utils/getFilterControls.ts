import { remainControls, requestControls } from './controls';

interface FilterControlsInterface {
	activeTab?:string
	isSettlementExecutive:boolean
	t?:Function;
	entityCode?: string;
}

export const getFilterControls = ({
	activeTab, isSettlementExecutive, t = () => {},
	entityCode = '',
}: FilterControlsInterface) => {
	switch (activeTab) {
		case 'requested':
			return requestControls({ t, isSettlementExecutive, entityCode, activeTab: 'REQUESTED' });
		case 'approved':
			return remainControls({ t, isSettlementExecutive, entityCode, activeTab: 'APPROVED' });
		case 'rejected':
			return remainControls({ t, isSettlementExecutive, entityCode, activeTab: 'REJECTED' });
		default:
			return [{}];
	}
};
