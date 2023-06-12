import { useState } from 'react';

import CategoryCard from '../CategoryCard';

import MyCourses from './components/MyCourses';
import RecommemndedCourses from './components/RecommemndedCourses';

function HomePage({ user_id, courseCategoryData, categoryLoading, setCurrentCategory }) {
	const [ongoingCategories, setOngoingCategories] = useState({ loaded: false, data: [] });

	return (
		<div>
			<MyCourses
				user_id={user_id}
				setOngoingCategories={setOngoingCategories}
				ongoingCategories={ongoingCategories}
			/>

			<CategoryCard
				courseCategoryData={courseCategoryData}
				categoryLoading={categoryLoading}
				setCurrentCategory={setCurrentCategory}
			/>

			<RecommemndedCourses
				user_id={user_id}
				ongoingCategories={ongoingCategories}
			/>
		</div>

	);
}

export default HomePage;
