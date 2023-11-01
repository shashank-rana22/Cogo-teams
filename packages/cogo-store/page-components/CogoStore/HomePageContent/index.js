import { Select, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const MAX_PAGE_LIMIT = 2;
function HomePageContent({ data = {}, productData = {}, filters = {}, setFilters = () => {} }) {
	const { push } = useRouter();
	const { list = [], page, page_limit, total_count } = data || {};

	const { categories, color, currency_code } = productData || {};

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

	const onPageChange = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};

	return (
		<div className={styles.container}>
			<div className={styles.list_header}>
				<div className={styles.admin_btn}>
					<div className={styles.list_header_left}>{`All Products (${total_count})`}</div>
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
					/>
				</div>
			</div>
			<div className={styles.list_body}>
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
								width="400px"
								height="300px"
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
									{currency_code}
									{item.after_coupon_price}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
			{total_count > MAX_PAGE_LIMIT && (
				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={page}
						className={styles.pagination_show}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</div>
	);
}

export default HomePageContent;
