import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const getOrderColumns = ({ currency_symbol = '', showFullDescription = false, setShowFullDescription = () => {} }) => {
	console.log(currency_symbol);
	return ([
		{
			Header   : 'PRODUCTS',
			accessor : (item = {}) => {
				const toggleDescription = () => {
					setShowFullDescription(!showFullDescription);
				};

				return (
					<div className={styles.products}>
						<img
							src={item?.product_images[GLOBAL_CONSTANTS.zeroth_index]}
							alt=""
							width="90px"
							height="90px"
						/>
						<div className={styles.products_right}>
							<div className={styles.black}>{item.product_name}</div>
							<div className={styles.dot_list}>
								<div>Color</div>
								<div
									className={styles.color_dot}
									key={item.color_id}
									style={{
										backgroundColor : item?.color_id?.hexcode,
										border          : '1px solid rgba(0,0,0,.2)',
									}}
								/>
								<div>{item?.size}</div>
							</div>
							<div className={styles.dot_list_desc}>

								<div className={showFullDescription
									? styles.fullDescription : styles.truncatedDescription}
								>
									{item.product_description}

									<div
										aria-hidden
										style={{ cursor: 'pointer' }}
										onClick={toggleDescription}
									>
										{showFullDescription ? 'See less' : 'See more'}
									</div>
								</div>
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
						{currency_symbol}
						{' '}
						{item.order_subtotal}
					</div>
				</div>
			),
			id: 'sub_total',
		},
	]
	);
};

export default getOrderColumns;
