import { cl, Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import RateCardInfo from './RateCardInfo';
import RateCardLoader from './RateCardLoader';
import styles from './styles.module.css';

const SINGLE_RATE = 1;

function RateCard({ data = [], loading = false, selectedRateCard, setSelectedRateCard }) {
	const { t } = useTranslation(['cargoInsurance']);

	if (isEmpty(data) && !loading) return null;

	return (
		<div className={styles.main_container}>
			<h3>{t('cargoInsurance:rate_card')}</h3>

			{loading ? <RateCardLoader /> : (
				<div className={styles.scroll_container}>
					{(data || []).map((info) => {
						const { serviceProvider } = info || {};
						const IsSelectedRate = selectedRateCard?.serviceProvider === serviceProvider;

						return (
							<div key={serviceProvider} className={cl`${styles.container} ${styles.flex_box}`}>
								<Checkbox
									checked={IsSelectedRate}
									onChange={() => setSelectedRateCard(info)}
									disabled={data?.length === SINGLE_RATE}
								/>

								<div className={cl`${styles.card}
									${IsSelectedRate ? styles.selected_card : ''}`}
								>
									<div className={styles.img_container}>
										<Image
											src={GLOBAL_CONSTANTS.image_url.insurance_pkg}
											className={styles.pkg_img}
											width={160}
											height={160}
											alt={t('cargoInsurance:package_alt')}
										/>

										<div className={styles.secure_now}>
											<span className={styles.secure_now_text}>Powered By</span>
											<Image
												className={styles.secure_now_img}
												src={GLOBAL_CONSTANTS.image_url.secure_now}
												width={70}
												height={10}
												alt={t('cargoInsurance:secure_now')}
											/>
										</div>

									</div>

									<RateCardInfo info={info} />
								</div>

							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default RateCard;
