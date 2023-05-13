import { useState } from 'react';

import LeftComponent from './components/LeftComponent';
import RightComponent from './components/RightComponent';
import styles from './styles.module.css';
import useGetCogoAcademyCourse from './useGetCogoAcademyCourse';

function AdvanceCourseCreation({ id }) {
	const [activeTab, setActiveTab] = useState('overview');

	const { data, loading } = useGetCogoAcademyCourse(id);

	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<LeftComponent setActiveTab={setActiveTab} activeTab={activeTab} />
			</div>

			<div className={styles.right_section}>
				<RightComponent data={data} setActiveTab={setActiveTab} activeTab={activeTab} id={id} />
			</div>
		</div>
	);
}

export default AdvanceCourseCreation;
