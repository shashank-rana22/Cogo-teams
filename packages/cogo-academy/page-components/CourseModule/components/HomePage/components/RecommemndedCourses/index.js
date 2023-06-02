import { Carousel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../commons/EmptyState';
import LoadingState from '../../../../commons/LoadingState';
import BUTTON_CONTENT_MAPPING from '../../../../configs/BUTTON_CONTENT_MAPPING';
import HANDLE_CLICK_MAPPING from '../../../../configs/HANDLE_CLICK_MAPPING';
import CourseCard from '../../../CourseCard';

import styles from './styles.module.css';
import useListCourseUserMappings from './useListCourseUserMappings';

function RecommendedComponents({ user_id, ongoingCategories, inputValue }) {
	const router = useRouter();

	const HANDLE_CLICK_MAPPINGS = HANDLE_CLICK_MAPPING({ router });

	const { data = {}, loading } = useListCourseUserMappings({ user_id, ongoingCategories, inputValue });

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
				handleClick={HANDLE_CLICK_MAPPINGS[item.state] || HANDLE_CLICK_MAPPINGS.default}
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
