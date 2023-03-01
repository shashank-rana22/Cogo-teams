import { cl } from '@cogoport/components';
import { IcMArrowRotateLeft, IcMArrowRotateRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function OrderComponent({
	id,
	className,
	style,
	totalItems,
	pageSize,
	currentPage = 1,
	onPageChange,

}) {
	const totalPages = Math.ceil(totalItems / pageSize);

	const handlePrevClick = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextClick = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const handleInputChange = (e) => {
		onPageChange(e.target.value);
	};

	return (
		<div
			id={id}
			className={cl`
				${className}
				${styles.pagination_comp} 
				${cl.ns('pagination_comp_container')}`}
			style={style}
		>
			<button
				className={cl`
					${styles.arrowbutton}
					${currentPage === 1 ? styles.inactive : styles.active}
					${cl.ns('pagination_comp_prev')}`}
				onClick={handlePrevClick}
				type="button"
				aria-label="Previous"
			>
				<IcMArrowRotateLeft />
			</button>

			<input
				className={cl`${styles.input}`}
				type="number"
				value={currentPage}
				onChange={handleInputChange}

			/>

			<button
				className={cl`
				${styles.arrowbutton}
				${currentPage === totalPages ? styles.inactive : styles.active}
				${cl.ns('pagination_comp_next')}`}
				onClick={handleNextClick}
				type="button"
				aria-label="Next"
			>
				<IcMArrowRotateRight />
			</button>
		</div>
	);
}

export default OrderComponent;
