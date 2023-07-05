import { useState, useEffect } from 'react';

import LoadingState from '../../../commons/LoadingState';

import LeftComponent from './components/LeftComponent';
import RightComponent from './components/RightComponent';
import useGetCogoAcademyCourse from './hooks/useGetCogoAcademyCourse';
import styles from './styles.module.css';

function AdvanceCourseCreation({ id, mode }) {
	const [activeTab, setActiveTab] = useState('overview');

	const { data, loading, getCogoAcademyCourse } = useGetCogoAcademyCourse({ id });

	const { state } = data || {};

	useEffect(() => {
		if (state === 'published') {
			setActiveTab('overview');
		} else {
			setActiveTab(state);
		}
	}, [state]);

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.left_section}>
					<LoadingState rowsCount={5} small />
				</div>

				<div className={styles.right_section}>
					<LoadingState rowsCount={6} />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<LeftComponent
					setActiveTab={setActiveTab}
					activeTab={activeTab}
					getCogoAcademyCourse={getCogoAcademyCourse}
					id={id}
					state={state}
				/>
			</div>

			<div className={styles.right_section}>
				<RightComponent
					data={data}
					activeTab={activeTab}
					id={id}
					getCogoAcademyCourse={getCogoAcademyCourse}
					setActiveTab={setActiveTab}
					mode={mode}
					state={state}
				/>
			</div>
		</div>
	);
}

export default AdvanceCourseCreation;
