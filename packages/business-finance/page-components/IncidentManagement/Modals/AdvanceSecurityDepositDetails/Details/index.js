import styles from './styles.module.css';

function Details(
	row = {},
) {
	const { data } = row || {};
	return (
		<div className={styles.container}>
			<div>
				<div>
					businessName :
					{' '}
					{data.organization.businessName || ''}
				</div>
				<div>
					{' '}
					Requested By :
					{' '}
					{ data.createdBy.name || ''}
					{' '}
				</div>
			</div>
			<div>
				suplierName :
				{' '}
				{data.advanceSecurityDeposit.supplierName || '' }
			</div>
			<div>
				shipment Id :
				{data.advanceSecurityDeposit.shipmentId || '' }

			</div>
			<div>
				<div>
					Amount Per Container :
					{data.advanceSecurityDeposit.amountPerContainer || ''}
				</div>
				<div>
					No of containers :
					{data.advanceSecurityDeposit.numberOfContainers || ''}
				</div>
				<div>
					Total Amount :
					{data.advanceSecurityDeposit.totalAmountToBePaid}
				</div>
			</div>
		</div>
	);
}

export default Details;
