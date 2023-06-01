import { Carousel } from '@cogoport/components';
import React from 'react';

import LoadingState from '../../../../commons/LoadingState';

import CategoriesCard from './component/CategoriesCard';
import styles from './styles.module.css';

function CategoryCard({ courseCategoryData, categoryLoading, setCurrentCategory }) {
	if (categoryLoading) {
		return <LoadingState />;
	}

	const CAROUSELDATA = (courseCategoryData?.list || []).map((item, index) => ({
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
