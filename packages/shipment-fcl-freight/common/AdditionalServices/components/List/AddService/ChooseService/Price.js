import { Button } from '@cogoport/components';
import React from 'react';

import useCreateShipmentAdditionalService from '../../../../../../hooks/useCreateShipmentAdditionalService';

import styles from './styles.module.css';

function Price({
	item,
	isSeller,
	setAddRate,
	refetch = () => {},
	setShowChargeCodes = () => {},
	setShowPrice,
}) {
	const { requestRate, loading } = useCreateShipmentAdditionalService({ refetch, setShowChargeCodes });

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
					requestRate(item);
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
