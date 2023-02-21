import { MultiSelect, Select, SingleDateRange } from '@cogoport/components';

// export const getElements = (type: string) => {
// 	switch (type) {
// 		case 'select':
// 			return Select;
// 		case 'multiSelect':
// 			return MultiSelect;
// 		case 'datepicker':
// 			return SingleDateRange;
// 		default:
// 			return null;
// 	}
// };

export const ELEMENTS_MAPPING = {
	select      : Select,
	multiselect : MultiSelect,
	datepicker  : SingleDateRange,

};
