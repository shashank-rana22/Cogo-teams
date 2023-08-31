import { ButtonIcon, RadioGroup } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';

import displayNames from '../../../../../../configurations/feature-descriptions';
import useTogglePermissions from '../../../../../../hooks/useTogglePermissions';

import Permission from './Permission';
import styles from './styles.module.css';

const SECOND_INDEX = 2;

const OPTIONS = [
	{
		label : 'Yes',
		value : 'yes',
	},
	{
		label : 'No',
		value : 'no',
	},
];

/**
 * Reneders all the grouped apis
 * @param ps
 */

const allignAPis = (ps = []) => {
	const viewApis = ps.filter((api) => (api?.options || []).length > SECOND_INDEX);
	const normalApis = ps.filter((api) => (api?.options || []).length <= SECOND_INDEX);
	return [...viewApis, ...normalApis];
};

function Grouped(props) {
	const {
		apiGroup = {},
		setNavigationRefs = () => {},
		roleData = {},
		navigation = {},
		featureKey = '',
		creatingNavs = false,
	} = props || {};
	const { t } = useTranslation(['accessManagement', 'common']);
	const { possible_apis = [], ...rest } = apiGroup || {};
	const {
		handleApiStatus,
		newApiPermissions,
		value,
		show,
		setShow,
		handleSetNavRef,
	} = useTogglePermissions(props);

	return (
		<div className={styles.group_container}>
			{featureKey ? (
				<div
					role="presentation"
					className={`${styles.role_logic_group}`}
				>
					<div className={styles.row}>
						<p>{displayNames[featureKey] || `Manage ${startCase(featureKey)}`}</p>
					</div>
					<RadioGroup
						options={OPTIONS}
						value={value}
						onChange={handleApiStatus}
						disabled={creatingNavs}
						className={styles.group_radio}
					/>
					<div>
						<ButtonIcon
							id={`access_mgmt_edit_role_sh_${featureKey}`}
							onClick={() => setShow(!show)}
							disabled={creatingNavs}
							icon={show ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
						/>
					</div>
				</div>
			) : null}
			{show ? (
				<div className={styles.accordion}>
					<p className={styles.description}>
						{t('accessManagement:roles_and_permission_crm_dashboard_permission_module')}
					</p>
					{allignAPis(possible_apis || []).map((api) => (
						<Permission
							permission={api}
							key={api.value}
							navigation={navigation}
							creatingNavs={creatingNavs}
							setNavigationRefs={(r) => handleSetNavRef(r, api)}
							customPermissions={newApiPermissions}
						/>
					))}
					{Object.keys(rest || {}).map((key) => (
						<Grouped
							key={key}
							apiGroup={rest[key]}
							setNavigationRefs={setNavigationRefs}
							roleData={roleData}
							creatingNavs={creatingNavs}
							navigation={navigation}
							featureKey={key}
						/>
					))}
				</div>
			) : null}
		</div>
	);
}

export default Grouped;
