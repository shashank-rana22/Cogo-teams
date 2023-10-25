import { Table, Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMTick, IcMError } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { getCookie, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../commons/EmptyState';
import getMyCartColumns from '../../../commons/MyCartColumns/getMyCartColumns';
import useGetCartItems from '../../../hooks/useGetCartItems';
import useGetProductFilterDetail from '../../../hooks/useGetProductFilterDetail';
import usePlaceOrder from '../../../hooks/usePlaceOrder';
import useUpdateCart from '../../../hooks/useUpdateCart';
import Header from '../Header';
import OrderConfirmation from '../OrderConfirmation';

import styles from './styles.module.css';

function MyCart() {
	const { push } = useRouter();
	// const coupon_applied = window.sessionStorage.getItem('apply_coupon');
	const coupon_applied = (getCookie('apply_coupon') === 'true');

	const { data: productData } = useGetProductFilterDetail();
	const { currency_code } = productData || {};
	const { color, user_details } = productData || {};
	const { office_location } = user_details || {};

	const [show, setShow] = useState(false);
	const [couponApplied, setCouponApplied] = useState(coupon_applied === true);

	const { updateCart } = useUpdateCart();
	const { placeOrder, data: orderData } = usePlaceOrder(coupon_applied);

	const { data, refetchCartDetails, loading } = useGetCartItems(coupon_applied);

	const { list, card_totals } = data || {};

	const onClose = () => {
		const payload = list.map((item) => ({
			product_variation_id : item.id,
			quantity             : item.quantity,
			sub_total_amount     : item.sub_total_amount,
		}));
		placeOrder({ payload, total: card_totals?.card_total_amount });
		setShow(false);
	};
	const columns = getMyCartColumns({
		data,
		refetchCartDetails,
		updateCart,
		setCouponApplied,
		couponApplied,
		color,
		currency_code,
	});

	if (orderData) {
		return <OrderConfirmation data={orderData} office_location={office_location} />;
	}

	// const handleRemoveCoupon = () => {
	// 	setCookie('apply_coupon', false);
	// 	setCouponApplied(false);
	// };

	const getColorFromCode = (colorId) => {
		const colorName = (color || []).find((col) => col.id === colorId);
		return colorName ? colorName.hexcode : '';
	};
	console.log(couponApplied, 'appliedCoupon');
	return (
		<div className={styles.cart_page}>
			<Header />
			<div className={styles.container}>

				<div className={styles.cart_header}>
					<img src={GLOBAL_CONSTANTS.image_url.cart} alt="" width="18px" height="18px" />
					<div className={styles.header_text}>
						My Cart
					</div>
				</div>

				<div className={styles.cart_body}>
					<div className={styles.shopping_card}>
						<div className={styles.shopping_card_header}>
							Shopping Card
						</div>
						<div className={styles.table_container}>
							{!isEmpty(list) || loading ? (
								<Table
									columns={columns}
									data={list || []}
									loading={loading}
								/>
							)
								: <EmptyState />}
						</div>
						<div className={styles.table_footer}>
							<Button
								themeType="secondary"
								onClick={() => push('/cogo-store')}
							>
								<span className={styles.btn_txt}>Return to Store</span>

							</Button>
						</div>
					</div>

					<div className={styles.right_cart}>
						<div className={styles.totals}>
							<h2 className={styles.heading_total}>Cart Totals</h2>

							<div className={styles.total_section}>
								<div className={styles.total_item}>
									<span className={styles.grey}>Sub-total</span>
									<span className={styles.black}>
										{currency_code}
										{card_totals?.card_sub_total_amount}
									</span>
								</div>
								<div className={styles.total_item}>
									<span className={styles.grey}>Shipping</span>
									<span className={styles.black}>Free</span>
								</div>
								{/* <div className={styles.total_item}>
									<span className={styles.grey}>Discount</span>
									<span className={styles.black}>{`₹${card_totals?.card_total_discount}`}</span>
								</div> */}
								<div className={styles.total_item} style={{ paddingBottom: '8px' }}>
									<span className={styles.grey}>Tax</span>
									<span className={styles.black}>
										{currency_code}
										{card_totals?.taxes}
									</span>
								</div>
								<div className={styles.total_amount}>
									<span className={styles.black} style={{ fontSize: '16px' }}>Total</span>
									<span className={styles.black}>
										{currency_code}
										{card_totals?.card_total_amount}
									</span>
								</div>
								<div className={styles.adjustment_tag}>
									<IcMTick width={20} height={20} style={{ marginRight: '4px' }} />
									<span>
										Price will be conveniently adjusted with your
										next salary
									</span>
								</div>
								<Button
									className={styles.confirm_order}
									onClick={() => { setShow(true); }}
									disabled={card_totals?.card_total_amount === GLOBAL_CONSTANTS.zeroth_index}
								>
									<span style={{ fontSize: '16px' }}>
										Confirm Order
									</span>
								</Button>

							</div>

						</div>

						{/* <div className={styles.totals}>

							<h3 className={styles.heading_total}>Coupon Code</h3>

							<div className={styles.coupon}>

								<div className={styles.coupon_left}>
									{couponApplied

										? (
											<>
												<IcCFtick with={16} height={16} style={{ margin: '0px 4px' }} />
												<span>EMPLOYEE DISCOUNT</span>
												{' '}
											</>
										)
										: (<span />)}

								</div>
								{couponApplied
									&& (
										<Button
											themeType="tertiary"
											onClick={handleRemoveCoupon}
										>
											Remove
										</Button>
									)}
							</div>
							{!couponApplied
								&& (
									<Button
										themeType="accent"
										className={styles.apply_coupon}
										onClick={() => {
											setCookie('apply_coupon', true);
											setCouponApplied(true);
										}}
									>
										Apply Coupon

								</Button>
							)}
						</div> */}

					</div>
				</div>
				<Modal size="md" show={show} onClose={onClose} placement="center">
					<Modal.Body>
						<IcMError
							className={styles.error_icon}
							height={60}
							width={60}
						/>

						<div className={styles.modal_q}>Are you sure you want to place your order?</div>
						{(list || []).map((item) => (
							<div className={styles.products} key={item.id}>
								<img
									src={item?.product_images[GLOBAL_CONSTANTS.zeroth_index]}
									alt=""
									height="80px"
									width="80px"
								/>
								<div className={styles.products_right}>
									<div className={styles.black}>{item.product_name}</div>
									<div className={styles.dot_list}>
										<span>Colour</span>
										<div
											className={styles.color_dot}
											style={{
												backgroundColor : `${getColorFromCode(item.color_id)}`,
												border          : '1px solid black',
											}}
										/>
										<span>{item.size}</span>
										<span style={{ marginLeft: '4px' }}>{` x${item.quantity}`}</span>
									</div>
								</div>
							</div>
						))}
					</Modal.Body>
					<Modal.Footer>
						<Button
							themeType="secondary"
							onClick={() => setShow(false)}
							className={styles.cancel_btn}
						>
							Cancel

						</Button>
						<Button themeType="accent" onClick={onClose}>Yes,Proceed</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
}

export default MyCart;
