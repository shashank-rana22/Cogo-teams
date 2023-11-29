import { Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import PromocodeThumbnail from './PromocodeThumbnail';
import styles from './styles.module.css';

const VALUE_TO_INDEX_DIFF = 1;

function PromocodeDetails({ promotion = {}, setShowDetails = () => {} }) {
	return (
		<Modal onClose={() => setShowDetails(false)} show>
			<Modal.Header title="Promo code Available" />

			<Modal.Body>
				<div className={styles.container}>
					{promotion.promotion_discounts.map((promotion_discount) => (
						<div key={promotion_discount?.id} className={styles.row}>
							<PromocodeThumbnail
								promotion={promotion}
								promotion_discount={promotion_discount}
							/>
							<div className={styles.details}>
								<div
									className={styles.details_title}
								>
									{promotion.codes?.[GLOBAL_CONSTANTS.zeroth_index]?.promocode}
								</div>
								<div className={styles.details_description}>{promotion?.description}</div>
							</div>
						</div>
					))}
					<div className={styles.row}>
						<div className={styles.terms}>
							<div className={styles.terms_title}>Terms & Conditions </div>

							{promotion.terms_and_conditions?.map((term, i) => (
								<div key={term} className={styles.terms_content}>
									{i + VALUE_TO_INDEX_DIFF}
									.
									{' '}
									{term}
								</div>
							))}
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default PromocodeDetails;
