import { FilterProps } from '../../interface';

import { remainControls, requestControls } from './controls';

interface FilterControlsInterface {
	activeTab?:string
	isSettlementExecutive:boolean
	t?:Function;
	entityCode?: string;
	filters: FilterProps;
}

export const getFilterControls = ({
	activeTab, isSettlementExecutive, t = () => {},
	entityCode = '', filters,
}: FilterControlsInterface) => {
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
