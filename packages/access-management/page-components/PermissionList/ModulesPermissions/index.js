import React, { memo, useState } from 'react';
import Heading from '../../../common/Heading';
import Filters from './Filters';
import { Container, HeaderContainer } from './styles';
import Navigations from './Navigations';

const ModulesPermissions = (props) => {
	// const { navigationListHook = {} } = useModulesPermissions({ roleDetails });
	const { roleData = {} } = props || {};
	const [searchString, setSearchString] = useState('');
	const [navStatus, setNavStatus] = useState('all');

	return (
		<Container>
			<HeaderContainer>
				<Heading
					title="Modules"
					subTitle={`Assign modules and it's permissions for ${
						roleData?.name || ''
					} role`}
				/>

				<Filters
					searchString={searchString}
					onChangeSearchNavigation={(value) => setSearchString(value)}
					navStatus={navStatus}
					setNavStatus={setNavStatus}
				/>
			</HeaderContainer>

			<Navigations
				{...props}
				searchString={searchString}
				navStatus={navStatus}
			/>
		</Container>
	);
};

export default memo(ModulesPermissions);
