import { Skeleton } from '@cogoport/front/components/admin';
import React, { useMemo } from 'react';
import getValue from '@cogo/smart-components/utils/getValue';
import { Tag } from '@cogoport/front/components';
import startCase from '@cogo/utils/startCase';
import {
	Container,
	Row,
	Col,
	Label,
	RoleDescriptionColContainer,
	HierarchyColContainer,
	RoleTypeColContainer,
	PartnerColContainer,
	FunctionColContainer,
	UserCountColContainer,
	UsersColContainer,
	ButtonContainer,
	EditButton,
} from './styles';
import PencilSvg from './Pencil.svg';

const ListBody = ({
	columns = [],
	loading = false,
	data = [],
	redirect = () => {},
}) => {
	const newFunctions = useMemo(
		() => ({
			renderRoleDescription: (itemData) => (
				<RoleDescriptionColContainer>
					<div className="title">{itemData?.name}</div>
					<div className="sub-title">{itemData?.remarks}</div>
				</RoleDescriptionColContainer>
			),
			renderRoleType: (itemData) => (
				<RoleTypeColContainer
					roleType={(itemData?.role_type || '').toLowerCase()}
				>
					<Tag>{itemData?.role_type}</Tag>
				</RoleTypeColContainer>
			),
			renderPartner: (itemData) => (
				<PartnerColContainer>
					{itemData?.partner?.business_name}
				</PartnerColContainer>
			),
			renderUserCount: (itemData) => (
				<UserCountColContainer>{itemData?.user_count}</UserCountColContainer>
			),
			renderHierarchyLevel: (itemData) => (
				<HierarchyColContainer>
					{startCase(itemData?.hierarchy_level)}
				</HierarchyColContainer>
			),
			renderFunction: (itemData) => (
				<FunctionColContainer>
					{(itemData?.role_functions || []).map((item) => {
						return <Tag>{item}</Tag>;
					})}
				</FunctionColContainer>
			),
			renderSubFunction: (itemData) => (
				<FunctionColContainer>
					{(itemData?.role_sub_functions || []).map((item) => {
						return <Tag>{item}</Tag>;
					})}
				</FunctionColContainer>
			),
			renderUsers: () => (
				<UsersColContainer>
					<span className="user-count">0</span> people have been assigned this
					role
				</UsersColContainer>
			),
			renderEditButton: (itemData) => (
				<ButtonContainer>
					<EditButton onClick={() => redirect(itemData?.id)}>
						<PencilSvg />
						Edit
					</EditButton>
				</ButtonContainer>
			),
		}),
		[],
	);

	return (
		<Container id="rnp_role_list_list_body_container">
			{(loading ? Array(5).fill({}) : data)?.map((item) => (
				<Row className="row">
					{columns?.map((column) => (
						<Col
							xs={12}
							sm={6}
							md={column.span}
							lg={column.span}
							key={column?.key || column?.label}
						>
							<Label>{column?.label}</Label>
							{loading ? (
								<Skeleton width="100%" height="20px" />
							) : (
								getValue(item, column, false, newFunctions)
							)}
						</Col>
					))}
				</Row>
			))}
		</Container>
	);
};

export default ListBody;
