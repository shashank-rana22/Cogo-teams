import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getSingleAccountStats from '../../../../constants/get-single-account-stats';

import styles from './styles.module.css';

function SingleCheckedAccount({ modalDetailsArray = [] }) {
	const { t } = useTranslation(['allocation']);

	const singleAccountStats = getSingleAccountStats({ t });

	return (
		<div className={styles.single_container}>
			<div className={styles.heading}>
				{t('allocation:you_are_about_to')}
				{' '}
				<strong>{t('allocation:deallocate_label')}</strong>
				{' '}
				&quot;
				{startCase(modalDetailsArray[GLOBAL_CONSTANTS.zeroth_index].business_name || '')}
				&quot;.
				{t('allocation:please_verify_deallocation_phrase')}
			</div>

			<div className={styles.details_card}>

				{singleAccountStats.map((detailsObject) => {
					const { detail_label, stats, detail_key } = detailsObject;
					return (
						<>
							<div key={detail_key} className={styles.detail_label}>{detail_label}</div>
							<div className={styles.single_card} key={detail_key}>
								{stats?.map((item) => {
									const { key, label, flex } = item;

									return (
										<div key={key} style={{ flex }}>

											<div className={styles.label}>
												{' '}
												{label}
												{' '}
											</div>

											<div className={styles.value}>
												{modalDetailsArray[GLOBAL_CONSTANTS.zeroth_index]?.[key] || ''}

											</div>

										</div>
									);
								})}
							</div>
						</>

					);
				})}

			</div>

		</div>
	);
}

export default SingleCheckedAccount;
