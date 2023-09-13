function EmptyState() {
	return (
		<div>
			<div>
				Click on card to see margin details. You can edit the margins, deactivate
				or create a new one.
			</div>

			<img
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-nonfunded.svg"
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
