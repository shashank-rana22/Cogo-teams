import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { setCookie, getCookie } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useGetListProductDetail from '../../../hooks/useGetListProductDetail';
import useGetListProductVariationDetails from '../../../hooks/useGetListProductVariationDetails';
import useGetProductFilterDetail from '../../../hooks/useGetProductFilterDetail';
import useUpdateCart from '../../../hooks/useUpdateCart';
import Header from '../Header';

import ProductDetails from './ProductDetails';
import styles from './styles.module.css';

const TICK_ICON = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Ok.svg';
const ADD_TO_CART = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/AddCart';
const SYNCHRONIZE_CART = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Synchronize.svg';
const COUPON_ICON = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/percentageCoupon.svg';
const STAR_RATING = 5;
const PERCENTAGE_HUNDRED = 100;

function ListingPage() {
	const { push } = useRouter();
	const [selectedImage, setSelectedImage] = useState(null);
	const [addedToCart, setAddedToCart] = useState(false);
	let dataArray = [];
	const { data, loading:productDetailLoading = false } = useGetListProductDetail();
	console.log('datadata', data);

	const { data: productData, loading:productFilterLoading = false } = useGetProductFilterDetail();
	console.log(productData, 'listProduce');

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

	console.log('productList', productList);

	const { available_colors, available_sizes } = product || {};
	// const { availableColors, availableSizes } = (productList || []).reduce(
	// 	(acc, curr) => {
	// 		const { available_colors, available_sizes } = curr;

	// 		acc.availableColors = Array.from(new Set([...acc.availableColors, ...(available_colors || [])]));
	// 		acc.availableSizes = Array.from(new Set([...acc.availableSizes, ...(available_sizes || [])]));

	// 		return acc;
	// 	},
	// 	{ availableSizes: [], availableColors: [] },
	// );

	const { color, user_details, currency_code } = productData || {};

	const { office_location } = user_details || {};

	const selectedColors = (available_colors || []).map((colorId) => {
		const colorData = (color || []).find((c) => c.id === colorId);
		return colorData ? { name: colorData.name, hexcode: colorData.hexcode, id: colorData.id } : null;
	});

	const colorValuePairs = (selectedColors || []).map((colorTheme) => ({
		label : colorTheme?.name,
		value : colorTheme?.id,
	}));

	const sizeValuePairs = (available_sizes || []).map((sizeAvail) => ({
		label : sizeAvail,
		value : sizeAvail,
	}));

	console.log(colorValuePairs, 'valPairSize');
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
				SYNCHRONIZE_CART={SYNCHRONIZE_CART}
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
