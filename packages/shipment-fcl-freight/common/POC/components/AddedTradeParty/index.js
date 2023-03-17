import { TRADE_PARTY_MAPPING } from '../../../../constants/TRADE_PARTY_MAPPING';

import TradeParty from './TradeParty';

function AddedTradeParty({ tradePartnersData = {} }) {
	const { list = [] } = tradePartnersData;

	const addedTradeParty = list.map((i) => i.trade_party_type);
	const possible_trade_party = Object.keys(TRADE_PARTY_MAPPING).filter((k) => addedTradeParty.includes(k));

	return possible_trade_party.map((item) => {
		const trade_party_data = list.find((i) => i.trade_party_type === item);
		return <TradeParty data={trade_party_data} title={TRADE_PARTY_MAPPING[item]} />;
	});
}
export default AddedTradeParty;
