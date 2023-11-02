import { Carousel } from '@cogoport/components';
import React from 'react';

import CarouselData from '../../commons/CarouselData';
import useGetListProductDetail from '../../hooks/useGetListProductDetail';
import useGetProductFilterDetail from '../../hooks/useGetProductFilterDetail';

import Header from './Header';
import HomePageContent from './HomePageContent';
import styles from './styles.module.css';

function CogoStore() {
	const { data, filters, setFilters, loading } = useGetListProductDetail();
	const { data: productData } = useGetProductFilterDetail();
	return (
		<div className={styles.container}>
			<Header />
			<Carousel
				size="md"
				slides={CarouselData}
				autoScroll
				timeInterval={20000}
				showArrow={false}
				showDots={false}
			/>
			<HomePageContent
				data={data}
				filters={filters}
				setFilters={setFilters}
				productData={productData}
				loading={loading}
			/>
		</div>
	);
}

export default CogoStore;
