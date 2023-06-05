import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import BUTTON_CONTENT_MAPPING from '../../../../configs/BUTTON_CONTENT_MAPPING';
import GET_LINK_MAPPING from '../../../../configs/GET_LINK_MAPPING';
import useListCourseUserMappings from '../../../../hooks/useListCourseUserMappings';
import CourseCard from '../../../CourseCard';

const useHandleSimilarCourses = ({ course_details }) => {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const router = useRouter();

	const GET_LINK_MAPPINGS = GET_LINK_MAPPING({ router });

	const topics = [];
	course_details?.faq_topics?.map((item) => (
		topics.push(item?.id)
	));

	const {
		data = {},
		loading,
		fetchList,
	} = useListCourseUserMappings({
		selected   : topics,
		page_limit : 10,
		user_id,
	});

	const CAROUSELDATA = (data.list || []).map((item, index) => ({
		key    : index,
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

	return {
		loading,
		CAROUSELDATA,
		data,
	};
};

export default useHandleSimilarCourses;
