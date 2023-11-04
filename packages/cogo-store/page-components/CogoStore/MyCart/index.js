import { Table, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowLeft, IcMTick } from '@cogoport/icons-react';
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

import ModalMyCart from './ModalMyCart';
import styles from './styles.module.css';

function MyCart() {
	const { push } = useRouter();
	const coupon_applied = (getCookie('apply_coupon') === 'true');

	const { data: productData, refetch } = useGetProductFilterDetail();
	const { currency_code, currency_symbol } = productData || {};
	const { color, user_details } = productData || {};
	const { office_location } = user_details || {};

	const [show, setShow] = useState(false);
	const [couponApplied, setCouponApplied] = useState(coupon_applied === true);

	const { updateCart } = useUpdateCart(refetch);
	const { placeOrder, data: orderData } = usePlaceOrder(coupon_applied);

	const { data, refetchCartDetails, loading } = useGetCartItems(coupon_applied);

	const { list, card_totals } = data || {};

	const onClose = () => {
		const payload = (list || []).map((item) => ({
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
		currency_symbol,
	});

	if (orderData) {
		return <OrderConfirmation data={orderData} office_location={office_location} />;
	}

	const getColorFromCode = (colorId) => {
		const colorName = (color || []).find((col) => col.id === colorId);
		return colorName ? colorName.hexcode : '';
	};

	return (
		<>
			<Header productData={productData} />
			<div className={styles.cart_page}>

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
									<span className={styles.btn_txt}>
										<IcMArrowLeft />
										<span>Return to Store</span>
									</span>

								</Button>
							</div>
						</div>

						<div className={styles.right_cart}>
							<div className={styles.totals}>
								<h2 className={styles.heading_total}>Cart Total</h2>

								<div className={styles.total_section}>
									<div className={styles.total_item}>
										<span className={styles.grey}>Sub-total</span>
										<span className={styles.black}>
											{currency_symbol}
											{' '}
											{card_totals?.card_total_amount}
										</span>
									</div>
									<div className={styles.total_item} style={{ paddingBottom: '8px' }}>
										<span className={styles.grey}>Shipping</span>
										<span className={styles.black}>Free</span>
									</div>
									<div className={styles.total_amount}>
										<span className={styles.black} style={{ fontSize: '16px' }}>Total</span>
										<span className={styles.black}>
											{currency_symbol}
											{' '}
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
						</div>
					</div>
					<ModalMyCart
						list={list}
						show={show}
						setShow={setShow}
						onClose={onClose}
						getColorFromCode={getColorFromCode}
						currency_code={currency_code}
						currency_symbol={currency_symbol}
					/>
				</div>
			</div>
		</>
	);
}

export default MyCart;
