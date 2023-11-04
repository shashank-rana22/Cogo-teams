import { Input, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMMinus, IcMPlus, IcCFcrossInCircle } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const getMyCartColumns = ({
	updateCart = () => {},
	refetchCartDetails = () => {},
	setCouponApplied = () => {},
	color = [],
	currency_symbol,
}) => ([
	{
		Header   : 'PRODUCTS',
		accessor : (item = {}) => {
			const getColorFromCode = (colorId) => {
				const colorName = (color || []).find((col) => col.id === colorId);
				return colorName ? colorName?.hexcode : '';
			};
			return (
				<div className={styles.products}>
					<img src={item.product_images[GLOBAL_CONSTANTS.zeroth_index]} alt="" width="80px" height="80px" />
					<div className={styles.products_right}>
						<div className={styles.black}>{item.product_name}</div>
						<div className={styles.dot_list}>
							<span>Color</span>
							<div
								className={styles.color_dot}
								key={item.color_id}
								style={{
									backgroundColor : `${getColorFromCode(item?.color_id)}`,
									border          : '1px solid rgba(0,0,0,.2)',
								}}
							/>
							<span>{item?.size}</span>
						</div>
					</div>
				</div>
			);
		},
		id: 'products',
	},
	{
		Header   : 'PRICE',
		accessor : (item = {}) => (
			<div className={styles.dot_list}>
				<div className={styles.amt_black}>
					{currency_symbol}
					{' '}
					{item?.after_coupon_price}
				</div>
			</div>
		),
		id: 'price',
	},
	{
		Header   : 'QUANTITY',
		accessor : (item = {}) => {
			const handleIncrease = async () => {
				if (item.quantity <= 5) {
					const quantity = item.quantity + GLOBAL_CONSTANTS.one;
					const payload = [
						{
							product_variation_id: item?.id,
							quantity,
						},
					];
					await updateCart({ payload, showToast: false });
					refetchCartDetails();
				} else {
					Toast.error('Quantity limit exceeded');
				}
			};

			const handleDecrease = async () => {
				const quantity = (item?.quantity) >= GLOBAL_CONSTANTS.one
					? (item.quantity) - GLOBAL_CONSTANTS.one : GLOBAL_CONSTANTS.zeroth_index;
				const payload = [
					{
						product_variation_id: item?.id,
						quantity,
					},
				];
				await updateCart({ payload, showToast: false });
				refetchCartDetails();
			};
			return (
				<div className={styles.quantity_control}>
					<Input
						prefix={(
							<IcMMinus
								onClick={handleDecrease}
								width={16}
								height={16}
								style={{ marginLeft: '4px', cursor: 'pointer' }}
							/>
						)}
						suffix={(
							<IcMPlus
								onClick={handleIncrease}
								width={16}
								height={16}
								style={{ marginRight: '4px', cursor: 'pointer' }}
							/>
						)}
						style={{ width: '90px' }}
						value={item.quantity}
						disabled
						placeholder="1"
					/>
				</div>

			);
		},
		id: 'quantity',
	},
	{
		Header   : 'SUB-TOTAL',
		accessor : (item = {}) => {
			const deleteItem = async () => {
				const payload = [
					{
						product_variation_id : item?.id,
						quantity             : 0,
					},
				];
				await updateCart({ payload, itemRemoved: true });
				setCouponApplied(false);
				refetchCartDetails();
			};
			return (
				<div className={styles.dot_list}>
					<div className={styles.amt_black}>
						{currency_symbol}
						{' '}
						{item?.sub_total_amount || '-'}
					</div>
					<IcCFcrossInCircle
						style={{ marginLeft: '48px', cursor: 'pointer' }}
						width={20}
						height={20}
						onClick={deleteItem}
					/>
				</div>
			);
		},
		id: 'sub_total',
	},
]
);

export default getMyCartColumns;
