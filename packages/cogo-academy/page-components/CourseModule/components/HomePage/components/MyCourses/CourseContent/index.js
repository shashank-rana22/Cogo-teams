import { Carousel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import LoadingState from '../../../../../../../commons/LoadingState';
import CourseEmptyState from '../../../../../commons/CourseEmptyState';
import BUTTON_CONTENT_MAPPING from '../../../../../configs/BUTTON_CONTENT_MAPPING';
import GET_LINK_MAPPING from '../../../../../configs/GET_LINK_MAPPING';
import useListCourseUserMappings from '../../../../../hooks/useListCourseUserMappings';
import CourseCard from '../../../../CourseCard';

function CourseContent({ activeTab, user_id, setOngoingCategories, ongoingCategories }) {
	const router = useRouter();

	const GET_LINK_MAPPINGS = GET_LINK_MAPPING({ router });

	const { data = {}, loading, fetchList } = useListCourseUserMappings({ activeTab, user_id });

	const { list = [] } = data;

	useEffect(() => {
		if (!loading && activeTab !== 'ongoing' && !ongoingCategories.loaded) {
			setOngoingCategories({ loaded: true, data: [] });
		}

		if (!loading && activeTab === 'ongoing' && !isEmpty(list)) {
			setOngoingCategories({
				loaded : true,
				data   : [...(new Set((list).map((item) => {
					const { cogo_academy_course } = item || {};

					const { course_categories } = cogo_academy_course || {};

					return course_categories.map((category) => category.id);
				}).flat()))],
			});
		}

		if (!loading && activeTab === 'ongoing' && isEmpty(list)) {
			setOngoingCategories({ loaded: true, data: [] });
		}
	}, [activeTab, list, loading, ongoingCategories.loaded, setOngoingCategories]);

	if (loading) {
		return <LoadingState rowsCount={2} />;
	}

	if (isEmpty(list)) {
		return <CourseEmptyState activeTab={activeTab} />;
	}

	const CAROUSELDATA = (list).map((item) => ({
		key    : item.id,
		render : () => (
			<CourseCard
				key={item.id}
				data={item}
				buttonContent={BUTTON_CONTENT_MAPPING[item.state] || BUTTON_CONTENT_MAPPING.default}
				handleClick={GET_LINK_MAPPINGS[item.state] || GET_LINK_MAPPINGS.default}
				fetchList={fetchList}
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
