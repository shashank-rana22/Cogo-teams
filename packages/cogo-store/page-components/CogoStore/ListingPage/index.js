import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { setCookie, getCookie, isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useMemo } from 'react';

import useGetListProductVariationDetails from '../../../hooks/useGetListProductVariationDetails';
import useGetProductFilterDetail from '../../../hooks/useGetProductFilterDetail';
import useUpdateCart from '../../../hooks/useUpdateCart';
import Header from '../Header';

import ProductDetails from './ProductDetails';
import styles from './styles.module.css';

const STAR_RATING = 5;
const PERCENTAGE_HUNDRED = 100;

function ListingPage() {
	const { ADD_TO_CART, TICK_ICON, SYNCHRONIZE_CART, COUPON_ICON } = GLOBAL_CONSTANTS.image_url;
	const { push, query } = useRouter();
	const [selectedImage, setSelectedImage] = useState(null);
	const [addedToCart, setAddedToCart] = useState(false);

	let dataArray = [];

	const { data: productData, loading:productFilterLoading = false, refetch } = useGetProductFilterDetail();

	const [applyCoupon, setApplyCoupon] = useState(getCookie('apply_coupon') === 'true');

	const {
		data: productDataDetails,
		filtersVariation = {},
		setFiltersVariation = () => { },
		loading:productVariationLoading = false,
	} = useGetListProductVariationDetails();

	const { user_details, currency_code, currency_symbol } = productData || {};

	const { office_location } = user_details || {};

	const { updateCart } = useUpdateCart(refetch);

	const {
		after_coupon_price, product_images, description, discounted_price, documentation,
		price,
		product_name,
		id: addCartId,
		size: merchSize,
		available_colors,
		available_sizes,
		color_id,
		size_chart,
	} = productDataDetails || {};

	const selectedColors = useMemo(() => (available_colors || []).map((colorId) => ({
		label: (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div
					className={styles.color_dot}
					style={{
						backgroundColor : colorId.hexcode,
						width           : '15px',
						height          : '15px',
						borderRadius    : '10px',
						marginRight     : '10px',
					}}
				/>
				{colorId.name}
			</div>
		),
		value: colorId.id,
	})), [available_colors]);

	const sizeValuePairs = useMemo(() => (available_sizes || []).map((sizeAvail) => ({
		label : sizeAvail,
		value : sizeAvail,
	})), [available_sizes]);

	const discount_percentage = (
		((price - after_coupon_price) / price) * PERCENTAGE_HUNDRED)
		.toFixed(GLOBAL_CONSTANTS.two);

	if (documentation) {
		dataArray = Object?.keys(documentation).map((key) => ({
			key,
			value: documentation[key],
		}));
	}

	const handleImageClick = (item_img) => {
		setSelectedImage(item_img);
	};

	const handleApplyClick = () => {
		setCookie('apply_coupon', !applyCoupon);
		setApplyCoupon(!applyCoupon);
	};

	const handleAddToCart = async () => {
		if (!addedToCart) {
			const payload = [
				{
					product_variation_id : addCartId,
					quantity             : GLOBAL_CONSTANTS.one,
				},
			];
			setAddedToCart(true);
			await updateCart({ payload });
		}
	};

	const handleBuyNow = () => {
		handleAddToCart();
		push('/cogo-merch/my-cart');
	};

	const handleVariationColor = (e) => {
		if (!isEmpty(e)) {
			setFiltersVariation((prev) => ({
				...prev,
				color_id: e,
			}));
			const { product_id = '' } = query || {};
			push('/cogo-merch/[product_id]', `/cogo-merch/${product_id}?colorId=${e}`);
		}
		setAddedToCart(false);
	};

	useEffect(() => {
		if (!isEmpty(product_images)) {
			setSelectedImage(product_images[GLOBAL_CONSTANTS.zeroth_index]);
		}
	}, [product_images]);

	useEffect(() => {
		if (!isEmpty(color_id?.id)) {
			setFiltersVariation((prev) => ({ ...prev, color_id: color_id?.id }));
		}
	}, [color_id?.id, setFiltersVariation]);

	return (
		<div className={styles.listing_page}>
			<Header productData={productData} />
			<ProductDetails
				product_images={product_images}
				product_name={product_name}
				description={description}
				dataArray={dataArray}
				filtersVariation={filtersVariation}
				merchSize={merchSize}
				setFiltersVariation={setFiltersVariation}
				sizeValuePairs={sizeValuePairs}
				discounted_price={discounted_price}
				applyCoupon={applyCoupon}
				after_coupon_price={after_coupon_price}
				price={price}
				discount_percentage={discount_percentage}
				ADD_TO_CART={ADD_TO_CART}
				synchronizeCart={SYNCHRONIZE_CART}
				handleBuyNow={handleBuyNow}
				addedToCart={addedToCart}
				handleAddToCart={handleAddToCart}
				selectedImage={selectedImage}
				STAR_RATING={STAR_RATING}
				TICK_ICON={TICK_ICON}
				office_location={office_location}
				colorValuePairs={selectedColors}
				handleVariationColor={handleVariationColor}
				COUPON_ICON={COUPON_ICON}
				handleApplyClick={handleApplyClick}
				handleImageClick={handleImageClick}
				currency_code={currency_code}
				currency_symbol={currency_symbol}
				loading={productVariationLoading || productFilterLoading}
				setAddedToCart={setAddedToCart}
				size_chart={size_chart}
			/>
		</div>
	);
}

export default ListingPage;
