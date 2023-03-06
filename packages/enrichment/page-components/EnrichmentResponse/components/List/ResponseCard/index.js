import {
	getCardHeaders, CARD_LABELS_MAPPING,
	MOBILE_NUMBERS_MAPPING,
} from '../../../../../constants/get-card-details';

import styles from './styles.module.css';
import Workscopes from './Workscopes';

const CARD_HEADER = getCardHeaders('card');

function ResponseCard({
	user,
	index,
	activeTab,
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
				{Object.keys(CARD_LABELS_MAPPING[activeTab]).map((key) => {
					const item = CARD_LABELS_MAPPING[activeTab];

					return (
						<div className={styles.card_item}>
							<div className={styles.item_label}>{item[key]}</div>

							{['mobile_number', 'whatsapp_number', 'alternate_mobile_number'].includes(key) ? (
								<div className={styles.item_value}>
									{user[MOBILE_NUMBERS_MAPPING[key]]}
									-
									{user?.[key] || '-'}
								</div>
							) : (
								<div className={styles.item_value}>
									{user?.[key] || '-'}
								</div>
							)}
						</div>
					);
				})}

				{activeTab === 'user' && (
					<div className={styles.card_item}>
						<div className={styles.item_label}>Workscopes</div>

						{user.work_scopes ? <Workscopes work_scopes={user.work_scopes} /> : '-'}
					</div>
				)}
			</div>

		</section>

	);
}

export default ResponseCard;
