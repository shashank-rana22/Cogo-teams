import AddExternalPoc from './AddExternalPoc';
import AddInternalPoc from './AddInteralPoc';
import AddTradePartyPoc from './AddTradePartyPoc';
import EditInternalPoc from './EditInternalPoc';

function AddPocModal({ addPoc, ...rest }) {
	const { poc_type = '' } = addPoc || {};

	const mapping = {
		internal     : AddInternalPoc,
		external     : AddExternalPoc,
		editInternal : EditInternalPoc,
		tradeParty   : AddTradePartyPoc,
	};

	if (poc_type) {
		const Element = mapping[poc_type];
		return <Element {...rest} addPoc={addPoc} />;
	}
	return null;
}
export default AddPocModal;
