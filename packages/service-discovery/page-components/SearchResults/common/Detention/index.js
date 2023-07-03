import { Button } from '@cogoport/components';
import { CheckboxController, InputNumberController, useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const suffix = <span style={{ paddingRight: 12, fontSize: 12 }}>Days</span>;

const renderFormItem = ({ name, control }) => (
	<div className={styles.form_subgroup}>
		<div className={styles.label}>{`Free ${startCase(name)} Days Required`}</div>

		<div className={styles.form_item_wrapper}>
			<div className={styles.form_item}>
				<div className={styles.label}>At Origin</div>

				<InputNumberController
					name={`${name}_origin`}
					control={control}
					value={5}
					suffix={suffix}
					arrow={false}
				/>
			</div>

			<div className={styles.form_item}>
				<div className={styles.label}>At Destination</div>

				<InputNumberController
					name={`${name}_destination`}
					control={control}
					value={5}
					suffix={suffix}
					arrow={false}
				/>
			</div>
		</div>
	</div>
);

function Detention({ values = {}, setValues = () => {}, ...rest }) {
	const { control, handleSubmit } = useForm();

	const onClickSave = (val) => {
		setValues(val);
	};

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
				<Button
					type="button"
					size="md"
					themeType="secondary"
					className={styles.button}
				>
					Reset
				</Button>

				<Button
					type="button"
					size="md"
					themeType="accent"
					onClick={handleSubmit(onClickSave)}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default Detention;
