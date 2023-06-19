import AddExternalPoc from './AddExternalPoc';
import AddInternalPoc from './AddInteralPoc';
import AddTradePartyPoc from './AddTradePartyPoc';
import EditInternalPoc from './EditInternalPoc';

const MAPPING = {
	internal     : AddInternalPoc,
	external     : AddExternalPoc,
	editInternal : EditInternalPoc,
	tradeParty   : AddTradePartyPoc,
};

function AddPocModal({ addPoc, ...rest }) {
	const { poc_type = '' } = addPoc || {};

	if (poc_type) {
		const Element = MAPPING[poc_type];
		return <Element {...rest} addPoc={addPoc} />;
	}
	return null;
}
export default AddPocModal;
