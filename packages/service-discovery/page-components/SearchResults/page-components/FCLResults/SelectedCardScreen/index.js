import { useState, useEffect } from 'react';

import useGetRateCard from '../../../hooks/useGetRateCard';

import BookCheckout from './BookToCheckout';
import SelectedRateCard from './SelectedRateCard';

function SelectedCardScreen({
	setHeaderProps = () => {},
	setRouterLoading = () => {},
	headerProps = {},
	cogoAssuredRates = [],
	isMobile = false,
	refetchSearch = () => {},
}) {
	const [screen, setScreen] = useState('selectedCard');
	const [showShippingLineModal, setShowShippingLineModal] = useState(false);

	const {
		data = {},
		refetch = () => {},
		loading = false,
	} = useGetRateCard({ service_type: 'fcl_freight' });

	const {
		rate_card: rateCardData = {},
	} = data || {};

	const { source = 'cogo_assured_rate' } = rateCardData;

	const SUBSEQUENT_SCREENS_MAPPING = {
		selectedCard: {
			component : SelectedRateCard,
			props     : {
				data,
				refetch,
				loading,
				setScreen,
				setHeaderProps,
				headerProps,
				cogoAssuredRates,
				showShippingLineModal,
				setShowShippingLineModal,
				setRouterLoading,
				isMobile,
				refetchSearch,
			},
		},
		bookCheckout: {
			component : BookCheckout,
			props     : {
				data,
				setScreen,
			},
		},
	};

	const { component: ActiveComponent, props } = SUBSEQUENT_SCREENS_MAPPING[screen];

	const len = cogoAssuredRates.length;

	useEffect(() => {
		const handleUrlChange = () => setHeaderProps({});

		window.addEventListener('popstate', handleUrlChange);

		return () => {
			window.removeEventListener('popstate', handleUrlChange);
		};
	}, [setHeaderProps]);

	useEffect(() => {
		setShowShippingLineModal(source !== 'cogo_assured_rate' && len);
	}, [len, source]);

	return (
		<ActiveComponent {...props} />
	);
}

export default SelectedCardScreen;
