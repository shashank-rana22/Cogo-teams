import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

function RenderTicket({ itemData = {}, setModalData = () => { } }) {
	return (
		itemData?.ticketIds?.[GLOBAL_CONSTANTS.zeroth_index] ? (
			<div
				role="presentation"
				style={{ cursor: 'pointer' }}
				onClick={() => setModalData({ ticketId: itemData?.ticketIds?.[GLOBAL_CONSTANTS.zeroth_index] })}
			>
				{itemData?.ticketIds?.[GLOBAL_CONSTANTS.zeroth_index] || '-'}
			</div>
		) : '_'
	);
}

export default RenderTicket;
