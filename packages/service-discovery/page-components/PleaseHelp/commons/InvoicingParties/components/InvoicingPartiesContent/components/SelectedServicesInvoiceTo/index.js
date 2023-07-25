import { MultiSelect } from '@cogoport/components';

import styles from './styles.module.css';

function SelectedServicesInvoiceTo({
	services = [],
	isEditMode = false,
	setEditInvoiceDetails = () => {},
	editInvoiceDetails = {},
	allServices = [],
}) {
	if (isEditMode) {
		return (
			<div>
				<div className={styles.label}>Select Services</div>
				<MultiSelect
					value={editInvoiceDetails.services.map((item) => item.service_id)}
					onChange={(val) => {
						setEditInvoiceDetails((prev) => ({ ...prev, services: val.map((item) => allServices.find(({ service_id }) => service_id === item)) }));
					}}
					placeholder="Select Services"
					options={allServices.map(({ label, service_id }) => ({ label, value: service_id }))}
					isClearable
					style={{ width: '250px' }}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{services.map((service) => {
				const { service_id, label } = service;

				return (
					<div className={styles.item} key={service_id}>
						<div className={styles.content}>{label}</div>
					</div>
				);
			})}
		</div>
	);
}

export default SelectedServicesInvoiceTo;
