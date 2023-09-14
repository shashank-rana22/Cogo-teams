import NegotiationRemarks from './negotitionRemarks';
import RemarksDetails from './remarksDetails';

function Remarks({ loading = false, showMore = false, selectedCard = {} }) {
	const ZEROVALUE = 0;
	const isEmpty =	(selectedCard?.negotiation_remarks === null
			|| selectedCard?.negotiation_remarks?.length === ZEROVALUE)
			&& !selectedCard?.commodity_remarks;

	return (
		<div>
			{showMore ? (
				<RemarksDetails
					loading={loading}
					selectedCard={selectedCard}
					isEmpty={isEmpty}
				/>
			) : (
				<NegotiationRemarks
					loading={loading}
					selectedCard={selectedCard}
					isEmpty={isEmpty}
				/>
			)}
		</div>
	);
}
export default Remarks;
