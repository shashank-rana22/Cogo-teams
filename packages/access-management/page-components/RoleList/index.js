import React from 'react';
import Header from './Header';
import Filters from './Filters';
import List from './List';
import Pagination from './Pagination';
import {
	Container,
	FiltersAndListContainer,
	ListAndPaginationContainer,
} from './styles';
import useRoleList from '../../hooks/useRoleList';
import CreateRoleModal from './CreateRoleModal';

const RoleList = () => {
	const {
		showCreateRoleModal = false,
		onChangeShowCreateRoleModal = () => {},
		filters = {},
		onChangeFilters = () => {},
		onChangeParams = () => {},
		listAuthRolesApi = {},
		redirect = () => {},
		stakeHolderType,
		setStakeHolderType,
	} = useRoleList();

	return (
		<Container id="rnp_role_list_container">
			<Header
				onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
				onChangeFilters={onChangeFilters}
				stakeHolderType={stakeHolderType}
				setStakeHolderType={setStakeHolderType}
			/>

			<FiltersAndListContainer id="rnp_role_list_filters_and_list_container">
				<Filters
					filters={filters}
					onChangeFilters={onChangeFilters}
					stakeHolderType={stakeHolderType}
				/>

				<ListAndPaginationContainer id="rnp_role_list_list_and_pagination_container">
					<List listAuthRolesApi={listAuthRolesApi} redirect={redirect} />

					<Pagination
						listAuthRolesApi={listAuthRolesApi}
						onChangeParams={onChangeParams}
					/>
				</ListAndPaginationContainer>
			</FiltersAndListContainer>

			<CreateRoleModal
				showCreateRoleModal={showCreateRoleModal}
				onChangeShowCreateRoleModal={onChangeShowCreateRoleModal}
				redirect={redirect}
			/>
		</Container>
	);
};

export default RoleList;
