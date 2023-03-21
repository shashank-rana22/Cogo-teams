import { Button } from '@cogoport/components';
import React from 'react';

import useRequestRate from '../../../../../../hooks/useRequestRate';

import styles from './styles.module.css';

function Price({
	item,
	isSeller,
	setAddRate,
	refetch = () => {},
	setItem = () => {},
	setShowChargeCodes = () => {},
	setShowPrice,
}) {
	const { requestRate, loading } = useRequestRate({ refetch, setShowChargeCodes });

	return item?.rates ? (
		<p>$ 0</p>
	) : (
		<div className={styles.price_div}>
			{!isSeller ? (
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
