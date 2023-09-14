import { useTranslation } from 'next-i18next';
import React, { memo, useState } from 'react';

import Heading from '../../../common/Heading';

import Filters from './Filters';
import Navigations from './Navigations';
import styles from './styles.module.css';

function ModulesPermissions(props) {
	const { roleData = {} } = props || {};
	const { t } = useTranslation(['accessManagement']);
	const [searchString, setSearchString] = useState('');
	const [navStatus, setNavStatus] = useState('all');

	return (
		<section className={styles.container}>
			<div className={styles.header_container}>
				<Heading
					title={t('accessManagement:roles_and_permission_title_modules')}
					subTitle={`${t('accessManagement:roles_and_permission_sub_title_first_part_assign_modules')}
					${roleData?.name || ''} 
					${t('accessManagement:roles_and_permission_sub_title_second_part_role')}`}
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
