import { Placeholder, Tooltip, Button } from '@cogoport/components';
import { IcMArrowDoubleLeft } from '@cogoport/icons-react';
import React, { useMemo } from 'react';

import Heading from '../../../common/Heading';

import EditRoles from './EditRoles';
import styles from './styles.module.css';

function RoleDetails({
	loading = false,
	roleData = {},
	onImport = () => {},
	getRole = () => {},
}) {
	const {
		permissions = [],
		name = '',
		remarks: descriptions = '',
		stakeholder_type = '',
		importedPermissions,
	} = roleData;

	const details = useMemo(
		() => [
			{
				title    : 'Role',
				data     : name || '',
				skeleton : { width: '80%' },
			},
			{
				title    : 'Short Name',
				data     : roleData?.short_name || '-',
				skeleton : { width: '50%' },
			},
			{
				title    : 'Partner',
				data     : (roleData?.partner?.business_name || '-').toUpperCase(),
				skeleton : { width: '50%' },
			},
			{
				title    : 'Role Description',
				data     : descriptions || '',
				skeleton : { width: '100%' },
			},
		],
		[name, stakeholder_type, descriptions],
	);

	const isImported = !!importedPermissions;

	let importPermissionsButton = null;
	if (loading) {
		importPermissionsButton = (
			<Placeholder height="40px" width="100%" />
		);
	} else if (permissions?.length === 0) {
		importPermissionsButton = (
			<Tooltip
				placement="top"
				theme="light"
				trigger="mouseenter"
				interactive
				content={<div>Prefill permissions from other roles</div>}
			>
				<div>
					<Button onClick={onImport}>
						<IcMArrowDoubleLeft size={1.25} style={{ marginRight: 8 }} />
						{isImported ? 'Clear Import' : 'Import Role'}
					</Button>
				</div>
			</Tooltip>
		);
	}

	return (
		<section className={styles.container}>
			<div className={styles.heading_container}>
				<Heading
					title="Update Role"
					subTitle="Update permissions for the role"
				/>

				<section className={styles.permissions_container}>
					<EditRoles roleData={roleData} getRole={getRole} />
					{importPermissionsButton}
				</section>

			</div>

			<div className={styles.content}>
				{(details || []).map((detail) => (
					<div className={styles.details}>
						<span className={styles.title}>
							{detail?.title}
							{' '}
							-
						</span>
						{loading ? (
							<Placeholder height="16px" width={detail?.skeleton.width} />
						) : (
							<span className={styles.data}>{detail?.data}</span>
						)}
					</div>
				))}
			</div>
		</section>
	);
}

export default RoleDetails;
