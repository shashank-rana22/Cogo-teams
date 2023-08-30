import React from 'react';

import Permissions from '../Permissions';

import Departments from './Departments';

function NavContent({
	navigationApis = {},
	setNavigationRefs = {},
	roleData = {},
	creatingNavs = false,
	show = null,
	onDepartmentChange = () => {},
	selectedDepartments = {},
}) {
	return (
		<section>
			{show === 1 ? (
				<Departments
					onChange={onDepartmentChange}
					selectedDepartments={selectedDepartments}
				/>
			) : (
				<Permissions
					navigationApis={navigationApis}
					setNavigationRefs={setNavigationRefs}
					roleData={roleData}
					selectedDepartments={selectedDepartments}
					creatingNavs={creatingNavs}
				/>
			)}
		</section>
	);
}

export default NavContent;
