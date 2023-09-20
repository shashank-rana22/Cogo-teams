import constants from '@cogoport/globalization/constants/globals';

function EmptyState() {
	return (
		<div>
			<div>
				Click on card to see margin details. You can edit the margins, deactivate
				or create a new one.
			</div>

			<img
				src={constants?.image_url?.empty_state_margins_breakup_url}
				alt="empty"
				style={{
					width     : '15em',
					height    : '15em',
					margin    : 'auto',
					marginTop : '40px',
				}}
			/>
		</div>
	);
}

export default EmptyState;
