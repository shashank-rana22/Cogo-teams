import { Button } from '@cogoport/components';

function Content({ panUrl = '', businessAddressProofUrl = '' }) {
	return (
		<>
			<div>
				{panUrl ? (
					<Button
						size="md"
						themeType="linkUi"
						onClick={() => window.open(panUrl, '_blank')}
					>
						Pan Document
					</Button>
				) : (
					<text>Pan not present :-</text>
				) }
			</div>

			<div>
				{businessAddressProofUrl ? (
					<Button
						size="md"
						themeType="linkUi"
						onClick={() => window.open(businessAddressProofUrl, '_blank')}
					>
						Business Address Proof
					</Button>
				) : (
					<text>Business Address Proof not present :-</text>
				) }
			</div>
		</>
	);
}

export default Content;
