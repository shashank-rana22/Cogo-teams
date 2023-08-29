import React, { forwardRef } from 'react';

import Grouped from './Grouped';

/**
 * Renders All Permissions related to a single navigation
 * @param {object} props
 * @param {object} [props.navigation={}]
 * @returns
 */

function Permissions(props) {
	const {
		navigationApis = {},
		setNavigationRefs = {},
		roleData = {},
		selectedDepartments,
		creatingNavs = false,
	} = props;

	return (
		<div>
			{Object.keys(navigationApis?.grouped_apis || {}).map((key) => {
				const logical_group = navigationApis?.grouped_apis[key];
				return (
					<Grouped
						apiGroup={logical_group}
						setNavigationRefs={setNavigationRefs}
						roleData={roleData}
						key={key}
						featureKey={key}
						navigation={navigationApis}
						selectedDepartments={selectedDepartments}
						creatingNavs={creatingNavs}
					/>
				);
			})}
		</div>
	);
}

export default forwardRef(Permissions);
