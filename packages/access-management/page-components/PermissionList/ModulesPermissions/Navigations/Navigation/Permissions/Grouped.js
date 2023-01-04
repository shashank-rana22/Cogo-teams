import {
	Button, Tooltip,
	// RadioGroup
} from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import displayNames from '../../../../../../configurations/feature-descriptions';
import featureExplanation from '../../../../../../configurations/feature-explanation';
import useTogglePermissions from '../../../../../../hooks/useTogglePermissions';

import IcCv from './ic-chevron-down.svg';
import IcCvUp from './ic-chevron-up.svg';
import IcInfo from './ic-info.svg';
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

	const renderExplanation = () => (
		<p className="normal">
			{featureExplanation[featureKey]
					|| `By clicking yes you will allow this role to perform actions related to ${startCase(
						featureKey,
					)} in ${navigation.title} `}
			{' '}
		</p>
	);

	return (
		<div className={styles.group_container}>
			{featureKey ? (
				<div className={`${styles.role_logic_group}`}>
					<div className={styles.row}>
						<p>{displayNames[featureKey] || `Manage ${startCase(featureKey)}`}</p>
					</div>
					asas
					{/* <RadioGroup */}
					{/* 	options={OPTIONS} */}
					{/* 	value={value} */}
					{/* 	onChange={handleApiStatus} */}
					{/* 	disabled={creatingNavs} */}
					{/* /> */}
					<div>
						<Button
							ghost
							id={`access_mgmt_edit_role_sh_${featureKey}`}
							onClick={() => setShow(!show)}
							disabled={creatingNavs}
						>
							{show ? <IcCvUp /> : <IcCv />}
						</Button>
					</div>
				</div>
			) : null}
			{/* {show ? ( */}
			<div className={styles.accordion} aria-expanded={show}>
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
			{/* ) : null} */}
		</div>
	);
}

export default Grouped;
