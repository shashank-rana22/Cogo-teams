import { Button } from '@cogoport/components';
import { useEffect } from 'react';

import useGetSubsidiaryServiceRateCards from '../../../../../../hooks/useGetSubsidiaryServiceRateCards';
import CardList from '../../../../../CardList';
import EmptyState from '../../../../../EmptyState';

import styles from './styles.module.css';
import fields from './viewPriceFields';

function ViewPrice({ showPrice, setShowPrice }) {
	const { apiData = [], loading } = useGetSubsidiaryServiceRateCards({
		item: showPrice?.item,
	});

	const line_items = [];

	useEffect(() => {
		(async () => {
			apiData?.list?.forEach((items) => {
				items?.validities.forEach((validity) => {
					line_items.push({
						validity_start : validity?.validity_start,
						validity_end   : validity?.validity_end,
						buy_price      : validity?.line_items[0]?.price,
						currency       : validity?.line_items[0]?.currency,
						unit           : validity?.line_items[0]?.unit,
					});
				});
			});
			setShowPrice((p) => ({ ...p, line_items }));
		})();
	}, [loading, setShowPrice]);

	const field = fields(showPrice?.item);
	return (
		<div className={styles.container}>
			{!(showPrice?.line_items || []).length && !loading ? (
				<EmptyState />
			) : (
				<CardList
					fields={field}
					apiData={showPrice?.line_items || []}
					loading={loading}
					showPagination={false}
					numberOfLoader={3}
				/>
			)}

			<Button onClick={() => setShowPrice(false)}>Cancel</Button>
		</div>
	);
}
export default ViewPrice;
