import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AllCourses from './components/AllCourses';
import Header from './components/Header';
import HomePage from './components/HomePage';
import useListCourseCategory from './hooks/useListCourseCategory';
import styles from './styles.module.css';

function CourseModule() {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const { query } = useRouter();

	const { page = '' } = query;

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
			{/* <AllCourses
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
			/>
			<HomePage user_id={user_id} CourseCategoryData={CourseCategoryData} /> */}
			{isEmpty(page) ? (
				<AllCourses
					currentCategory={currentCategory}
					setCurrentCategory={setCurrentCategory}
				/>
			) : (
				null
			)}
		</div>
	);
}

export default CourseModule;
