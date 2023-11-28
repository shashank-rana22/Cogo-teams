import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../common/Loading';
import useCreateCheckout from '../../../../hooks/useCreateCheckout';
import useGetRateCard from '../../../../hooks/useGetRateCard';
import RateCard from '../ListRates/components/RateCard';

import ProceedToCheckout from './ProceedToCheckout';
import Services from './Services';
import styles from './styles.module.css';

function SelectedRateCard({
	setRouterLoading = () => {},
	isMobile = false,
	refetch: refetchSearch = () => {},
}) {
	const { query = {} } = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const {
		data = {},
		refetch = () => {},
		loading = false,
	} = useGetRateCard({ service_type: 'ftl_freight' });

	const {
		rate_card:selectedRate = {},
		possible_subsidiary_services = [],
		spot_search_detail:detail = {},
	} = data || {};

	const { handleBook = () => {}, loading: createCheckoutLoading } = useCreateCheckout({
		rateCardData   : selectedRate,
		spot_search_id : query?.spot_search_id,
	});

	if (loading && isEmpty(data)) {
		return <LoadingState isMobile={isMobile} service="ftl_freight" />;
	}

	return (
		<div className={styles.container}>
			<RateCard
				loading={loading}
				isSelectedCard
				rate={selectedRate}
				detail={detail}
				setRouterLoading={setRouterLoading}
				isMobile={isMobile}
				refetch={refetchSearch}
			/>

			<Services
				rateCardData={selectedRate}
				detail={detail}
				createCheckoutLoading={createCheckoutLoading}
				refetch={refetch}
				loading={loading}
				possible_subsidiary_services={possible_subsidiary_services}
				handleBook={handleBook}
			/>

			<ProceedToCheckout
				rate={selectedRate}
				loading={createCheckoutLoading}
				handleBook={handleBook}
			/>
		</div>
	);
}

export default SelectedRateCard;
