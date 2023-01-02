import React from 'react';

import descriptions from '../../../../../utils/descriptions';
import Navigation from '../Navigation';

import styles from './styles.module.css';

function NestedNavigations({
	navigation,
	roleData,
	authRoleId,
	getRole,
	getNavOptions,
	loading,
}) {
	return (
		<section className={styles.container}>
			<div>
				<p className={styles.name}>{navigation?.title}</p>
				<p className={styles.description}>{descriptions[navigation?.key] || ''}</p>
			</div>
			{navigation.options.map((nav) => (
				<Navigation
					navigation={nav}
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
				/>
			))}
		</section>
	);
}

export default NestedNavigations;
