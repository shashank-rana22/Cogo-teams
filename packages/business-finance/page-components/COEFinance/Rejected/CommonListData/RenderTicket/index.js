import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

function RenderTicket({ itemData = {} }) {
	return (
		<div>
			{itemData?.ticketIds?.[GLOBAL_CONSTANTS.zeroth_index] || '-'}
		</div>
	);
}

export default RenderTicket;
