import { ButtonIcon } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useUpdateDepartmentRole from '../../../hooks/useUpdateDepartmentRole';

const getReimbursementColumns = ({ mappings, id:groupId, getEmployeeReimbursementGroup = () => {} }) => {
	const { updateDepartmentRoleReimbursement } = useUpdateDepartmentRole({ groupId, getEmployeeReimbursementGroup });

	const handleDelete = ({ item }) => {
		const foundItem = mappings.find((val) => val?.department?.department_name === item?.department?.department_name
			&& val?.role?.role_name === item?.role?.role_name);

		updateDepartmentRoleReimbursement({ id: foundItem.id });
	};

	return ([
		{
			Header   : 'Department',
			accessor : (item) => (
				<div>{startCase(item?.department?.department_name) || '-'}</div>
			),
		},

		{
			Header   : 'Designation',
			accessor : (item) => (
				<div>{startCase(item?.role?.role_name) || '-'}</div>
			),
		},

		{
			id       : 'delete',
			Header   : 'Actions',
			accessor : (item) => (
				<ButtonIcon
					onClick={() => {
						handleDelete({ item });
					}}
					size="md"
					icon={<IcMDelete />}
					themeType="primary"
				/>
			),
		},

	]);
};

export default getReimbursementColumns;
