import {
	CARD_LABELS_MAPPING,
	CARD_HEADER,
	MOBILE_NUMBERS_MAPPING,
} from './get-card-details';
import styles from './styles.module.css';
import Workscopes from './Workscopes';

function ResponseCard({
	user,
	index,
	activeTab = '',
}) {
	return (
		<section className={styles.card}>
			<div className={styles.card_header}>
				<div className={styles.left_header}>
					{CARD_HEADER[activeTab]?.icon}

					<div className={styles.card_heading_label}>
						{CARD_HEADER[activeTab]?.label}
						-
						{index + 1}
					</div>
				</div>
			</div>

			<div className={styles.card_body}>

				{activeTab === 'address' && (
					<div className={styles.card_item_address}>
						<div className={styles.item_label}>Full Address</div>
						<div className={styles.item_value}>
							{user?.address || '___'}
						</div>
					</div>
				)}

				{Object.keys(CARD_LABELS_MAPPING[activeTab]).map((key) => {
					const item = CARD_LABELS_MAPPING[activeTab];

					return (
						<div className={activeTab === 'address' ? (styles.address_card_item) : (styles.card_item)}>
							<div className={styles.item_label}>{item[key]}</div>
							{['mobile_number', 'whatsapp_number', 'alternate_mobile_number'].includes(key) ? (
								<div className={styles.item_value}>
									{user[MOBILE_NUMBERS_MAPPING[key]]}
									{user?.[key] || '___'}
								</div>
							) : (
								<div className={styles.item_value}>
									{user?.[key] || '___'}
								</div>
							)}
						</div>
					);
				})}

				{activeTab === 'user' && (
					<div className={styles.card_item}>
						<div className={styles.item_label}>Workscopes</div>

						{user.work_scopes ? <Workscopes work_scopes={user.work_scopes} /> : '___'}
					</div>
				)}
			</div>

		</section>

	);
}

export default ResponseCard;
