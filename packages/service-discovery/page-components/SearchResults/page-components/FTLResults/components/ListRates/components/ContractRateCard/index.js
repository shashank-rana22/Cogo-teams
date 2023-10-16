import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function ContractRateCard({
	rate = {},
	detail = {},
	isSelectedCard = false,
	index = 0,
	setRouterLoading = () => {},
}) {
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

export default ContractRateCard;
