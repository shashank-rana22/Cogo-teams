import { useState } from 'react';

import Header from './components/Header';
import RenderComponent from './components/RenderComponent';
import useListCourseCategory from './hooks/useListCourseCategory';
import styles from './styles.module.css';

function CourseModule() {
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

			<RenderComponent
				CourseCategoryData={courseCategories}
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
			/>
		</div>
	);
}

export default CourseModule;
