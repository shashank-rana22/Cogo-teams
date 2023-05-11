import { useState } from 'react';

import LeftComponent from './components/LeftComponent';
import RightComponent from './components/RightComponent';
import styles from './styles.module.css';

function AdvanceCourseCreation({ id }) {
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<LeftComponent setActiveTab={setActiveTab} activeTab={activeTab} />
			</div>

			<div className={styles.right_section}>
				<RightComponent setActiveTab={setActiveTab} activeTab={activeTab} />
			</div>
		</div>
	);
}

export default AdvanceCourseCreation;
