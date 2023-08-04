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

	const {
		data = {},
		refetch = () => {},
		loading = false,
	} = useGetRateCard();

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

	useEffect(() => {
		const handleUrlChange = () => setHeaderProps({});

		window.addEventListener('popstate', handleUrlChange);

		return () => {
			window.removeEventListener('popstate', handleUrlChange);
		};
	}, [setHeaderProps]);

	return (
		<ActiveComponent {...props} />
	);
}

export default SelectedCardScreen;
