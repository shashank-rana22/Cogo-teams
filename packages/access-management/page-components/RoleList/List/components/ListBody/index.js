import { Button, Tags, Placeholder } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useMemo } from 'react';

import getValue from '../../../../../utils/getValue';

import styles from './styles.module.css';

function ListBody({
	columns = [],
	loading = false,
	data = [],
	redirect = () => {},
}) {
	const newFunctions = useMemo(
		() => ({
			renderRoleDescription: (itemData) => (
				<section className={styles.role_description_container}>
					<div className={styles.title}>{itemData?.name}</div>
					<div className={styles.subtitle}>{itemData?.remarks}</div>
				</section>
			),
			renderRoleType: (itemData) => {
				const roleType = (itemData?.role_type || '').toLowerCase() === 'default';

				return (
					<section
						className={styles.role_type_container}
						style={{
							backgroundColor : roleType ? '#6fa5ab' : '#888fd1',
							color           : roleType ? '#fff' : '#fff',
						}}
					>
						<Tags>{itemData?.role_type}</Tags>
					</section>
				);
			},
			renderPartner: (itemData) => (
				<section className={styles.partner_container}>
					{itemData?.partner?.business_name}
				</section>
			),
			renderUserCount: (itemData) => (
				<section className={styles.partner_container}>
					{itemData?.user_count}
				</section>
			),
			renderHierarchyLevel: (itemData) => (
				<section className={styles.partner_container}>
					{startCase(itemData?.hierarchy_level)}
				</section>
			),
			renderFunction: (itemData) => (
				<section className={styles.function_head}>
					{(itemData?.role_functions || []).map((item) => (
						<Tags
							style={{ margin: 5 }}
							themeType="orange"
						>
							{item}
						</Tags>
					))}
				</section>
			),
			renderSubFunction: (itemData) => (
				<section className={styles.function_head}>
					{(itemData?.role_sub_functions || []).map((item) => (
						<Tags
							style={{ margin: 5 }}
							themeType="blue"
						>
							{item}
						</Tags>
					))}
				</section>
			),
			renderUsers: () => (
				<section>
					<span className="user-count">0</span>
					{' '}
					people have been assigned this
					role
				</section>
			),
			renderEditButton: (itemData) => (
				<section>
					<Button themeType="secondary" onClick={() => redirect(itemData?.id)}>
						<IcMEdit style={{ marginRight: 5 }} />
						Edit
					</Button>
				</section>
			),
		}),
		[],
	);
	return (
		<section className={styles.container} id="rnp_role_list_list_body_container">
			{columns?.map((column) => (
				<div
					className={styles.item}
					key={column.key || column.label}
					style={{ flex: column.flex }}
				>
					{loading ? (
						<Placeholder width="100%" height="20px" />
					) : (
						getValue(data, column, newFunctions)
					)}
				</div>
			))}
		</section>
	);
}

export default ListBody;
