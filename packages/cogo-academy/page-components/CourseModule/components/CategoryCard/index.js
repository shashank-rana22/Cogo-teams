import { Carousel } from '@cogoport/components';
import React from 'react';

import LoadingState from '../../../../commons/LoadingState';

import CategoriesCard from './component/CategoriesCard';
import styles from './styles.module.css';

function CategoryCard({ courseCategoryData, categoryLoading }) {
	if (categoryLoading) {
		return <LoadingState />;
	}

	const CAROUSELDATA = (courseCategoryData?.list || []).map((item, index) => ({
		key    : item?.id,
		render : () => (
			<CategoriesCard
				key={item?.id}
				data={item}
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

export default CategoryCard;
