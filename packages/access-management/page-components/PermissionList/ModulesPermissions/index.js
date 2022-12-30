import React, { memo, useState } from 'react';

import Heading from '../../../common/Heading';

import Filters from './Filters';
import Navigations from './Navigations';
import styles from './styles.module.css';

function ModulesPermissions(props) {
	// const { navigationListHook = {} } = useModulesPermissions({ roleDetails });
	const { roleData = {} } = props || {};
	const [searchString, setSearchString] = useState('');
	const [navStatus, setNavStatus] = useState('all');

	return (
		<section className={styles.container}>
			<div className={styles.header_container}>
				<Heading
					title="Modules"
					subTitle={`Assign modules and it's permissions for ${roleData?.name || ''} role`}
				/>

				<Filters
					searchString={searchString}
					onChangeSearchNavigation={(value) => setSearchString(value)}
					navStatus={navStatus}
					setNavStatus={setNavStatus}
				/>
			</div>

			<Navigations
				{...props}
				searchString={searchString}
				navStatus={navStatus}
			/>
		</section>
	);
}

export default memo(ModulesPermissions);
