import { Button } from '@cogoport/components';
import React from 'react';

import Permissions from '../Permissions';

import Departments from './Departments';

function NavContent({
	title = '',
	description = '',
	navigationApis = {},
	setNavigationRefs = {},
	roleData = {},
	creatingNavs = false,
	handleSave = () => {},
	setShow = () => {},
	show = null,
	onDepartmentChange = () => {},
	selectedDepartments = {},
}) {
	let btnText = creatingNavs ? 'Saving, Please wait...' : 'Save';
	if (show === 1) {
		btnText = 'NEXT';
	}
	return (
		<section>
			<div>
				<h2>{title}</h2>
				<span>{description}</span>
			</div>
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
			<div>
				<Button
					disabled={creatingNavs}
					onClick={() => {
						if (show === 1 || roleData.isImported) {
							setShow(null);
						} else {
							setShow(1);
						}
					}}
				>
					{show === 1 || roleData.isImported ? 'Cancel' : 'BACK'}
				</Button>
				<Button
					onClick={show === 1 ? () => setShow(2) : handleSave}
					loading={creatingNavs}
					disabled={creatingNavs}
					style={{ borderRadius: 8, padding: '12px 20px', height: 'auto' }}
				>
					{btnText}
				</Button>
			</div>
		</section>
	);
}

export default NavContent;
