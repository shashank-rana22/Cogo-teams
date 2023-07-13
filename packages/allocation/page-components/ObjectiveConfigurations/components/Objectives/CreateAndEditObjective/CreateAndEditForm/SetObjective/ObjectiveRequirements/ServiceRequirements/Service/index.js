import { Button } from '@cogoport/components';
import { IcMCrossInCircle } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../../../../../../common/Form/getFieldController';
import getServiceRequirementControls from '../../../../../../../../configurations/service-requirements-form-controls';
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
	} = props;

	const watchShipmentMode = watch(`${name}.${index}.shipment_mode`);
	const watchServiceType = watch(`${name}.${index}.service_type`);

	const controls = getServiceRequirementControls({ watchShipmentMode, watchServiceType });

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<h4>{`1.${index + FIRST_INDEX_NORMALIZATION} Service Requirements`}</h4>

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
