import { Button, Carousel } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../commons/LoadingState';

import CategoriesCard from './component/CategoriesCard';
import styles from './styles.module.css';

function CategoryCard({ courseCategoryData = {}, categoryLoading, setCurrentCategory }) {
	const router = useRouter();

	const { list = [] } = courseCategoryData || {};

	if (categoryLoading) {
		return <LoadingState rowsCount={2} />;
	}

	if (isEmpty(list)) {
		return null;
	}

	const CAROUSELDATA = (list).map((item) => ({
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
		<div className={styles.container}>
			<div className={styles.main_heading}>Explore Courses</div>

			<div className={styles.category_head}>
				<div className={styles.sub_category}>By Category</div>

				<Button
					themeType="tertiary"
					onClick={() => router.push('/learning/course?viewType=all_courses')}
				>
					See All
					{' '}
					<IcMArrowRight />
				</Button>
			</div>

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
		</div>
	);
}

export default CategoryCard;
