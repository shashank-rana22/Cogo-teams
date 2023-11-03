import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import INSURANCE_PROVIDER from '../../../constants/insuranceProvider';
import getPocMapping from '../../../constants/pocMapping';

import PersonalDetailsModal from './PersonalDetailsModal';
import styles from './styles.module.css';

const getFormatedAmount = ({ currency = '', value }) => formatAmount({
	amount  : value,
	currency,
	options : {
		style           : 'currency',
		currencyDisplay : 'code',
	},
});

function SideBar({ pocDetails = {}, rateResponse = [] }) {
	const { t } = useTranslation(['cargoInsurance']);

	const [detailModal, setDetailModal] = useState({
		openModal : false,
		info      : pocDetails || {},
	});
	const POC_MAPPING = getPocMapping({ t });

	const {
		serviceChargeList = [], serviceProvider = '', netCharges = '',
		chargeCurrency = '',
	} = rateResponse?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div style={{ width: '30%' }}>

			<div className={cl`${styles.section} ${styles.personal_detail}`}>
				<h3>{t('cargoInsurance:personal_details_title')}</h3>

				<div className={cl`${styles.container} ${styles.flex_box}`}>

					{Object.keys(POC_MAPPING).map((detail) => {
						if (detail === 'edit') {
							return (
								<Button
									size="sm"
									key={detail}
									className={styles.edit_btn}
									themeType="secondary"
									onClick={() => setDetailModal({
										openModal : true,
										info      : pocDetails,
									})}
								>
									{t('cargoInsurance:edit')}
								</Button>
							);
						}

						return (
							<div key={detail} className={styles.col}>
								<p className={styles.label}>{POC_MAPPING[detail]}</p>
								<p className={styles.value}>{pocDetails[detail]}</p>
							</div>
						);
					})}
				</div>

			</div>

			<div className={styles.section}>
				<h3>{t('cargoInsurance:rate_card')}</h3>

				<div className={styles.container}>
					<div className={cl`${styles.header} ${styles.flex_box}`}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.insurance_pkg}
							className={styles.pkg_img}
							width={60}
							height={60}
							alt={t('cargoInsurance:pkg')}
						/>
						<div className={styles.title_container}>
							<Image
								src={INSURANCE_PROVIDER?.[serviceProvider]}
								width={140}
								height={14}
								alt={serviceProvider}
							/>
							<h3 className={styles.total_price}>
								{getFormatedAmount({ currency: chargeCurrency, value: netCharges })}
							</h3>
						</div>
					</div>

					{serviceChargeList.map((item) => (
						<div key={item?.productCodeId} className={styles.line_item_flex}>
							<span>{startCase(item?.displayName)}</span>
							<span>{getFormatedAmount({ currency: chargeCurrency, value: item?.netCharges })}</span>
						</div>
					))}
				</div>
			</div>

			<PersonalDetailsModal detailModal={detailModal} setDetailModal={setDetailModal} />
		</div>
	);
}

export default SideBar;
