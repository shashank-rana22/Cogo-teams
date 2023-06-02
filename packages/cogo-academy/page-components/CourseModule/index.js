import { useDebounceQuery } from '@cogoport/forms';
import { useState } from 'react';

import Header from './components/Header';
import RenderComponent from './components/RenderComponent';
import useListCourseCategory from './hooks/useListCourseCategory';
import styles from './styles.module.css';

function CourseModule() {
	const [currentCategory, setCurrentCategory] = useState('all_courses');

	const { query, debounceQuery } = useDebounceQuery();

	const {
		finalCourseCategories: courseCategories = [],
		courseCategoryData,
		loading: categoryLoading,
	} = useListCourseCategory();

	return (
		<div className={styles.container}>
			<Header
				courseCategories={courseCategories}
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
				debounceQuery={debounceQuery}
			/>

			<RenderComponent
				courseCategoryData={courseCategoryData}
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
				courseCategories={courseCategories}
				categoryLoading={categoryLoading}
				query={query}
			/>
		</div>
	);
}

export default CourseModule;
