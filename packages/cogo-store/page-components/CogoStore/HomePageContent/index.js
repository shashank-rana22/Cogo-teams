import { Select, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React from 'react';

import LoadingState from '../../../commons/LoadingState';

import styles from './styles.module.css';

function HomePageContent({
	data = {}, productData = {},
	filters = {},
	setFilters = () => {},
	loading = false,
}) {
	const { push } = useRouter();
	const { list = [], total_count } = data || {};

	const { categories, color, currency_symbol } = productData || {};

	const options = (categories || []).map((item) => ({ label: item.name, value: item.name }));

	const getCategoryName = (categoryId) => {
		const category = (categories || []).find((cat) => cat.id === categoryId);
		return category ? category.name : '';
	};

	const getCategoryId = (categoryName) => {
		const category = (categories || []).find((cat) => cat.name === categoryName);
		return category ? category.id : '';
	};

	const getColorFromCode = (colorId) => {
		const colorName = (color || []).find((col) => col.id === colorId);
		return colorName ? colorName.hexcode : '';
	};

	return (
		<>
			<div className={styles.list_header}>
				<div className={styles.admin_btn}>
					{loading ? <Placeholder height="30px" width="324px" margin="0px 0px 20px 0px" />
						: <div className={styles.list_header_left}>{`All Products (${total_count || '0'})`}</div>}

				</div>
				<div>
					<Select
						placeholder="Category"
						name="category_name"
						options={options}
						value={filters?.name}
						onChange={(e) => setFilters((prev) => ({
							...prev,
							name        : e,
							category_id : getCategoryId(e),
							page        : 1,
						}))}
						isClearable
						style={{ width: '150px', marginRight: '30px' }}
					/>
				</div>
			</div>
			<div
				className={styles.container}
			>
				{loading ? <LoadingState /> : (
					<div
						className={styles.list_body}
					>
						{(list || []).map((item) => (
							<div
								role="presentation"
								className={styles.list_card}
								key={item.id}
								onClick={() => {
									push('/cogo-store/[product_id]', `/cogo-store/${item.id}`);
								}}
							>
								<div className={styles.img_section}>
									<img
										src={item.product_images[GLOBAL_CONSTANTS.zeroth_index]}
										alt=""
										width="100%"
									/>
								</div>
								<div className={styles.text_section}>
									<div className={styles.grey}>
										<span>
											{item.brand_name}
											{' '}
											/
											{' '}
											{getCategoryName(item.category_id)}
										</span>
									</div>
									<div className={styles.black}>
										<span>{`${item.product_name} `}</span>
									</div>
									<div className={styles.dot_list}>

										{(item.available_colors || []).map((colorId) => (
											<div
												className={styles.color_dot}
												key={colorId}
												style={{ backgroundColor: `${getColorFromCode(colorId)}` }}
											/>
										))}
									</div>
									<div>
										<span className={styles.cost_real}>
											{currency_symbol}
											{' '}
											{item.after_coupon_price}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

			</div>
		</>
	);
}

export default HomePageContent;
