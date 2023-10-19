import { Button, Pill, RatingComponent, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../commons/EmptyState';

import styles from './styles.module.css';

function ProductDetails({
	product_images = {}, product_name = '', description = '',
	dataArray = [], filtersVariation = {}, setFiltersVariation = () => {}, sizeValuePairs = [],
	discounted_price = '', applyCoupon = false, after_coupon_price = '',
	price = '', discount_percentage = '', ADD_TO_CART = '', SYNCHRONIZE_CART = '',
	handleBuyNow = () => {}, addedToCart = false, handleAddToCart = () => {}, selectedImage = '',
	STAR_RATING = '', TICK_ICON = '', colorValuePairs = [], handleVariationColor = () => {}, COUPON_ICON = '',
	handleApplyClick = () => {},
	handleImageClick = () => {},
}) {
	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<div className={styles.product_image}>
					<div className={styles.product_select_image}>

						{isEmpty(product_images) ? <EmptyState />
							: (product_images || []).map((item_img) => (
								<img
									src={item_img}
									key={item_img}
									alt="cogo-merchandise"
									aria-hidden
									onClick={() => handleImageClick(item_img)}
									width="100px"
								/>
							))}
					</div>
					<div className={styles.product_display_image}>
						{isEmpty(product_images) ||	(
							<img
								src={
                            selectedImage
                            || (product_images && product_images[GLOBAL_CONSTANTS.zeroth_index])
                            }
								alt="cogo-merchandise"
								width="400px"
								style={{ marginLeft: '30px', borderRadius: '10px' }}
							/>

						)}
					</div>
				</div>
				<div className={styles.product_details}>
					<div className={styles.product_details_heading}>
						<div className={styles.product_name}>
							{product_name}
						</div>
						<div className={styles.product_review_rating}>
							<RatingComponent
								type="star"
								totalStars={5}
								value={STAR_RATING}
								disabled
								className={styles.star_rating}
							/>

							<span style={{ marginLeft: '8px' }}>
								(45 reviews)
							</span>
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
								onChange={(e) => handleVariationColor(e)}
								placeholder="Select Color"
								options={colorValuePairs}
							/>
						</div>
						<div className={styles.product_filter_item}>
							<span>Size</span>
							<Select
								value={filtersVariation?.size}
								onChange={(e) => setFiltersVariation((prev) => ({
									...prev,
									size: e,
								}))}
								placeholder="Select Size"
								options={sizeValuePairs}
							/>
						</div>
					</div>
					<div className={styles.price_section}>
						{!discounted_price ? ''
							: (
								<>
									<span className={styles.discounted_price}>
										₹
										{' '}
										{applyCoupon ? after_coupon_price : discounted_price}

									</span>
									<span className={styles.actual_price}>
										₹
										{' '}
										{price}
									</span>

									{!applyCoupon && (
										<Pill size="md" color="orange">
											-
											{discount_percentage}
											% OFF
											{' '}
										</Pill>
									)}
								</>
							)}
					</div>
					<div className={styles.add_coupon_section}>
						<img src={COUPON_ICON} alt="coupon-icon" />
						<span className={styles.add_coupon_text}>
							Get this for
							{' '}
							<span className={styles.add_coupon_bold}>
								₹
								{' '}
								{after_coupon_price}

							</span>
							{' '}
							with coupon code
							{' '}
							<span className={styles.add_coupon_bold}>EMPLOYEE DISCOUNT</span>
							{' '}
						</span>
						<span
							className={styles.apply_coupon}
							onClick={() => { handleApplyClick(); }}
							role="presentation"
						>
							{applyCoupon ? 'Remove' : 'Apply Coupon'}
						</span>
					</div>
					<div className={styles.selected_address}>
						<div className={styles.delivery_to_payment}>
							<IcMTick className={styles.tick_icon} />
							{' '}
							<div>
								Delivery to
								{' '}
								<span className={styles.selected_office}>Mumbai Office</span>
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
						<Button size="lg" themeType="secondary" className={styles.add_to_cart}>
							<img src={ADD_TO_CART} alt="add-to-icons" />
							<span onClick={handleAddToCart} aria-hidden>
								{addedToCart ? 'Added to Cart' : 'Add to Cart'}
							</span>
						</Button>
						<Button
							size="lg"
							themeType="primary"
							className={styles.add_to_cart}
								// onClick={() => { push('/cogo-store/my-cart'); }}
							onClick={handleBuyNow}
						>
							Buy Now
						</Button>
					</div>
					<div className={styles.functionality_cart}>
						<div className={styles.functionality_cart_wrap}>
							<img
								className={styles.functionality_cart_img}
								src={SYNCHRONIZE_CART}
								alt="schronize_icon"
							/>
						</div>
						{' '}
						<div>
							3 day return policy
						</div>
					</div>
					<div className={styles.functionality_cart}>
						<div className={styles.functionality_cart_wrap}>
							<img
								className={styles.functionality_cart_img}
								src={ADD_TO_CART}
								alt="schronize_icon"
							/>
						</div>
						{' '}
						<div>
							Free Shipping for Cogoport Employees
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;
