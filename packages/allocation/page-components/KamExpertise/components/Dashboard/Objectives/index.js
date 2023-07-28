import React, { useState } from 'react';

import ListObjectives from './ListObjectives';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	list: ListObjectives,
	// create : CreateAndEditObjective,
	// edit   : CreateAndEditObjective,
};

function Objectives() {
	const [actionMode, setActionMode] = useState({ mode: 'list' });

	const Component = COMPONENT_MAPPING[actionMode.mode];

	if (!Component) return null;

	return (
		<section className={styles.container}>
			<Component setActionMode={setActionMode} />
		</section>
	);
}

export default Objectives;
