import { TRADE_PARTY_MAPPING } from '../../../../constants/TRADE_PARTY_MAPPING';

import styles from './styles.module.css';

function TradeParties({ tradePartnersData }) {
	const { list = [] } = tradePartnersData;

	const addedTradeParty = list.map((i) => i.trade_party_type);
	const possible_trade_party = Object.keys(TRADE_PARTY_MAPPING).filter((k) => !addedTradeParty.includes(k));

	return (
		<div>
			{possible_trade_party.map((item) => (
				<div className={styles.container}>
					<button className={styles.add_button}>
						<div>{TRADE_PARTY_MAPPING[item]}</div>
						<div className={styles.add}>+</div>
					</button>

				</div>
			))}
		</div>
	);
}

export default TradeParties;
