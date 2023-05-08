import { useState } from 'react';

import LeftComponent from './components/LeftComponent';
import styles from './styles.module.css';

function AdvanceCourseCreation() {
	const [activeTab, setActiveTab] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<LeftComponent setActiveTab={setActiveTab} activeTab={activeTab} />
			</div>

			<div className={styles.right_section}>
				{/* <LeftComponent /> */}
			</div>
		</div>
	);
}

export default AdvanceCourseCreation;
