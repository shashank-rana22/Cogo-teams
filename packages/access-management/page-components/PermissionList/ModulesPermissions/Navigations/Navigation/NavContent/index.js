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
	t = () => {},
}) {
	return (
		<section>
			{show === FIRST_SCREEN ? (
				<Departments
					onChange={onDepartmentChange}
					selectedDepartments={selectedDepartments}
					t={t}
				/>
			) : (
				<Permissions
					navigationApis={navigationApis}
					setNavigationRefs={setNavigationRefs}
					roleData={roleData}
					selectedDepartments={selectedDepartments}
					creatingNavs={creatingNavs}
					t={t}
				/>
			)}
		</section>
	);
}

export default NavContent;
