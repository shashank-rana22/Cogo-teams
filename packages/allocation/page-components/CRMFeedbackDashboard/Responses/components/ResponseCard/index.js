import { useTranslation } from 'next-i18next';

import {
	getCardLabelMappings,
	getCardHeader,
	MOBILE_NUMBERS_MAPPING,
} from './get-card-details';
import styles from './styles.module.css';
import Workscopes from './Workscopes';

const FIRST_INDEX = 1;

function ResponseCard({
	user,
	index,
	activeTab = '',
}) {
	const { t } = useTranslation(['allocation']);

	const cardLabelsMapping = getCardLabelMappings({ t });

	const cardHeader = getCardHeader({ t });

	return (
		<section className={styles.card}>
			<div className={styles.card_header}>
				<div className={styles.left_header}>
					{cardHeader[activeTab]?.icon}

					<div className={styles.card_heading_label}>
						{cardHeader[activeTab]?.label}
						-
						{index + FIRST_INDEX}
					</div>
				</div>
			</div>

			<div className={styles.card_body}>

				{activeTab === 'address' && (
					<div className={styles.card_item_address}>
						<div className={styles.item_label}>{t('allocation:full_address')}</div>
						<div className={styles.item_value}>
							{user?.address || '___'}
						</div>
					</div>
				)}

				{Object.keys(cardLabelsMapping[activeTab]).map((key) => {
					const item = cardLabelsMapping[activeTab];

					return (
						<div
							key={item}
							className={activeTab === 'address' ? (styles.address_card_item) : (styles.card_item)}
						>
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
						<div className={styles.item_label}>{t('allocation:workscopes')}</div>

						{user.work_scopes ? <Workscopes work_scopes={user.work_scopes} /> : '___'}
					</div>
				)}
			</div>

		</section>

	);
}

export default ResponseCard;
