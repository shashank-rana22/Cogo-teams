import { Button, Tags, Placeholder } from '@cogoport/components';
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
				<section>
					<div className="title">{itemData?.name}</div>
					<div className="sub-title">{itemData?.remarks}</div>
				</section>
			),
			renderRoleType: (itemData) => (
				<section
					roleType={(itemData?.role_type || '').toLowerCase()}
				>
					<Tags>{itemData?.role_type}</Tags>
				</section>
			),
			renderPartner: (itemData) => (
				<section>
					{itemData?.partner?.business_name}
				</section>
			),
			renderUserCount: (itemData) => (
				<section>{itemData?.user_count}</section>
			),
			renderHierarchyLevel: (itemData) => (
				<section>
					{startCase(itemData?.hierarchy_level)}
				</section>
			),
			renderFunction: (itemData) => (
				<section>
					{(itemData?.role_functions || []).map((item) => <Tags>{item}</Tags>)}
				</section>
			),
			renderSubFunction: (itemData) => (
				<section>
					{(itemData?.role_sub_functions || []).map((item) => <Tags>{item}</Tags>)}
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
