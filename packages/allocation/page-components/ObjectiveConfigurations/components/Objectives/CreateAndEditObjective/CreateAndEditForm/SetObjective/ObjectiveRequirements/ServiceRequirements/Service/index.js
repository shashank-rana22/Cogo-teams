import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import { getFieldController } from '../../../../../../../../../../common/Form/getFieldController';
// eslint-disable-next-line max-len
import getServiceRequirementControls from '../../../../../../../../configurations/get-service-requirements-form-controls';
import checkElementAllowed from '../../../../../../../../helpers/check-element-allowed';

import styles from './styles.module.css';

const FIRST_INDEX_NORMALIZATION = 1;

function Service(props) {
	const {
		control,
		index,
		name,
		remove,
		watch,
		setValue,
		serviceRequirementOperator,
		lifecycleStage,
		disabled,
	} = props;

	const watchShipmentMode = watch(`${name}.${index}.shipment_mode`);
	const watchServiceType = watch(`${name}.${index}.service_type`);
	const watchTradeType = watch(`${name}.${index}.trade_type`);

	const controls = getServiceRequirementControls({
		watchShipmentMode,
		watchServiceType,
		watchTradeType,
		lifecycleStage,
		disabled,
	});

	useEffect(() => {
		const subscription = watch((value, { name: controlName }) => {
			if (controlName === `${name}.${index}.trade_type`) {
				setValue(`${name}.${index}.inco_term`, []);
			}

			if (controlName === `${name}.${index}.service_type`) {
				setValue(`${name}.${index}.trade_type`, '');
				setValue(`${name}.${index}.origin_location`, '');
				setValue(`${name}.${index}.destination_location`, '');
				setValue(`${name}.${index}.inco_term`, []);
				setValue(`${name}.${index}.hs_codes`, []);
				setValue(`${name}.${index}.container_count`, '');
				setValue(`${name}.${index}.cargo_weight`, '');
				setValue(`${name}.${index}.volume`, '');
				setValue(`${name}.${index}.container_size`, []);
				setValue(`${name}.${index}.container_type`, []);
				setValue(`${name}.${index}.truck_type`, []);
			}

			if (controlName === `${name}.${index}.shipment_mode`) {
				setValue(`${name}.${index}.service_type`, '');
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, index, name, setValue]);

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.heading_container}>
					{index > GLOBAL_CONSTANTS.zeroth_index
					&& (
						<Pill
							color="orange"
							style={{ marginRight: '8px' }}
						>
							{startCase(serviceRequirementOperator || '')}
						</Pill>
					)}

					<h4 className={styles.heading}>{`1.${index + FIRST_INDEX_NORMALIZATION} Service Requirements`}</h4>
				</div>

				{index >= FIRST_INDEX_NORMALIZATION ? (
					<Button
						type="button"
						themeType="secondary"
						onClick={() => remove(index, FIRST_INDEX_NORMALIZATION)}
					>
						<IcMCrossInCircle style={{ marginRight: '4px' }} />
						Remove
					</Button>
				) : null}
			</div>

			<div className={styles.form_container}>
				{controls.map((controlItem) => {
					const { name: controlName, label, type, showElement, ...restControlItem } = controlItem;

					const Element = getFieldController(type);

					if (!Element || !checkElementAllowed({ showElement, watchShipmentMode, watchServiceType })) {
						return null;
					}

					return (
						<div key={`${name}.${index}.${controlName}`} className={styles.element_container}>
							<p>{label}</p>

							<Element
								{...restControlItem}
								control={control}
								name={`${name}.${index}.${controlName}`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Service;
