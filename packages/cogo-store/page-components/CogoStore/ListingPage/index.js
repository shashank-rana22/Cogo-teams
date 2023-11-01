import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { setCookie, getCookie } from '@cogoport/utils';
import React, { useState, useEffect, useMemo } from 'react';

import useGetListProductVariationDetails from '../../../hooks/useGetListProductVariationDetails';
import useGetProductDetailsList from '../../../hooks/useGetProductDetailsList';
import useGetProductFilterDetail from '../../../hooks/useGetProductFilterDetail';
import useUpdateCart from '../../../hooks/useUpdateCart';
import Header from '../Header';

import ProductDetails from './ProductDetails';
import styles from './styles.module.css';

const STAR_RATING = 5;
const PERCENTAGE_HUNDRED = 100;

function ListingPage() {
	const { ADD_TO_CART, TICK_ICON, SYNCHRONIZE_CART, COUPON_ICON } = GLOBAL_CONSTANTS.image_url;
	const { push } = useRouter();
	const [selectedImage, setSelectedImage] = useState(null);
	const [addedToCart, setAddedToCart] = useState(false);
	let dataArray = [];
	const { data, loading:productDetailLoading = false } = useGetProductDetailsList();

	const { data: productData, loading:productFilterLoading = false } = useGetProductFilterDetail();

	const [applyCoupon, setApplyCoupon] = useState(getCookie('apply_coupon') === 'true');
	const { list: productList } = data || {};

	const {
		data: productDataDetails,
		filtersVariation = {},
		setFiltersVariation = () => { },
		loading:productVariationLoading = false,
	} = useGetListProductVariationDetails();

	const { product_id } = productDataDetails || {};

	const product = (productList || []).find((prod) => prod.id === product_id);

	const { available_colors, available_sizes } = product || {};

	const { color, user_details, currency_code } = productData || {};

	const { office_location } = user_details || {};

	const selectedColors = useMemo(() => (available_colors || []).map((colorId) => {
		const colorData = (color || []).find((c) => c.id === colorId);
		return colorData ? { name: colorData.name, hexcode: colorData.hexcode, id: colorData.id } : null;
	}), [available_colors, color]);

	const colorValuePairs = useMemo(() => (selectedColors || []).map((colorTheme) => ({
		label : colorTheme?.name,
		value : colorTheme?.id,
	})), [selectedColors]);

	const sizeValuePairs = useMemo(() => (available_sizes || []).map((sizeAvail) => ({
		label : sizeAvail,
		value : sizeAvail,
	})), [available_sizes]);

	const { updateCart } = useUpdateCart();

	const {
		after_coupon_price, product_images, description, discounted_price, documentation,
		price,
		product_name,
		id: addCartId,
		size: merchSize,
		color_id: merchColor,
	} = productDataDetails || {};
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
		push('/cogo-store/my-cart');
	};

	const handleVariationColor = (e) => {
		setFiltersVariation((prev) => ({
			...prev,
			color_id: e,
		}));
	};

	useEffect(() => {
		if ((product_images || []).length > 0) {
			setSelectedImage(product_images[0]);
		}
	}, [product_images]);

	return (
		<div className={styles.listing_page}>
			<Header />
			<ProductDetails
				product_images={product_images}
				product_name={product_name}
				description={description}
				dataArray={dataArray}
				filtersVariation={filtersVariation}
				merchColor={merchColor}
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
				colorValuePairs={colorValuePairs}
				handleVariationColor={handleVariationColor}
				COUPON_ICON={COUPON_ICON}
				handleApplyClick={handleApplyClick}
				handleImageClick={handleImageClick}
				currency_code={currency_code}
				loading={productVariationLoading || productFilterLoading || productDetailLoading}
			/>
		</div>
	);
}

export default ListingPage;
