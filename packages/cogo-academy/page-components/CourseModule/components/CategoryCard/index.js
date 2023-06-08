import { Carousel } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../commons/LoadingState';
import EmptyState from '../../commons/EmptyState';

import CategoriesCard from './component/CategoriesCard';
import styles from './styles.module.css';

function CategoryCard({ courseCategoryData = {}, categoryLoading, setCurrentCategory }) {
	if (categoryLoading) {
		return <LoadingState rowsCount={2} />;
	}

	if (isEmpty(courseCategoryData.list || [])) {
		return (
			<EmptyState
				emptyText="Categories not found"
				flexDirection="column"
			/>
		);
	}

	const CAROUSELDATA = (courseCategoryData?.list || []).map((item) => ({
		key    : item?.id,
		render : () => (
			<CategoriesCard
				key={item?.id}
				data={item}
				setCurrentCategory={setCurrentCategory}
			/>
		),
	}));

	return (
		<div className={styles.carousel_container}>
			<Carousel
				size="md"
				slides={CAROUSELDATA}
				itemsToShow={8}
				itemsToScroll={8}
				showDots={false}
				showArrow
			/>
		</div>
	);
}

export default CategoryCard;
