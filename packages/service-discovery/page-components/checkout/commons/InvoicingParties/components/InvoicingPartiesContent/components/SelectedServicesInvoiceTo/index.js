import styles from './styles.module.css';

function SelectedServicesInvoiceTo({ services }) {
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
