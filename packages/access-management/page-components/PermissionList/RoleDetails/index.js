import { Placeholder, Tooltip, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDoubleLeft } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import Heading from '../../../common/Heading';

import EditRoles from './EditRoles';
import styles from './styles.module.css';

function RoleDetails({
	loading = false,
	roleData = {},
	activeNavsLoading = false,
	onImport = () => {},
	getRole = () => {},
	activeNavs = [],
}) {
	const { t } = useTranslation(['accessManagement']);

	const {
		name = '',
		remarks: descriptions = '',
		stakeholder_type = '',
		importedPermissions,
	} = roleData;

	const details = useMemo(
		() => [
			{
				title    : t('accessManagement:roles_and_permission_update_role_role'),
				data     : name || '',
				skeleton : { width: '80%' },
			},
			{
				title    : t('accessManagement:roles_and_permission_update_role_short_name'),
				data     : roleData?.short_name || '-',
				skeleton : { width: '50%' },
			},
			{
				title    : t('accessManagement:roles_and_permission_update_role_partner'),
				data     : (roleData?.partner?.business_name || '-').toUpperCase(),
				skeleton : { width: '50%' },
			},
			{
				title    : t('accessManagement:roles_and_permission_update_role_role_description'),
				data     : descriptions || '',
				skeleton : { width: '100%' },
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[name, stakeholder_type, descriptions],
	);

	const isImported = !!importedPermissions;

	let importPermissionsButton = null;
	if (activeNavsLoading) {
		importPermissionsButton = (
			<Placeholder height="40px" width="100%" />
		);
	} else if ((activeNavs || []).length === GLOBAL_CONSTANTS.zeroth_index) {
		importPermissionsButton = (
			<Tooltip
				placement="top"
				trigger="mouseenter"
				interactive
				content={<div>{t('accessManagement:roles_and_permission_prefill_permission_from_other_roles')}</div>}
			>
				<div>
					<Button onClick={onImport}>
						<IcMArrowDoubleLeft size={1.25} style={{ marginRight: 8 }} />
						{isImported ? t('accessManagement:roles_and_permission_clear_import')
							: t('accessManagement:roles_and_permission_import_role')}
					</Button>
				</div>
			</Tooltip>
		);
	}

	return (
		<section className={styles.container}>
			<div className={styles.heading_container}>
				<Heading
					title={t('accessManagement:roles_and_permission_update_role_heading')}
					subTitle={t('accessManagement:roles_and_permission_update_role_sub_heading')}
				/>

				<section className={styles.permissions_container}>
					<EditRoles roleData={roleData} getRole={getRole} />
					{importPermissionsButton}
				</section>

			</div>

			<div className={styles.content}>
				{(details || []).map((detail) => (
					<div key={detail.title} className={styles.details}>
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
