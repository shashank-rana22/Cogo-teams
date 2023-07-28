import { Datepicker, Input, Select, cl } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import currencies from '../../helpers/currencies';

import { getServiceMode } from './getServiceMode';
import styles from './styles.module.css';

function CargoDetails({ cargoDetails = {}, setCargoDetails = () => {}, detail = {} }) {
	const mode = getServiceMode(detail?.primary_service);

	const MAPPING = [
		{
			heading         : 'Your Cargo will be ready by',
			label           : 'Cargo Readiness Date',
			backgroundColor : '#FDFFFF',
			border          : '1px solid #F3FAFA',
			component       : Datepicker,
			key             : 'cargo_readiness_date',
			icon            : GLOBAL_CONSTANTS.image_url.cargo_readiness_date_s2c_png,
			componentProps  : {
				minDate: new Date(),
			},
		},
		{
			heading         : 'Estimated Cargo Value',
			label           : 'Value',
			backgroundColor : '#FEFDFF',
			border          : '1px solid #F3FAFA',
			component       : Select,
			component2      : Input,
			type            : 'cargo_value',
			key             : 'cargo_value_currency',
			component2Key   : 'cargo_value',
			icon            : GLOBAL_CONSTANTS.image_url.cargo_value_s2c_png,
			componentProps  : {
				type        : 'select',
				style       : { width: '40%', paddingRight: '12px' },
				placeholder : 'currency',
				options     : currencies,
			},
			component2Props: {
				type        : 'number',
				style       : { width: '60%' },
				placeholder : 'value',
			},
		},
		{
			heading         : 'Commodity we’re transporting',
			label           : 'Select Commodity Type',
			backgroundColor : '#FFFEFD',
			border          : '1px solid #F3FAFA',
			component       : AsyncSelect,
			key             : 'commodity_category',
			icon            : GLOBAL_CONSTANTS.image_url.hs_code_s2c_png,
			componentProps  : {
				asyncKey    : 'list_hs_code_commodities',
				params      : { service: mode },
				initialCall : true,
			},
		},
	];

	return (
		<div className={styles.container}>
			{MAPPING.map((item) => {
				const {
					heading,
					label,
					component: ActiveComponent,
					key,
					type = '',
					componentProps = {},
					component2:ActiveComponent2,
					component2Props,
					icon: iconUrl,
					component2Key,
					...styleProps
				} = item;

				return (
					<div key={key} className={styles.item_container}>
						<div className={styles.heading}>
							{heading}
							<sup className={styles.superscipt}>*</sup>
						</div>

						<div className={styles.content} style={{ ...styleProps }}>
							<img src={iconUrl} width={44} height={44} alt="Empty-state" />

							<div className={cl`${styles.control_item} ${styles[key]}`}>
								<div className={styles.label}>
									{label}
								</div>

								{type === 'cargo_value' ? (
									<div className={styles.flex}>
										<ActiveComponent
											{...componentProps}
											value={cargoDetails[key]}
											onChange={(value) => {
												setCargoDetails((prev) => ({ ...prev, [key]: value }));
											}}
										/>

										<ActiveComponent2
											{...component2Props}
											value={cargoDetails[component2Key]}
											onChange={(value) => {
												setCargoDetails((prev) => ({ ...prev, [component2Key]: value }));
											}}
										/>
									</div>
								) : (
									<ActiveComponent
										{...componentProps}
										value={cargoDetails[key]}
										onChange={(value) => {
											setCargoDetails((prev) => ({ ...prev, [key]: value }));
										}}
									/>
								)}

							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CargoDetails;
