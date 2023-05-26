import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Header from './components/Header';
import HomePage from './components/HomePage';
import useListCourseCategory from './hooks/useListCourseCategory';
import styles from './styles.module.css';

function CourseModule() {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);
	const [currentCategory, setCurrentCategory] = useState('all_courses');

	const {
		finalCourseCategories: courseCategories = [],
	} = useListCourseCategory();

	return (
		<div className={styles.container}>
			<Header
				courseCategories={courseCategories}
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
			/>

			<HomePage user_id={user_id} />

		</div>
	);
}

export default CourseModule;
