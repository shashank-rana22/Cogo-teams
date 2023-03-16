import { Button } from '@cogoport/components';
import { useEffect } from 'react';

import CardList from '../../../../../CardList';
import EmptyState from '../../../../../EmptyState';

import styles from './styles.module.css';
import useListSubsidaryRates from './useListSubsidaryRates';
import fields from './viewPriceFields';

function ViewPrice({ showPrice, setAddRate, setShowPrice }) {
	const { data, loading } = useListSubsidaryRates({
		item: showPrice?.item,
	});

	const line_items = [];
	useEffect(() => {
		(async () => {
			data?.list.forEach((items) => {
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
			setShowPrice({ ...showPrice, line_items });
		})();
	}, [loading]);

	const field = fields(showPrice?.item, setAddRate);
	return (
		<div className={styles.container}>
			{!(showPrice?.line_items || []).length && !loading ? (
				<EmptyState />
			) : (
				<CardList
					fields={field}
					data={showPrice?.line_items || []}
					loading={loading}
					showPagination={false}
				/>
			)}

			<StyledButton>
				<Button onClick={() => setShowPrice(null)}>Cancel</Button>
			</StyledButton>
		</div>
	);
}
export default ViewPrice;
