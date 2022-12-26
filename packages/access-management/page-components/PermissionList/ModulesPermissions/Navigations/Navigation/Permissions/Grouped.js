import { Button } from '@cogo/commons/components';
import React from 'react';
import { ToolTip } from '@cogoport/front/components';
import RadioGroup from '@cogoport/front/components/RadioGroup';
import startCase from '@cogo/utils/startCase';
import { RoleLogicGroup, FeatureName, Row, GroupContainer } from './styles';
import Permission from './Permission';
import IcCv from './ic-chevron-down.svg';
import IcInfo from './ic-info.svg';
import IcCvUp from './ic-chevron-up.svg';

import useTogglePermissions from '../../../../../../hooks/useTogglePermissions';
import displayNames from '../../../../../../configurations/feature-descriptions';
import featureExplanation from '../../../../../../configurations/feature-explanation';

const OPTIONS = [
	{
		label: 'Yes',
		value: 'yes',
	},
	{
		label: 'No',
		value: 'no',
	},
];

/**
 * Reneders all the grouped apis
 * @param {object} props
 */

const allignAPis = (ps = []) => {
	const viewApis = ps.filter((api) => (api?.options || []).length > 2);
	const normalApis = ps.filter((api) => (api?.options || []).length <= 2);
	return [...viewApis, ...normalApis];
};

const Grouped = (props) => {
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
		<GroupContainer>
			{featureKey ? (
				<RoleLogicGroup className={show ? 'show' : ''}>
					<Row>
						<FeatureName>
							{displayNames[featureKey] || `Manage ${startCase(featureKey)}`}{' '}
						</FeatureName>
						<ToolTip
							placement="top"
							theme="light"
							trigger="mouseenter"
							interactive
							content={
								<FeatureName className="normal">
									{featureExplanation[featureKey] ||
										`By clicking yes you will allow this role to perform actions related to ${startCase(
											featureKey,
										)} in ${navigation.title} `}{' '}
								</FeatureName>
							}
						>
							<div>
								<IcInfo
									style={{ cursor: 'pointer', marginLeft: 8 }}
									size={1.25}
								/>
							</div>
						</ToolTip>
					</Row>
					<RadioGroup
						options={OPTIONS}
						value={value}
						onChange={handleApiStatus}
						disabled={creatingNavs}
					/>
					<ToolTip
						placement="top"
						theme="light"
						trigger="mouseenter"
						interactive
						content={
							<FeatureName className="normal">
								{show
									? 'Hide advanced permissions view'
									: 'Show advanced permissions view'}
							</FeatureName>
						}
					>
						<div>
							<Button
								ghost
								id={`access_mgmt_edit_role_sh_${featureKey}`}
								onClick={() => setShow(!show)}
								disabled={creatingNavs}
								style={{
									borderRadius: '50%',
									width: '31px',
									height: '31px',
									alignItems: 'center',
									justifyContent: 'center',
									display: 'flex',
								}}
							>
								{' '}
								{show ? <IcCvUp /> : <IcCv />}
							</Button>
						</div>
					</ToolTip>
				</RoleLogicGroup>
			) : null}
			{show ? (
				<>
					<p
						style={{
							fontSize: 10,
							color: '#828282',
							margin: 0,
							marginBottom: 8,
							marginLeft: 16,
						}}
					>
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
						<>
							<Grouped
								apiGroup={rest[key]}
								setNavigationRefs={setNavigationRefs}
								roleData={roleData}
								creatingNavs={creatingNavs}
								navigation={navigation}
								featureKey={key}
							/>
						</>
					))}
				</>
			) : null}
		</GroupContainer>
	);
};

export default Grouped;
