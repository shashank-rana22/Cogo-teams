import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const getOrderColumns = () => ([
	{
		Header   : 'PRODUCTS',
		accessor : (item = {}) => {
			// const getColorFromCode = (colorId) => {
			// 	const colorName = color.find((col) => col.id === colorId);
			// 	return colorName ? colorName.hexcode : '';
			// };
			console.log(item, 'item');
			return (
				<div className={styles.products}>
					<img src={item?.product_images[GLOBAL_CONSTANTS.zeroth_index]} alt="" width="60px" height="60px" />
					<div className={styles.products_right}>
						<div className={styles.black}>{item.product_name}</div>
						<div className={styles.dot_list}>
							<span>{item.product_description}</span>
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
					₹
					{item.final_price}
				</div>
			</div>
		),
		id: 'price',
	},
	{
		Header   : 'Quantity',
		accessor : (item = {}) => (
			<div className={styles.dot_list}>
				<div className={styles.amt_black}>{item.order_quantity}</div>
			</div>
		),
		id: 'quantity',
	},
	{
		Header   : 'SUB-TOTAL',
		accessor : (item = {}) => (
			<div className={styles.dot_list}>
				<div className={styles.amt_black}>
					₹
					{item.order_subtotal}
				</div>
			</div>
		),
		id: 'sub_total',
	},
]
);

export default getOrderColumns;
