import { useSelector } from '@cogoport/store';
// import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

// import LoadingState from '../../../../common/Loading';
import useCreateCheckout from '../../../../hooks/useCreateCheckout';
// import useGetRateCard from '../../../../hooks/useGetRateCard';
import RateCard from '../ListRates/components/RateCard';

import Services from './Services';
import styles from './styles.module.css';

function SelectedRateCard({
	setRouterLoading = () => {},
	detail = {},
	possible_subsidiary_services = [],
	rates = [],
	refetch = () => {},
}) {
	const { query = {} } = useSelector(({ general }) => ({
		query: general?.query,
	}));

	// const {
	// 	data = {},
	// 	refetch = () => {},
	// 	loading = false,
	// } = useGetRateCard({ service_type: 'air_freight' });

	// const {
	// 	rate_card:selectedRate = {},
	// 	possible_subsidiary_services = [],
	// 	spot_search_detail:detail = {},
	// } = data || {};

	const selectedRate = useMemo(
		() => (rates || []).find(({ id }) => id === query.rate_card_id),
		[query.rate_card_id, rates],
	);

	const { handleBook = () => {}, loading: createCheckoutLoading } = useCreateCheckout({
		rateCardData   : selectedRate,
		spot_search_id : query?.spot_search_id,
	});

	// if (loading && isEmpty(data)) {
	// 	return <LoadingState />;
	// }

	return (
		<div className={styles.container}>
			<RateCard
				// loading={loading}
				isSelectedCard
				rate={selectedRate}
				detail={detail}
				setRouterLoading={setRouterLoading}
			/>

			<Services
				rateCardData={selectedRate}
				detail={detail}
				createCheckoutLoading={createCheckoutLoading}
				refetch={refetch}
				// loading={loading}
				possible_subsidiary_services={possible_subsidiary_services}
				handleBook={handleBook}
			/>
		</div>
	);
}

export default SelectedRateCard;
