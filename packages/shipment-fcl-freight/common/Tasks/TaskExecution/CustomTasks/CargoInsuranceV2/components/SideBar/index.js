import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getPocMapping from '../../constants/getPocMapping';
import INSURANCE_PROVIDER from '../../constants/insuranceProvider';

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
	const [detailModal, setDetailModal] = useState({
		openModal : false,
		info      : {},
	});

	const POC_MAPPING = getPocMapping();

	const {
		netCharges = '',
		chargeCurrency = '',
		serviceProvider = '',
		serviceChargeList = [],
	} = rateResponse?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div>
			<div className={cl`${styles.section} ${styles.personal_detail}`}>
				<h3>Personal Details</h3>

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
										openModal: true,
										// info      : pocDetails,
									})}
								>
									Edit
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
				<h3>Rate Card</h3>

				<div className={styles.container}>
					<div className={cl`${styles.header} ${styles.flex_box}`}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.insurance_pkg}
							className={styles.pkg_img}
							width={60}
							height={60}
							alt="package"
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
		</div>
	);
}

export default SideBar;
