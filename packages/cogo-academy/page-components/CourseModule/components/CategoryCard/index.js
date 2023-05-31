import { Carousel } from '@cogoport/components';
import React from 'react';

import CategoriesCard from './component/CategoriesCard';
import styles from './styles.module.css';

function CategoryCard({ CourseCategoryData }) {
	// // const CAROUSELDATA = (CourseCategoryData?.list || []).map((item) => ({
	// // 	key    : item?.id,
	// // 	render : () => (
	// // 		<CategoriesCard
	// // 			key={item?.id}
	// // 			data={item}
	// // 		/>
	// // 	),
	// // }));

	// return (
	// 	<div className={styles.conatiner}>
	// 		<div className={styles.carousel_container}>
	// 			<Carousel
	// 				size="md"
	// 				slides={CAROUSELDATA}
	// 				itemsToShow={8}
	// 				itemsToScroll={4}
	// 				showDots={false}
	// 				showArrow
	// 			/>
	// 		</div>
	// 	</div>
	return <h1>hello</h1>;
}

export default CategoryCard;
