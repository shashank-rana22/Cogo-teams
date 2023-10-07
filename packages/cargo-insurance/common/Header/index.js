import { Pill, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowBack, IcMCross, IcMEdit, IcMPortArrow } from '@cogoport/icons-react';
import InsuranceForm from '@cogoport/insurance-form';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import { SERVICE_ICON_MAPPING, SERICE_TYPE_MAPPING } from '../../constants/serviceIcon';

import styles from './styles.module.css';

function RenderPort({ name = '' }) {
	const spiltedName = name.split(',') || [];
	const portName = spiltedName[GLOBAL_CONSTANTS.zeroth_index];
	let restName = '';

	spiltedName.forEach((ele, i) => {
		if (i !== GLOBAL_CONSTANTS.zeroth_index) {
			restName += `${ele},`;
		}
	});
	return (
		<div style={{ maxWidth: '40%', margin: '0 15px' }}>
			<span>{portName}</span>
			<span className={styles.rest_port_name}>{restName}</span>
		</div>
	);
}

function Header({ data = {}, draftData = {} }) {
	const { back } = useRouter();

	const [showForm, setShowForm] = useState(false);

	const { originName, destinationName, orgDetails = {}, hsCode, cargoValue, currency, type } = data || {};
	const { cargoDetails = {}, invoiceDetails = {} } = draftData || {};
	const { invoiceCurrency, invoiceValue } = invoiceDetails || {};
	const { hsCode: newHsCode, transitMode, originCountry, destinationCountry } = cargoDetails || {};

	return (
		<div style={{ position: 'relative' }}>
			<div className={cl`${styles.container} ${styles.flex_box}`}>
				<div className={styles.back_container}>
					<IcMArrowBack width={20} height={20} onClick={back} />
				</div>

				<div className={cl`${styles.flex_box} ${styles.info_container}`}>

					<div className={cl`${styles.flex_box} ${styles.port_info}`}>
						<div className={styles.type_container}>
							{SERVICE_ICON_MAPPING[type || transitMode]}
							<span className={styles.type}>{SERICE_TYPE_MAPPING[type || transitMode]}</span>
						</div>

						<div className={cl`${styles.flex_box} ${styles.port_pair}`}>
							<RenderPort name={originName || originCountry} />
							<IcMPortArrow width={25} height={25} />
							<RenderPort name={destinationName || destinationCountry} />
						</div>
					</div>

					<div className={cl`${styles.flex_box} ${styles.extra_info}`}>
						<div>
							<Pill color="#F2F2F2" size="lg">
								HS Code:
								{' '}
								{hsCode || newHsCode}
							</Pill>

							<Pill color="#ebd9fc" size="lg">
								{formatAmount({
									amount   : cargoValue || invoiceValue,
									currency : currency || invoiceCurrency,
									options  : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}
							</Pill>
						</div>

						<div
							className={cl`${styles.edit_icon} ${styles.flex_box} ${showForm ? styles.rotate : ''}`}
							onClick={() => setShowForm((prev) => !prev)}
							role="presentation"
						>
							{!showForm ? <IcMEdit /> : <IcMCross />}
						</div>
					</div>
				</div>

			</div>
			<div className={cl`${styles.drill_content} ${showForm ? styles.show_drill_content : ''}`}>
				<InsuranceForm organization={orgDetails} src="cargo_insurance" showFormFn={setShowForm} />
			</div>
			{showForm ? <div className={styles.overlay} /> : null}
		</div>
	);
}

export default Header;
