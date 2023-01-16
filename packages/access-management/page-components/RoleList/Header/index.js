import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
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
					className={styles.role_group_button}
					size="sm"
					id="rnp_role_list_create_new_role_button"
					onClick={() => onChangeShowCreateRoleModal(true)}
				>
					<IcMPlus className={styles.role_group_icon} />
				</Button>
			</div>
		</section>
	);
}

export default Header;
