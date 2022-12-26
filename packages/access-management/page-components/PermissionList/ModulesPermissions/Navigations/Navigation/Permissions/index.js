import React, { forwardRef } from 'react';
import { Container } from './styles';

import Grouped from './Grouped';

/**
 * Renders All Permissions related to a single navigation
 * @param {object} props
 * @param {object} [props.navigation={}]
 * @returns
 */

const Permissions = (props) => {
	const {
		navigationApis = {},
		setNavigationRefs = {},
		roleData = {},
		selectedDepartments,
		creatingNavs = false,
	} = props;
	return (
		<Container>
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
		</Container>
	);
};

export default forwardRef(Permissions);
