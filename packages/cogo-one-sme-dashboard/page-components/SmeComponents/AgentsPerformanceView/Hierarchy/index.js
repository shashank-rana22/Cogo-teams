import React, { useState } from 'react';

import getCountriesData from '../../../../utils/getCountriesData';

import Header from './Header';
import HierarchyBody from './HierarchyBody';
import styles from './styles.module.css';

function Hierarchy() {
	const [hierarchyData, setHierarchyData] = useState([]);

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
