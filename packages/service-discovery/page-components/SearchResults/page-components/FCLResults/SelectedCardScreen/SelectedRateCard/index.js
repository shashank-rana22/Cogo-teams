import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ShippingLineModal from '../../../../../../common/ShippingLineModal';
import useCreateCheckout from '../../../../hooks/useCreateCheckout';
import FclCard from '../../FclCard';

import CargoModal from './CargoModal';
import Header from './Header';
import LoadingState from './loadingState';
import Services from './Services';
import styles from './styles.module.css';

function SelectedRateCard({
	data = {},
	refetch = () => {},
	loading = false,
	setScreen = () => {},
	setHeaderProps = () => {},
	cogoAssuredRates = [],
	showShippingLineModal = false,
	setShowShippingLineModal = () => {},
	setRouterLoading = () => {},
}) {
	const [cargoModal, setCargoModal] = useState('pending'); // pending,progress,success

	const {
		possible_subsidiary_services = [],
		rate_card: rateCardData = {},
		spot_search_detail: detail = {},
	} = data || {};

	const { source = 'cogo_assured_rate', shipping_line = {} } = rateCardData;

	const { spot_search_id = '' } = detail;

	const { handleBook = () => {}, loading: createCheckoutLoading } = useCreateCheckout({
		rateCardData,
		spot_search_id,
	});
	if (loading && isEmpty(data)) return <LoadingState />;

	if (isEmpty(data)) return null;

	return (
		<div className={styles.container}>
			<Header
				detail={detail}
				rateCardData={rateCardData}
				refetch={refetch}
			/>

			<FclCard
				rateCardData={rateCardData}
				detail={detail}
				isSelectedCard
				setScreen={setScreen}
				setRouterLoading={setRouterLoading}
			/>

			{source === 'cogo_assured_rate' ? (
				<div className={styles.cogo_assured_text}>
					you will not be able to edit margin for the selected rate card
				</div>
			) : null}

			<Services
				rateCardData={rateCardData}
				detail={detail}
				createCheckoutLoading={createCheckoutLoading}
				refetch={refetch}
				loading={loading}
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

			{showShippingLineModal ? (
				<ShippingLineModal
					shipping_line={shipping_line}
					show={showShippingLineModal}
					setShow={setShowShippingLineModal}
					cogoAssuredRates={cogoAssuredRates}
					detail={detail}
				/>
			) : null}
		</div>
	);
}

export default SelectedRateCard;
