import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

import useGetRateCard from '../../../hooks/useGetRateCard';

import BookCheckout from './BookToCheckout';

const SelectedRateCard = dynamic(() => import('./SelectedRateCard'), {
	ssr     : false,
	loading : () => <div />,
});

function SelectedCardScreen({
	setHeaderProps = () => {},
	headerProps = {},
	cogoAssuredRates = [],
}) {
	const [screen, setScreen] = useState('selectedCard');
	const [showShippingLineModal, setShowShippingLineModal] = useState(false);

	const {
		data = {},
		refetch = () => {},
		loading = false,
	} = useGetRateCard();

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
