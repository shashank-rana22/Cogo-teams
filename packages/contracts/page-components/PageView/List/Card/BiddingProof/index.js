import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

function BiddingProof({ bidding_proof, handleDownload }) {
	if (isEmpty(bidding_proof)) return <div>No files uploaded</div>;

	return (
		<div>
			{(bidding_proof || []).map((val) => (
				<Button
					size="md"
					themeType="linkUi"
					interactive
					onClick={() => handleDownload(val?.url)}
				>
					{val?.name}
				</Button>
			))}
		</div>
	);
}

export default BiddingProof;
