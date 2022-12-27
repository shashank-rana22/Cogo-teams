import React from 'react';

import { columns } from '../../../utils/columns';

import ListBody from './components/ListBody';
import ListHead from './components/ListHead';

function List({ listAuthRolesApi = {}, redirect = () => {} }) {
	const { loading = false, data = {} } = listAuthRolesApi;
	const { list: roleListData = [] } = data;

	if (!loading && roleListData.length === 0) {
		return (
			<section id="rnp_role_list_list_container">
				{/* <EmptyState /> */}
			</section>
		);
	}

	return (
		<section id="rnp_role_list_list_container">
			<ListHead columns={columns} />
			{data.list?.map((item) => (
				<ListBody
					columns={columns}
					loading={loading}
					data={item}
					redirect={redirect}
				/>
			))}
		</section>
	);
}

export default List;
