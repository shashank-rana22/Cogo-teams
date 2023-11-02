import { Button, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../commons/EmptyState';
import ProductDetailsLoading from '../../../../commons/ProductDetailsLoading';

import styles from './styles.module.css';

function ProductDetails({
	product_images = {}, product_name = '', description = '',
	dataArray = [], filtersVariation = {}, setFiltersVariation = () => {}, sizeValuePairs = [],
	after_coupon_price = '', ADD_TO_CART = '', synchronizeCart = '',
	handleBuyNow = () => {}, addedToCart = false, handleAddToCart = () => {}, selectedImage = '',
	TICK_ICON = '', colorValuePairs = [], handleVariationColor = () => {},
	handleImageClick = () => {}, office_location = '', currency_code = '', merchSize = '',
	loading = false,
}) {
	if (!loading) {
		return <ProductDetailsLoading />;
	}
	return (

		<div className={styles.main_container}>
			<div className={styles.header}>
				{isEmpty(product_images) ? <EmptyState />
					: (
						<div className={styles.product_image}>
							<div className={styles.product_select_image}>

								{isEmpty(product_images) ? null
									: (product_images || []).map((item_img) => (
										<img
											src={item_img}
											key={item_img}
											alt="cogo-merchandise"
											aria-hidden
											onClick={() => handleImageClick(item_img)}
											width="100px"
											style={{ cursor: 'pointer' }}
										/>
									))}
							</div>
							<div className={styles.product_display_image}>
								{isEmpty(product_images) || (
									<img
										src={
									selectedImage
									|| (product_images && product_images[GLOBAL_CONSTANTS.zeroth_index])
								}
										className={styles.product_main_image}
										alt="cogo-merchandise"
									/>

								)}
							</div>
						</div>
					)}
				<div className={styles.product_details}>
					<div className={styles.product_details_heading}>
						<div className={styles.product_name}>
							{product_name}
						</div>
					</div>
					<div className={styles.content_product_details}>
						{description}
					</div>
					<div className={styles.product_standard}>
						{(dataArray || []).map((item) => (
							<div className={styles.product_standard_item} key={item.key}>
								<img src={TICK_ICON} alt="tick_Icon" />
								<div className={styles.item_key}>
									{startCase(item.key)}
								</div>
								{' '}
								:
								<div className={styles.item_value}>
									{item.value}
								</div>
							</div>
						))}
					</div>

					<div className={styles.product_filters}>
						<div className={styles.product_filter_item}>
							<span>Color</span>
							<Select
								value={filtersVariation?.color_id}
								className={styles.select_filters}
								onChange={(e) => handleVariationColor(e)}
								placeholder="Select Color"
								options={colorValuePairs}
							/>
						</div>
						<div className={styles.product_filter_item}>
							<span>Size</span>
							<Select
								value={merchSize || filtersVariation?.size}
								onChange={(e) => setFiltersVariation((prev) => ({
									...prev,
									size: e,
								}))}
								className={styles.select_filters}
								placeholder="Select Size"
								options={sizeValuePairs}
							/>
						</div>
					</div>
					<div className={styles.price_section}>
						<span className={styles.discounted_price}>
							{currency_code}
							{' '}
							{ after_coupon_price }

						</span>
					</div>
					<div className={styles.selected_address}>
						<div className={styles.delivery_to_payment}>
							<IcMTick className={styles.tick_icon} />
							{' '}
							<div>
								Delivery to
								{' '}
								<span className={styles.selected_office}>
									{office_location || '-'}
									{' '}
									Office
								</span>
							</div>
						</div>
						<div className={styles.delivery_to_payment}>
							<IcMTick className={styles.tick_icon} />
							{' '}
							<div>
								Price will be conveniently adjusted with your next salary
							</div>
						</div>
					</div>

					<div className={styles.cta_buttons}>
						<Button
							size="lg"
							themeType="secondary"
							className={styles.add_to_cart}
							onClick={handleAddToCart}
						>
							<img src={ADD_TO_CART} alt="add-to-icons" />
							<span aria-hidden>
								{addedToCart ? 'Added to Cart' : 'Add to Cart'}
							</span>
						</Button>
						<Button
							size="lg"
							themeType="primary"
							className={styles.add_to_cart}
							onClick={handleBuyNow}
						>
							Buy Now
						</Button>
					</div>
					<div className={styles.functionality_cart}>
						<img
							className={styles.functionality_cart_img}
							src={synchronizeCart}
							alt="schronize_icon"
						/>
						{' '}
						<div>
							No return policy
						</div>
					</div>
					<div className={styles.functionality_cart}>
						<img
							className={styles.functionality_cart_img}
							src={ADD_TO_CART}
							alt="schronize_icon"
						/>
						{' '}
						<div>
							Free Shipping at office
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;
