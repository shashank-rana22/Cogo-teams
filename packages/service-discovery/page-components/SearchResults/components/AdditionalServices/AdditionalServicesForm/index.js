import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import { serviceMappings } from '../../../../../configs/AdditionalServicesConfig';
import getElementController from '../../../../../configs/getElementController';

import styles from './styles.module.css';

function AdditionalServicesForm({ rateCardData, setAdditionalServiceDetails = () => {}, setHeaderProps = () => {} }) {
	const { service_type, service_rates } = rateCardData;

	const { control, watch } = useForm();

	const formValues = watch();

	const primaryService = service_type;
	const { controls } = serviceMappings[primaryService];

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				We need the following details to give you an accurate estimation and discount
			</div>
			<div className={styles.control_container}>
				{controls.map((controlItem) => {
					const Element = getElementController(controlItem.type);

					return (
						<div key={controlItem.name} className={styles.control_style}>

							<div className={styles.label}>
								{ controlItem.label}
							</div>

							<Element {...controlItem} control={control} />

						</div>
					);
				})}

				{/* {extraDocsControls.map((controlItem) => {
					const Element = getElementController(controlItem.type);

					return (
						<div key={controlItem.name} className={styles.control_style}>

							<div className={styles.label}>
								{ controlItem.label}
							</div>

							<Element {...controlItem} control={control} />

						</div>
					);
				})} */}

				<Button
					onClick={() => {
						setAdditionalServiceDetails(formValues);
						setHeaderProps({
							key: 'default',
						});
					}}
					size="md"
					themeType="accent"
					className={styles.primaryButtton}
				>
					Update Details
				</Button>
			</div>
		</div>

	);
}
export default AdditionalServicesForm;
