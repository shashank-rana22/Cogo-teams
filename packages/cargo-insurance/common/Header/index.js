import { Button, Pill, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowBack, IcMPortArrow } from '@cogoport/icons-react';
import InsuranceForm from '@cogoport/insurance-form';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import SERVICE_ICON_MAPPING from '../../constants/serviceIcon';

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
		<div style={{ margin: '0 15px' }}>
			<span>{portName}</span>
			<span className={styles.rest_port_name}>{restName}</span>
		</div>
	);
}

function Header({ data = {} }) {
	const { back } = useRouter();

	const [showForm, setShowForm] = useState(false);

	const { originName, destinationName, orgDetails = {}, hsCode, value, currency, type } = data || {};

	return (
		<>
			<div className={cl`${styles.container} ${styles.flex_box} ${showForm ? styles.border : ''}`}>
				<div className={styles.back_container}>
					<IcMArrowBack width={20} height={20} onClick={back} />
				</div>

				<div className={cl`${styles.flex_box} ${styles.info_container}`}>

					<div className={cl`${styles.flex_box} ${styles.port_info}`}>
						<div className={styles.type_container}>
							{SERVICE_ICON_MAPPING[type]}
							<span className={styles.type}>{startCase(type)}</span>
						</div>

						<div className={styles.flex_box}>
							<RenderPort name={originName} />
							<IcMPortArrow width={25} height={25} />
							<RenderPort name={destinationName} />
						</div>
					</div>

					<div className={cl`${styles.flex_box} ${styles.extra_info}`}>
						<div>
							<Pill color="#F2F2F2" size="lg">
								HS Code:
								{' '}
								{hsCode}
							</Pill>

							<Pill color="#ebd9fc" size="lg">
								{formatAmount({
									amount  : value,
									currency,
									options : {
										style           : 'currency',
										currencyDisplay : 'code',
									},
								})}
							</Pill>
						</div>

						<Button size="sm" themeType="accent" onClick={() => setShowForm((prev) => !prev)}>Edit</Button>
					</div>
				</div>

			</div>
			<div className={cl`${styles.drill_content} ${showForm ? styles.show_drill_content : ''}`}>
				<InsuranceForm organization={orgDetails} src="cargo_insurance" showFormFn={setShowForm} />
			</div>
		</>
	);
}

export default Header;
