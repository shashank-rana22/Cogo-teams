import { Button } from '@cogoport/components';
import { CheckboxController, InputNumberController, useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

const suffix = <span style={{ paddingRight: 12, fontSize: 12 }}>Days</span>;

const ADDITIONAL_DAYS_KEYS = ['destination_demurrage', 'origin_detention', 'origin_demurrage', 'destination_detention'];

const renderFormItem = ({ name, control }) => (
	<div className={styles.form_subgroup}>
		<div className={styles.label}>{` Total ${startCase(name)} Days `}</div>

		<div className={styles.form_item_wrapper}>
			<div className={styles.form_item}>
				<div className={styles.label}>At Origin</div>

				<InputNumberController
					name={`origin_${name}`}
					control={control}
					suffix={suffix}
					arrow={false}
					max="21"
				/>
			</div>

			<div className={styles.form_item}>
				<div className={styles.label}>At Destination</div>

				<InputNumberController
					name={`destination_${name}`}
					control={control}
					suffix={suffix}
					arrow={false}
					max="21"
				/>
			</div>
		</div>
	</div>
);

function Detention({ values = {}, handleClick = () => {}, ...rest }) {
	const { control, handleSubmit, setValue } = useForm();

	const onClickSave = (val) => {
		handleClick(val);
	};

	useEffect(() => {
		ADDITIONAL_DAYS_KEYS.forEach((item) => {
			setValue(item, values[item]);
		});
	}, [setValue, values]);

	return (
		<div className={styles.container}>
			{rest.heading ? (
				<strong className={styles.heading}>{rest.heading}</strong>
			) : null}

			<div className={styles.form}>

				{renderFormItem({ name: 'detention', control })}

				{renderFormItem({ name: 'demurrage', control })}

				<CheckboxController
					name="save_for_later"
					control={control}
					label="Save these preferences for future."
				/>
			</div>

			<div className={styles.button_container}>
				{/* <Button
					type="button"
					size="md"
					themeType="secondary"
					className={styles.button}
				>
					Reset
				</Button> */}

				<Button
					type="button"
					size="md"
					themeType="accent"
					onClick={handleSubmit(onClickSave)}
				>
					{rest.buttonTitle || 'Save'}
				</Button>
			</div>
		</div>
	);
}

export default Detention;
