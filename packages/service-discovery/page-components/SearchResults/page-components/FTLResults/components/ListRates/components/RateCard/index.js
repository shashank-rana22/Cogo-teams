import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import ContractRateCard from '../ContractRateCard';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function RateCard({
	rate = {},
	detail = {},
	isSelectedCard = false,
	index = 0,
	setRouterLoading = () => {},
	refetch = () => {},
}) {
	if (rate?.source === 'contract') {
		return (
			<ContractRateCard
				rate={rate}
				detail={detail}
				isSelectedCard={isSelectedCard}
				index={index}
				setRouterLoading={setRouterLoading}
			/>
		);
	}

	return (
		<div
			className={cl`${styles.container} ${isSelectedCard && styles.selected_card}`}
			style={{
				marginTop: index === GLOBAL_CONSTANTS.zeroth_index ? '0px' : '40px',
			}}
		>
			<Header
				detail={detail}
				rate={rate}
				refetch={refetch}
			/>

			<Body
				detail={detail}
				rate={rate}
				isSelectedCard={isSelectedCard}
				setRouterLoading={setRouterLoading}
			/>

			<Footer
				detail={detail}
				rate={rate}
				isSelectedCard={isSelectedCard}
			/>
		</div>
	);
}

export default RateCard;
