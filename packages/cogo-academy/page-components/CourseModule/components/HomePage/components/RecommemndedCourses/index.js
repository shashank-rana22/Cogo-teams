import { Carousel } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../commons/EmptyState';
import LoadingState from '../../../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../../../configs/BUTTON_CONTENT_MAPPING';
import CourseCard from '../../../CourseCard';

import styles from './styles.module.css';
import useListCourseUserMappings from './useListCourseUserMappings';

function RecommendedComponents({ user_id, ongoingCategories = {} }) {
	const { data = {}, loading, fetchList } = useListCourseUserMappings({ user_id, ongoingCategories });

	if (loading || !ongoingCategories.loaded) {
		return <LoadingState rowsCount={2} />;
	}

	if (isEmpty(data?.list || [])) {
		return (
			<EmptyState
				emptyText="There are no recommended courses currently"
				flexDirection="column"
				textSize="18px"
			/>
		);
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
