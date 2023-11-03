import React from 'react';

import getCountriesData from '../../../../utils/getCountriesData';

import Header from './Header';
import HierarchyBody from './HierarchyBody';
import styles from './styles.module.css';

function Hierarchy({
	setHierarchyData = () => {},
	hierarchyData = [],
}) {
	const countriesData = getCountriesData();

	return (
		<div className={styles.container}>
			<Header
				setHierarchyData={setHierarchyData}
				hierarchyData={hierarchyData}
			/>

			<HierarchyBody
				countriesData={countriesData}
				loading={false}
				setHierarchyData={setHierarchyData}
				hierarchyData={hierarchyData}
			/>
		</div>
	);
}

export default Hierarchy;
