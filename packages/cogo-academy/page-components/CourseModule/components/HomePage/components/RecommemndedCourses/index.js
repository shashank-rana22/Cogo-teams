import { Button, Carousel } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../../../configs/BUTTON_CONTENT_MAPPING';
import CourseCard from '../../../CourseCard';

import styles from './styles.module.css';
import useListCourseUserMappings from './useListCourseUserMappings';

function RecommendedComponents({ user_id, ongoingCategories = {} }) {
	const router = useRouter();

	const { data = {}, loading, fetchList } = useListCourseUserMappings({ user_id, ongoingCategories });

	if (loading || !ongoingCategories.loaded) {
		return <LoadingState rowsCount={2} />;
	}

	if (isEmpty(data?.list || [])) {
		return null;
	}

	const CAROUSELDATA = (data.list || []).map((item, index) => ({
		key    : index,
		render : () => (
			<CourseCard
				key={item.id}
				data={item}
				buttonContent={BUTTON_CONTENT_MAPPING[item.state] || BUTTON_CONTENT_MAPPING.default}
				fetchList={fetchList}
			/>
		),
	}));

	return (
		<div className={styles.container}>
			<div className={styles.category_head}>
				<div className={styles.sub_category}>Recommended for You</div>
				<Button
					themeType="tertiary"
					onClick={() => router.push('/learning/course?viewType=all_courses')}
				>
					See All
					{' '}
					<IcMArrowRight />
				</Button>
			</div>

			<Carousel
				size="md"
				slides={CAROUSELDATA}
				itemsToShow={4}
				itemsToScroll={4}
				showDots={false}
				showArrow
			/>
		</div>
	);
}

export default RecommendedComponents;
