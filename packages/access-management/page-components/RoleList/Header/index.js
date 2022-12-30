import { Button, Pills } from '@cogoport/components';
import React from 'react';

import Heading from '../../../common/Heading';

import styles from './styles.module.css';

function Header({
	onChangeShowCreateRoleModal = () => {},
	stakeHolderType,
	setStakeHolderType,
}) {
	return (
		<section className={styles.container} id="rnp_role_list_header_container">
			<Heading
				title="Roles and Permission"
				subTitle="Manage and create new roles and their permissions"
			/>

			<div className={styles.role_group}>
				<Button
					id="rnp_role_list_create_new_role_button"
					onClick={() => onChangeShowCreateRoleModal(true)}
				>
					+ &nbsp; Create new role
				</Button>
			</div>
		</section>
	);
}

export default Header;
