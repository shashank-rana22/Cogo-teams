import { useState, useEffect } from 'react';

import LeftComponent from './components/LeftComponent';
import RightComponent from './components/RightComponent';
import useGetCogoAcademyCourse from './hooks/useGetCogoAcademyCourse';
import styles from './styles.module.css';

function AdvanceCourseCreation({ id }) {
	const [activeTab, setActiveTab] = useState('overview');

	const { data, loading, getCogoAcademyCourse } = useGetCogoAcademyCourse(id);

	const { state } = data || {};

	useEffect(() => {
		setActiveTab(state);
	}, [state]);

	if (loading) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<LeftComponent setActiveTab={setActiveTab} activeTab={activeTab} />
			</div>

			<div className={styles.right_section}>
				<RightComponent
					data={data}
					activeTab={activeTab}
					id={id}
					getCogoAcademyCourse={getCogoAcademyCourse}
					setActiveTab={setActiveTab}
				/>
			</div>
		</div>
	);
}

export default AdvanceCourseCreation;
