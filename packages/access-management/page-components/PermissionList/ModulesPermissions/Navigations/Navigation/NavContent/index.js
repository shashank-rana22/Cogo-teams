import React from 'react';

import Permissions from '../Permissions';

import Departments from './Departments';

const FIRST_SCREEN = 1;

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
			{show === FIRST_SCREEN ? (
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
