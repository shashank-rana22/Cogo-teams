import { startCase } from '@cogoport/utils';

const getDetail = (data, showStartCase = false) => {
	if (showStartCase) {
		return startCase(data);
	}

	return data;
};

export const EMPLOYEE_DETAIL_MAPPING = [
	{
		heading   : "Managers's Name",
		key       : 'manager_name',
		func      : getDetail,
		startCase : true,
	},
	{
		heading : 'Email',
		key     : 'email',
		func    : getDetail,
	},
	{
		heading   : 'Status',
		key       : 'status',
		func      : getDetail,
		startCase : true,
	},
];
