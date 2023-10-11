import { cl, Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Image } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import INSURANCE_PROVIDER from '../../../constant/insuranceProvider';

import styles from './styles.module.css';

const SINGLE_RATE = 1;

const getFormatedAmount = ({ currency, value }) => formatAmount({
	amount  : value,
	currency,
	options : {
		style           : 'currency',
		currencyDisplay : 'code',
	},
});

function RateCard({ data = [], loading, selectedRateCard, setSelectedRateCard }) {
	const { t } = useTranslation(['cargoInsurance']);

	console.log(loading, 'loading');
	return (
		<div className={styles.main_container}>
			<h3>{t('cargoInsurance:rate_card')}</h3>

			<div className={styles.scroll_container}>
				{(data || []).map((info) => {
					const { netCharges, serviceChargeList = [], currency = '', serviceProvider } = info || {};
					const IsSelectedRate = selectedRateCard?.serviceProvider === serviceProvider;

					return (
						<div key={serviceProvider} className={cl`${styles.container} ${styles.flex_box}`}>
							<Checkbox
								checked={IsSelectedRate}
								onChange={() => setSelectedRateCard(info)}
								disabled={data?.length === SINGLE_RATE}
							/>

							<div className={cl`${styles.card} ${IsSelectedRate ? styles.selected_card : ''}`}>
								<div className={styles.img_container}>
									<Image
										src={GLOBAL_CONSTANTS.image_url.insurance_pkg}
										className={styles.pkg_img}
										width={160}
										height={160}
										alt="package"
									/>
								</div>

								<div className={styles.info_container}>

									<div className={cl`${styles.flex_box} ${styles.header}`}>
										<div>
											<Image
												src={INSURANCE_PROVIDER?.[serviceProvider]}
												width={140}
												height={15}
												alt={serviceProvider}
											/>
											<p className={styles.sub_title}>{t('cargoInsurance:insurance_company')}</p>
										</div>

										<div style={{ textAlign: 'right' }}>
											<h3 className={styles.total_price}>
												{getFormatedAmount({ currency, value: netCharges })}
											</h3>
											<p className={styles.sub_title}>{t('cargoInsurance:incl_tax')}</p>
										</div>
									</div>

									<div className={styles.line_items}>
										<div className={cl`${styles.flex_box} ${styles.line_item_header}`}>
											<span>{t('cargoInsurance:rate_col_1')}</span>
											<span>{t('cargoInsurance:rate_col_1')}</span>
										</div>

										<div>
											{serviceChargeList.map((ele) => (
												<div
													key={ele.productCodeId}
													className={cl`${styles.row} ${styles.flex_box}`}
												>
													<span>{ele.displayName}</span>
													<span>
														{getFormatedAmount({ currency, value: ele?.netCharges })}
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>

						</div>
					);
				})}
			</div>

		</div>
	);
}

export default RateCard;
