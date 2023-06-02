import { Carousel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import LoadingState from '../../../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../../../configs/BUTTON_CONTENT_MAPPING';
import GET_LINK_MAPPING from '../../../../configs/GET_LINK_MAPPING';
import useListCourseUserMappings from '../../../../hooks/useListCourseUserMappings';
import CourseCard from '../../../CourseCard';

import styles from './styles.module.css';

function SimilarCourses({ course_details }) {
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
				buttonContent={BUTTON_CONTENT_MAPPING[item.state || 'default']}
				handleClick={GET_LINK_MAPPINGS[item.state || 'default']}
				fetchList={fetchList}
			/>
		),
	}));

	if (loading) {
		return <LoadingState rowsCount={2} />;
	}
	return (
		<div className={styles.container}>
			<b>Similar Courses</b>

			<div className={styles.carousel_container}>
				<Carousel
					size="md"
					slides={CAROUSELDATA}
					itemsToShow={4}
					itemsToScroll={4}
					showDots={false}
					showArrow
				/>
			</div>
		</div>
	);
}

export default SimilarCourses;
