import TRADE_PARTY_MAPPING from '../../../../contants/TRADE_PARTY_MAPPING';
import roleBasedView from '../../config/role_base_view.json';

import styles from './styles.module.css';

const exclude_trade_party = ['collection_party'];

function TradeParties({	tradePartnersData, setAddCompany = () => {}, serviceProviders = {}, activeStakeholder }) {
	const tradePartyView = (roleBasedView[activeStakeholder] || {})?.trade_parties;

	const { list = [] } = tradePartnersData;

	const addedTradeParty = list.map((i) => i.trade_party_type);

	const possible_trade_party = Object.keys(TRADE_PARTY_MAPPING).filter((k) => !exclude_trade_party.includes(k)
	&& !addedTradeParty.includes(k) && tradePartyView?.includes(k));

	const addContent = ({ displayText = '', trade_party_type = '', organization_id }) => (
		<div className={styles.container}>
			<button
				className={styles.add_button}
				onClick={() => {
					setAddCompany({ trade_party_type, ...(organization_id && { organization_id }) });
				}}
			>
				<div className={styles.displayText}>{displayText}</div>
				<div className={styles.add}>+</div>
			</button>

		</div>
	);

	return (
		<div>
			{possible_trade_party.map((item) => (
				addContent({ displayText: TRADE_PARTY_MAPPING[item], trade_party_type: item })
			))}

			{tradePartyView?.includes('collection_party') ? Object.keys(serviceProviders).map((sp) => (
				addContent({
					displayText      : `Collection Party ${serviceProviders[sp]} `,
					trade_party_type : 'collection_party',
					organization_id  : sp,
				})
			)) : null}

		</div>
	);
}

export default TradeParties;
