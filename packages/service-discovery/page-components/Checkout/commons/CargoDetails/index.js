import { Datepicker, Input } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

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
		component       : Input,
		key             : 'cargo_value',
		icon            : GLOBAL_CONSTANTS.image_url.cargo_value_s2c_png,
		componentProps  : {
			type: 'number',
		},
	},
	{
		heading         : 'Commodity we’re transporting',
		label           : 'Find by HS Code',
		backgroundColor : '#FFFEFD',
		border          : '1px solid #F3FAFA',
		component       : AsyncSelect,
		key             : 'hs_code',
		icon            : GLOBAL_CONSTANTS.image_url.hs_code_s2c_png,
		componentProps  : {
			asyncKey : 'list_saas_hs_codes',
			disabled : true,
		},
	},
];

function CargoDetails({ cargoDetails = {}, setCargoDetails = () => {} }) {
	return (
		<div className={styles.container}>
			{MAPPING.map((item) => {
				const {
					heading,
					label,
					component: ActiveComponent,
					key,
					componentProps = {},
					icon: iconUrl,
					...styleProps
				} = item;

				return (
					<div key={key} className={styles.item_container}>
						<div className={styles.heading}>{heading}</div>

						<div className={styles.content} style={{ ...styleProps }}>
							<img src={iconUrl} width={44} height={44} alt="Empty-state" />

							<div className={styles.control_item}>
								<div className={styles.label}>{label}</div>

								<ActiveComponent
									{...componentProps}
									value={cargoDetails[key]}
									onChange={(value) => {
										setCargoDetails((prev) => ({ ...prev, [key]: value }));
									}}
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CargoDetails;
