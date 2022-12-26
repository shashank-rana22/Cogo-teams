import React from 'react';
import Button from '@cogoport/front/components/Button';
import { Container, Header, Heading, SubHeading, ButtonDiv } from './styles';
import Permissions from '../Permissions';
import Departments from './Departments';

const NavContent = ({
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
}) => {
	let btnText = creatingNavs ? 'Saving, Please wait...' : 'Save';
	if (show === 1) {
		btnText = 'NEXT';
	}
	return (
		<Container>
			<Header>
				<Heading>{title}</Heading>
				<SubHeading>{description}</SubHeading>
			</Header>
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
			<ButtonDiv>
				<Button
					ghost
					disabled={creatingNavs}
					style={{
						marginRight: 16,
						borderRadius: 8,
						padding: '12px 20px',
						height: 'auto',
					}}
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
			</ButtonDiv>
		</Container>
	);
};

export default NavContent;
