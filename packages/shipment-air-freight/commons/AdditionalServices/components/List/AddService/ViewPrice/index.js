import EmptyState from '@cogoport/air-modules/common/EmptyState';
import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect } from 'react';

import useGetSubsidiaryServiceRateCards from '../../../../../../hooks/useGetSubsidiaryServiceRateCards';
import CardList from '../../../../../CardList';

import styles from './styles.module.css';
import fields from './viewPriceFields';

function ViewPrice({ showPrice, setShowPrice }) {
	const { apiData = [], loading } = useGetSubsidiaryServiceRateCards({
		item: showPrice?.item,
	});

	useEffect(() => {
		const LINE_ITEMS = [];

		(async () => {
			apiData?.list?.forEach((items) => {
				items?.validities.forEach((validity) => {
					LINE_ITEMS.push({
						validity_start : validity?.validity_start,
						validity_end   : validity?.validity_end,
						buy_price      : validity?.line_items[GLOBAL_CONSTANTS.zeroth_index]?.price,
						currency       : validity?.line_items[GLOBAL_CONSTANTS.zeroth_index]?.currency,
						unit           : validity?.line_items[GLOBAL_CONSTANTS.zeroth_index]?.unit,
					});
				});
			});
			setShowPrice((p) => ({ ...p, LINE_ITEMS }));
		})();
	}, [setShowPrice, apiData?.list]);

	const field = fields(showPrice?.item);
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
					numberOfLoader={3}
				/>
			)}

			<Button onClick={() => setShowPrice(false)}>Cancel</Button>
		</div>
	);
}
export default ViewPrice;
