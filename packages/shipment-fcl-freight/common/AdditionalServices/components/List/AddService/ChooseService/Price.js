import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
import useRequestRate from './useRequestRate';

function Price({
	item,
	isSeller,
	setAddRate,
	setShow = () => {},
	refetch = () => {},
	setShowPrice,
}) {
	const { requestRate, scope, loading } = useRequestRate({ setShow, refetch });

	return item?.rates ? (
		<p>$ 0</p>
	) : (
		<div className={styles.price_div}>
			{!isSeller && scope === 'partner' ? (
				<Button
					themeType="secondary"
					onClick={(e) => {
						e.stopPropagation();
						setAddRate(item);
					}}
					style={{ marginRight: 10 }}
				>
					Add Rate
				</Button>
			) : null}

			<Button
				themeType="secondary"
				onClick={(e) => {
					e.stopPropagation();
					if (isSeller) {
						setAddRate(item);
					} else {
						requestRate(item);
					}
				}}
				style={{ marginRight: 10 }}
				disabled={loading}
			>
				{isSeller ? 'Add Rate' : 'Request Rate'}
			</Button>
			<Button
				themeType="secondary"
				onClick={async (e) => {
					e.stopPropagation();
					setShowPrice({ item });
				}}
			>
				View Rates
			</Button>
		</div>
	);
}

export default Price;
