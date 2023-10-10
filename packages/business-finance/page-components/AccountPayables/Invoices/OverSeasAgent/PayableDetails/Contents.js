import { Button } from '@cogoport/components';

function Contents({ supplierAgreementWithCogoport = '', cogoportAgreementWithSupplier = '' }) {
	return (
		<>
			<div>
				{supplierAgreementWithCogoport ? (
					<Button
						size="md"
						themeType="linkUi"
						onClick={() => window.open(supplierAgreementWithCogoport, '_blank')}
					>
						Supplier&apos;s Agreement With Cogoport
					</Button>
				) : (
					<text>Supplier&apos;s Agreement not present :-</text>
				) }
			</div>
			<div>
				{cogoportAgreementWithSupplier ? (
					<Button
						size="md"
						themeType="linkUi"
						onClick={() => window.open(cogoportAgreementWithSupplier, '_blank')}
					>
						Cogoport Agreement With Supplier
					</Button>
				) : (
					<text>Cogoport&apos;s Agreement not present :-</text>
				) }
			</div>
		</>
	);
}

export default Contents;
