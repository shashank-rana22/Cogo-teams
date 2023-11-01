import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const getOrderColumns = ({ currency_code = '' }) => ([
	{
		Header   : 'PRODUCTS',
		accessor : (item = {}) => {
			console.log(item, 'item');
			return (
				<div className={styles.products}>
					<img src={item?.product_images[GLOBAL_CONSTANTS.zeroth_index]} alt="" width="90px" height="90px" />
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
					{currency_code}
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
					{currency_code}
					{item.order_subtotal}
				</div>
			</div>
		),
		id: 'sub_total',
	},
]
);

export default getOrderColumns;
