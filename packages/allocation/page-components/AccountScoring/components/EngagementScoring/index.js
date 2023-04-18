import { useState } from 'react';

import Settings from './Settings';
import styles from './styles.module.css';
import WarmthScoring from './WarmthScoring';

const COMPONENT_MAPPING = {
	warmth_scoring : WarmthScoring,
	settings       : Settings,
};

function EngagementScoring() {
	const [toggleComponent, setToggleComponent] = useState('warmth_scoring');

	const componentProps = {
		warmth_scoring: {
			toggleComponent,
			setToggleComponent,
		},
		settings: {
			toggleComponent,
			setToggleComponent,
		},
	};

	const Component = COMPONENT_MAPPING[toggleComponent] || null;

	return (
		<div className={styles.secondary_container}>

			{Component && (
				<Component key={toggleComponent} {...(componentProps[toggleComponent] || {})} />
			)}
		</div>
	);
}

export default EngagementScoring;
