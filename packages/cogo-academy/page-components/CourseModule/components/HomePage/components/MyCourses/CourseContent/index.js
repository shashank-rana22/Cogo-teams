import { Carousel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import LoadingState from '../../../../../../../commons/LoadingState';
import CourseEmptyState from '../../../../../commons/CourseEmptyState';
import BUTTON_CONTENT_MAPPING from '../../../../../configs/BUTTON_CONTENT_MAPPING';
import HANDLE_CLICK_MAPPING from '../../../../../configs/HANDLE_CLICK_MAPPING';
import useListCourseUserMappings from '../../../../../hooks/useListCourseUserMappings';
import CourseCard from '../../../../CourseCard';

function CourseContent({ activeTab, user_id, setOngoingCategories, ongoingCategories, inputValue }) {
	const router = useRouter();

	const HANDLE_CLICK_MAPPINGS = HANDLE_CLICK_MAPPING({ router });

	const { data = {}, loading } = useListCourseUserMappings({ activeTab, inputValue, user_id });

	useEffect(() => {
		if (!loading && activeTab !== 'ongoing' && !ongoingCategories.loaded) {
			setOngoingCategories({ loaded: true, data: [] });
		}

		if (!loading && activeTab === 'ongoing' && !isEmpty(data?.list || [])) {
			setOngoingCategories({
				loaded : true,
				data   : [...(new Set((data?.list || []).map((item) => {
					const { cogo_academy_course } = item || {};

					const { course_categories } = cogo_academy_course || {};

					return course_categories.map((category) => category.id);
				}).flat()))],
			});
		}
	}, [activeTab, data?.list, loading, ongoingCategories.loaded, setOngoingCategories]);

	if (loading) {
		return <LoadingState rowsCount={2} />;
	}

	if (isEmpty(data?.list)) {
		return <CourseEmptyState activeTab={activeTab} />;
	}

	const CAROUSELDATA = (data.list || []).map((item, index) => ({
		key    : index,
		render : () => (
			<CourseCard
				key={item.id}
				data={item}
				buttonContent={BUTTON_CONTENT_MAPPING[activeTab]}
				handleClick={HANDLE_CLICK_MAPPINGS[activeTab]}
				activeTab={activeTab}
			/>
		),
	}));

	return (
		<Carousel
			size="md"
			slides={CAROUSELDATA}
			itemsToShow={4}
			itemsToScroll={4}
			showDots={false}
			showArrow
		/>
	);
}

export default CourseContent;
