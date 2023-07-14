import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import AllCourses from '../AllCourses';
import HomePage from '../HomePage';

function RenderComponent({
	courseCategoryData,
	currentCategory,
	setCurrentCategory,
	courseCategories,
	categoryLoading,
	query: inputValue,
}) {
	const {
		user: { id: user_id },
	} = useSelector((state) => state.profile);

	const { query } = useRouter();

	const { viewType = '' } = query;

	if (viewType === 'all_courses' || inputValue) {
		return (
			<AllCourses
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
				courseCategories={courseCategories}
				inputValue={inputValue}
			/>
		);
	}

	return (
		<HomePage
			user_id={user_id}
			courseCategoryData={courseCategoryData}
			setCurrentCategory={setCurrentCategory}
			categoryLoading={categoryLoading}
		/>
	);
}

export default RenderComponent;
