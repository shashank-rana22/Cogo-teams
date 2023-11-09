import { Pill, cl, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowBack, IcMCross, IcMEdit, IcMPortArrow } from '@cogoport/icons-react';
import InsuranceForm from '@cogoport/insurance-form';
import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { SERVICE_ICON_MAPPING, SERICE_TYPE_MAPPING } from '../../constants/serviceIcon';

import styles from './styles.module.css';

function RenderPort({ name = '', loading = false }) {
	const spiltedName = name.split(',') || [];
	const portName = spiltedName[GLOBAL_CONSTANTS.zeroth_index];
	let restName = '';

	spiltedName.forEach((ele, i) => {
		if (i !== GLOBAL_CONSTANTS.zeroth_index) {
			restName += `${ele},`;
		}
	});

	if (loading) {
		return <Placeholder height="30px" />;
	}

	return (
		<div style={{ maxWidth: '40%', margin: '0 15px' }}>
			<span>{portName}</span>
			<span className={styles.rest_port_name}>{restName}</span>
		</div>
	);
}

const getFormValues = ({ src, metadata, rateRequest, invoiceDetails, cargoDetails }) => {
	const { origin = {}, destination = {}, transitMode } = metadata || {};

	if (src === 'checkout') {
		return ({
			...(invoiceDetails || {}),
			hsCode      : cargoDetails?.hsCode,
			origin      : origin?.id,
			destination : destination?.id,
			transitMode,
			metadata,
		});
	}

	return ({
		...(rateRequest || {}),
		origin      : origin?.id,
		destination : destination?.id,
		transitMode,
		metadata,
	});
};

function Header({
	metadata = {}, rateRequest = {}, cargoDetails = {}, invoiceDetails = {},
	organizationId = '', userId = '', loading = false, src = '',
}) {
	const { back } = useRouter();

	const { t } = useTranslation(['cargoInsurance']);

	const [showForm, setShowForm] = useState(false);
	const orgDetails = {
		user_id         : userId,
		organization_id : organizationId,
	};

	const { hsCode: cargoHsCode } = cargoDetails || {};
	const { invoiceCurrency: cargoCurrency = '', invoiceValue: cargoValue = '', hsCode } = rateRequest || {};
	const { origin = {}, destination = {}, transitMode } = metadata || {};
	const { invoiceCurrency = '', invoiceValue = '' } = invoiceDetails || {};

	return (
		<div style={{ position: 'relative' }}>
			<div className={cl`${styles.container} ${styles.flex_box}`}>
				<div className={styles.back_container}>
					<IcMArrowBack width={20} height={20} onClick={back} />
				</div>

				<div className={cl`${styles.flex_box} ${styles.info_container}`}>

					<div className={cl`${styles.flex_box} ${styles.port_info}`}>
						<div className={styles.type_container}>
							{SERVICE_ICON_MAPPING[transitMode]}
							<span className={styles.type}>{SERICE_TYPE_MAPPING[transitMode]}</span>
						</div>

						<div className={cl`${styles.flex_box} ${styles.port_pair}`}>
							<RenderPort name={origin?.display_name} loading={loading} />
							<IcMPortArrow width={25} height={25} />
							<RenderPort name={destination?.display_name} loading={loading} />
						</div>
					</div>

					<div className={cl`${styles.flex_box} ${styles.extra_info}`}>
						{loading ? <Placeholder height="30px" /> : (
							<>
								<div>
									<Pill color="#F2F2F2" size="lg">
										{t('cargoInsurance:hsCode')}
										{' '}
										{hsCode || cargoHsCode}
									</Pill>

									<Pill color="#ebd9fc" size="lg">
										{formatAmount({
											amount   : cargoValue || invoiceValue,
											currency : cargoCurrency || invoiceCurrency,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										})}
									</Pill>
								</div>

								<div
									className={cl`${styles.edit_icon}
									${styles.flex_box} ${showForm ? styles.rotate : ''}`}
									onClick={() => setShowForm((prev) => !prev)}
									role="presentation"
								>
									{!showForm ? <IcMEdit /> : <IcMCross />}
								</div>
							</>
						)}

					</div>
				</div>
			</div>

			<div className={cl`${styles.drill_content} ${showForm ? styles.show_drill_content : ''}`}>
				<InsuranceForm
					organization={orgDetails}
					src="cargo_insurance"
					formValues={getFormValues({ src, metadata, rateRequest, cargoDetails, invoiceDetails })}
				/>
			</div>

			{showForm ? <div className={styles.overlay} /> : null}
		</div>
	);
}

export default Header;
