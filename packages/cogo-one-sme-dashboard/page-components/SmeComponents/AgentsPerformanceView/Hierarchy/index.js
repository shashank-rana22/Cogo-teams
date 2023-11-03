import React from 'react';

import Header from './Header';
import HierarchyBody from './HierarchyBody';
import styles from './styles.module.css';

function Hierarchy({
	setHierarchyData = () => {},
	hierarchyData = [],
}) {
	return (
		<div className={styles.container}>
			<Header
				setHierarchyData={setHierarchyData}
				hierarchyData={hierarchyData}
			/>

			<HierarchyBody
				loading={false}
				setHierarchyData={setHierarchyData}
				hierarchyData={hierarchyData}
			/>
		</div>
	);
}

export default Hierarchy;
