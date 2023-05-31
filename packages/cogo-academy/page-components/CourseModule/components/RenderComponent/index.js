import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import AllCourses from '../AllCourses';
import HomePage from '../HomePage';

function RenderComponent({ CourseCategoryData, currentCategory, setCurrentCategory, courseCategories }) {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const { query } = useRouter();

	const { viewType = '' } = query;

	if (viewType === 'all_courses') {
		return (
			<AllCourses
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
				courseCategories={courseCategories}
			/>
		);
	}
	{ /* <HomePage user_id={user_id} CourseCategoryData={CourseCategoryData} /> */ }
	return (
		<HomePage user_id={user_id} CourseCategoryData={CourseCategoryData} />

	);
}

export default RenderComponent;
