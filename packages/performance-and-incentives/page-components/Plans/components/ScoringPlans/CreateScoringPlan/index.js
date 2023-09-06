import { Button } from '@cogoport/components';
// import { useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import ACTIVE_MODE_KEYS_MAPPING from '../../../constants/active-mode-key-mapping';

// import getElementController from '../configurations/getElementController';

// import { getControls } from './controls';
import styles from './styles.module.css';

const { LIST } = ACTIVE_MODE_KEYS_MAPPING;

function CreateScoringPlan({ setActiveMode = {} }) {
	// const { control, formState: { errors }, handleSubmit } = useForm();

	return (

		<>
			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setActiveMode(LIST)}
				/>

				<div role="presentation" className={styles.title}>Create Scoring Plan</div>

			</div>

			<h3>Scoring Applicable On</h3>

			<div className={styles.container}>

				{/* <div className={styles.form_container}>
					{getControls({}).map((controlItem) => {
						const { type, label, name } = controlItem || {};

						const Element = getElementController(type);

						return (
							<div className={styles.control_item} key={name}>
								<div className={styles.label}>
									{label}
									<sup className={styles.sup}>*</sup>
								</div>

								<div>
									<Element
										control={control}
										{...controlItem}
									/>

									{errors[name] && <div className={styles.error_msg}>This is required</div>}
								</div>
							</div>
						);
					})}

				</div> */}

			</div>

			<Button size="md" themeType="secondary" className={styles.btn}>Save</Button>

		</>

	);
}

export default CreateScoringPlan;
