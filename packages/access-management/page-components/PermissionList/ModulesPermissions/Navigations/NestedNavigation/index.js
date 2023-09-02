import { useTranslation } from 'next-i18next';
import React from 'react';

import roleDescriptions from '../../../../../utils/descriptions';
import Navigation from '../Navigation';

import styles from './styles.module.css';

function NestedNavigations({
	navigation,
	roleData,
	authRoleId,
	getRole,
	getNavOptions,
	loading,
	activeNavs,
}) {
	const { t } = useTranslation(['accessManagement']);
	const descriptions = roleDescriptions(t);
	return (
		<section className={styles.container}>
			<div>
				<p className={styles.name}>{navigation?.title}</p>
				<p className={styles.description}>{descriptions[navigation?.key] || ''}</p>
			</div>
			{navigation.options.map((nav) => (
				<Navigation
					navigation={nav}
					key={nav?.key}
					roleData={{
						...(roleData || {}),
						permissions     : roleData?.permissions,
						old_permissions : roleData?.permissions,
					}}
					authRoleId={authRoleId}
					getRole={getRole}
					getNavOptions={getNavOptions}
					loading={loading}
					isNested
					activeNavs={activeNavs}
				/>
			))}
		</section>
	);
}

export default NestedNavigations;
