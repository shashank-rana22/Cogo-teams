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
	shipment_type = '',
}) {
	const { requestRate, scope, loading } = useRequestRate({ setShow, refetch });

	return item?.rates ? (
		<p>$ 0</p>
	) : (
		<PriceDiv>
			{!isSeller && scope === 'partner' ? (
				<Button
					className="secondary sm"
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
				className="secondary sm"
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
				className="secondary sm"
				onClick={async (e) => {
					e.stopPropagation();
					setShowPrice({ item });
				}}
				disabled={shipment_type === 'air_freight'}
			>
				View Rates
			</Button>
		</PriceDiv>
	);
}

export default Price;
