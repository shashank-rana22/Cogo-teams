import styles from './styles.module.css';

const INDEX_TO_VALUE_DIFF = 1;

function ToEmailList({
	billing_addresses = [],
	organization,
	detail,
	setSelected = () => {},
	selected,
	emailContent,
}) {
	const isSelf = detail?.importer_exporter_id === organization?.id;

	const recipientsForMainService = (emailContent?.main?.cc_user_ids || []).length
		+ (emailContent?.main?.user_ids || []).length;

	return (
		<div className={styles.container}>
			<div
				role="presentation"
				onClick={() => setSelected('main')}
				id="checkout_ip_main"
				className={`${styles.item_container} ${selected === 'main' ? styles.active : null}`}
			>
				<div>
					<div className={styles.bold_content}>
						Booking Quotation
					</div>
					<div className={styles.bold_content}>
						{organization?.business_name}
					</div>
				</div>

				<div className={styles.count}>
					{recipientsForMainService || 'No'}
					{' '}
					recipients chosen
				</div>
			</div>

			{billing_addresses.map((ba, index) => {
				let active;
				if (selected !== 'main') {
					active = ba?.tax_number === selected?.tax_number;
				}

				const totalReciepients = (emailContent[ba?.tax_number]?.cc_user_ids || []).length
					+ (emailContent[ba?.tax_number]?.user_ids || []).length;

				return isSelf
					&& detail?.quotation_type === 'all_service_combined' ? null : (
						<div
							role="presentation"
							onClick={() => setSelected(ba)}
							className={`${styles.item_container} ${active ? styles.active : null}`}
							key={ba?.tax_number}
							id={`checkout_ip_${index}`}
						>
							<div>
								<div className={styles.bold_content}>
									Invoice Intimaton
									{' '}
									{index + INDEX_TO_VALUE_DIFF}
								</div>

								<div className={styles.bold_content}>
									{ba?.business_name}
								</div>
							</div>

							<div className={styles.count}>
								{totalReciepients || 'No'}
								{' '}
								recipients chosen
							</div>
						</div>
					);
			})}
		</div>
	);
}

export default ToEmailList;
