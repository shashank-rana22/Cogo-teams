import { Button, ButtonIcon, RadioGroup } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import displayNames from '../../../../../../configurations/feature-descriptions';
import useTogglePermissions from '../../../../../../hooks/useTogglePermissions';

import Permission from './Permission';
import styles from './styles.module.css';

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
	const viewApis = ps.filter((api) => (api?.options || []).length > 2);
	const normalApis = ps.filter((api) => (api?.options || []).length <= 2);
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
					onClick={() => setShow(!show)}
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
							themeType=""
							id={`access_mgmt_edit_role_sh_${featureKey}`}
							disabled={creatingNavs}
							icon={show ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
						/>
					</div>
				</div>
			) : null}
			{show ? (
				<div className={styles.accordion}>
					<p className={styles.description}>
						Configure your permissions according to you and save. For modifying
						permissions in bulk click on feature radio buttons above
					</p>
					{allignAPis(possible_apis || []).map((api) => (
						<Permission
							permission={api}
							key={api.value}
							navigation={navigation}
							creatingNavs={creatingNavs}
							setNavigationRefs={(r) => handleSetNavRef(r, api)}
							data={roleData}
							customPermissions={newApiPermissions}
						/>
					))}
					{Object.keys(rest || {}).map((key) => (
						<Grouped
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
