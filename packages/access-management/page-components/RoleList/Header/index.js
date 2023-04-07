import { Button, Chips } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React from 'react';

import Heading from '../../../common/Heading';

import styles from './styles.module.css';

function Header({
	onChangeShowCreateRoleModal = () => {},
	onResetFilters = () => {},
	stakeHolderType,
	setStakeHolderType,
}) {
	return (
		<section className={styles.container} id="rnp_role_list_header_container">
			<section className={styles.heading_container}>
				<Heading
					title="Roles and Permission"
					subTitle="Manage and create new roles and their permissions"
				/>

				<Chips
					selectedItems={stakeHolderType}
					items={[
						{ children: 'All Roles', key: 'all' },
						{ children: 'Cogoport', key: 'cogoport' },
						{ children: 'Channel Partner', key: 'channel_partner' },
						{ children: 'Customer', key: 'customer' },
					]}
					onItemChange={(val) => {
						setStakeHolderType(val);
						onResetFilters();
					}}
				/>
			</section>

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
