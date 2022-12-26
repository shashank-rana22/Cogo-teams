import React from 'react';
import { Pills } from '@cogoport/front/components';

import Heading from '../../../common/Heading';
import { Container, CreateRoleButton, RoleGroups } from './styles';

const Header = ({
	onChangeShowCreateRoleModal = () => {},
	stakeHolderType,
	setStakeHolderType,
}) => {
	return (
		<Container id="rnp_role_list_header_container">
			<Heading
				title="Roles and Permission"
				subTitle="Manage and create new roles and their permissions"
			/>

			<RoleGroups>
				<Pills
					onChange={(val) => {
						// onChangeFilters({ ...getFilter(val) });
						setStakeHolderType(val);
					}}
					value={stakeHolderType}
					options={[
						{ label: 'All Roles', value: 'all' },
						{ label: 'Cogoport', value: 'cogoport' },
						{ label: 'Channel Partner', value: 'channel_partner' },
						{ label: 'Customer', value: 'customer' },
					]}
				/>
				<CreateRoleButton
					id="rnp_role_list_create_new_role_button"
					onClick={() => onChangeShowCreateRoleModal(true)}
				>
					+ &nbsp; create new role
				</CreateRoleButton>
			</RoleGroups>
		</Container>
	);
};

export default Header;
