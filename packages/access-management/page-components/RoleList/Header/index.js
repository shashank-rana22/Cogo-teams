import { Button, Chips } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React from 'react';

import Heading from '../../../common/Heading';

import styles from './styles.module.css';

function Header({
	onChangeShowCreateRoleModal = () => {},
	onResetFilters = () => {},
	stakeHolderType = '',
	setStakeHolderType = '',
	t = () => {},
}) {
	return (
		<section className={styles.container} id="rnp_role_list_header_container">
			<section className={styles.heading_container}>
				<Heading
					title={t('accessManagement:roles_and_permission_header_title')}
					subTitle={t('accessManagement:roles_and_permission_subheader_title')}
				/>

				<Chips
					selectedItems={stakeHolderType}
					items={[
						{ children: t('accessManagement:roles_and_permission_pills_all_roles'), key: 'all' },
						{ children: t('accessManagement:roles_and_permission_pills_cogoport'), key: 'cogoport' },
						{
							children : t('accessManagement:roles_and_permission_pills_channel_partner'),
							key      : 'channel_partner',
						},
						{ children: t('accessManagement:roles_and_permission_pills_customer'), key: 'customer' },
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
