import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ProductDetailsLoading() {
	return (
		<div className={styles.loader_container}>
			<div className={styles.left_section}>
				{[...Array(5).keys()].map((val) => (
					<Placeholder key={val} height="50px" margin="0px 0px 20px 0px" />
				))}
			</div>
			<div className={styles.right_section}>
				{[...Array(5).keys()].map((val) => (
					<Placeholder key={val} height="50px" margin="0px 0px 20px 0px" />
				))}
			</div>
		</div>
	);
}

export default ProductDetailsLoading;
