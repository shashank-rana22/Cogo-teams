import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CargoModal from '../../../../common/CargoModal';
import LoadingState from '../../../../common/Loading';
import useCreateCheckout from '../../../../hooks/useCreateCheckout';
import useGetRateCard from '../../../../hooks/useGetRateCard';
import RateCard from '../ListRates/components/RateCard';

import Services from './Services';
import styles from './styles.module.css';

function SelectedRateCard({
	setHeaderProps = () => {},
	headerProps = {},
	setRouterLoading = () => {},
	refetch: refetchSearch = () => {},
}) {
	const { query = {} } = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const [cargoModal, setCargoModal] = useState('pending'); // pending,progress,success

	const {
		data = {},
		refetch = () => {},
		loading = false,
	} = useGetRateCard({ service_type: 'air_freight' });

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
		return <LoadingState />;
	}

	return (
		<div className={styles.container}>
			<RateCard
				loading={loading}
				isSelectedCard
				rate={selectedRate}
				detail={detail}
				setRouterLoading={setRouterLoading}
				refetch={refetchSearch}
			/>

			<Services
				rateCardData={selectedRate}
				detail={detail}
				createCheckoutLoading={createCheckoutLoading}
				refetch={refetch}
				loading={loading}
				headerProps={headerProps}
				setHeaderProps={setHeaderProps}
				possible_subsidiary_services={possible_subsidiary_services}
				cargoModal={cargoModal}
				setCargoModal={setCargoModal}
				handleBook={handleBook}
			/>

			{cargoModal === 'progress' ? (
				<CargoModal
					refetch={refetch}
					cargoModal={cargoModal}
					setCargoModal={setCargoModal}
					detail={detail}
					goToCheckout={handleBook}
				/>
			) : null}
		</div>
	);
}

export default SelectedRateCard;
