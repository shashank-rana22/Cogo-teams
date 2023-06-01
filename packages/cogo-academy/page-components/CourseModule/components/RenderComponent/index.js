import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import AllCourses from '../AllCourses';
import HomePage from '../HomePage';

function RenderComponent({ courseCategoryData, currentCategory, setCurrentCategory, courseCategories, categoryLoading }) {
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

	return (
		<HomePage user_id={user_id} courseCategoryData={courseCategoryData} categoryLoading={categoryLoading} />

	);
}

export default RenderComponent;
