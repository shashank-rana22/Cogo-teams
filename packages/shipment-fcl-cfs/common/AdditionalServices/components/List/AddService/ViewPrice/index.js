import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import { useEffect, useMemo } from 'react';

import useGetSubsidiaryServiceRateCards from '../../../../../../hooks/useGetSubsidiaryServiceRateCards';
import CardList from '../../../../../CardList';

import styles from './styles.module.css';
import fields from './viewPriceFields';

function ViewPrice({ showPrice, setShowPrice }) {
	const { apiData = [], loading } = useGetSubsidiaryServiceRateCards({
		item: showPrice?.item,
	});

	const line_items = useMemo(() => [], []);

	useEffect(() => {
		(async () => {
			apiData?.list?.forEach((items) => {
				items?.validities.forEach((validity) => {
					line_items.push({
						validity_start : validity?.validity_start,
						validity_end   : validity?.validity_end,
						buy_price      : validity?.line_items[GLOBAL_CONSTANTS.zeroth_index]?.price,
						currency       : validity?.line_items[GLOBAL_CONSTANTS.zeroth_index]?.currency,
						unit           : validity?.line_items[GLOBAL_CONSTANTS.zeroth_index]?.unit,
					});
				});
			});
			setShowPrice((p) => ({ ...p, line_items }));
		})();
	}, [loading, setShowPrice, apiData?.list, line_items]);

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
