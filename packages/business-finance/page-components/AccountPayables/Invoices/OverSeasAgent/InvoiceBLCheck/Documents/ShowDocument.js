import styles from './styles.module.css';

export function ShowDocument({ radioValue = '', documentData = {} }) {
	let docLink = '';

	documentData?.forEach((itemData) => {
		switch (radioValue) {
			case 'mawb':
				if (itemData?.document_type === 'airway_bill') {
					docLink = itemData?.document_url;
				}
				break;
			case 'hawb':
				if (itemData?.document_type === 'house_airway_bill') {
					docLink = itemData?.document_url;
				}
				break;
			case 'do':
				if (itemData?.document_type === 'delivery_order') {
					docLink = itemData?.document_url;
				}
				break;
			case 'mbl':
				if (itemData?.document_type === 'bill_of_lading') {
					docLink = itemData?.document_url;
				}
				break;
			case 'hbl':
				if (itemData?.document_type === 'house_bill_of_lading') {
					docLink = itemData?.document_url;
				}
				break;
			default:
				break;
		}
	});

	if (docLink) {
		return (
			<div className={styles.upload_invoice}>
				<object
					data={docLink}
					type="application/pdf"
					height="100%"
					width="100%"
					aria-label="Doc Preview"
					style={{ padding: '12px 16px 16px 16px' }}
				/>
			</div>
		);
	}

	return <div className={styles.empty_data}>BILL NOT FOUND</div>;
}
