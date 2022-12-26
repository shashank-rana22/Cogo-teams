import React from 'react';
import EmptyState from './components/EmptyState';
import ListHead from './components/ListHead';
import ListBody from './components/ListBody';
import { Container } from './styles';
import { columns } from '../../../utils/columns';

const List = ({ listAuthRolesApi = {}, redirect = () => {} }) => {
	const { loading = false, data = {} } = listAuthRolesApi;
	const { list: roleListData = [] } = data;

	if (!loading && roleListData.length === 0) {
		return (
			<Container id="rnp_role_list_list_container">
				<EmptyState />
			</Container>
		);
	}

	return (
		<Container id="rnp_role_list_list_container">
			<ListHead columns={columns} />
			<ListBody
				columns={columns}
				loading={loading}
				data={roleListData}
				redirect={redirect}
			/>
		</Container>
	);
};

export default List;
