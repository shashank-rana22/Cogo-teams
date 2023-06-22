import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import getControls from './controls';
import FieldArray from './FieldArray';
import styles from './styles.module.css';
import useFilterDisplay from './useFilterDisplay';

function FiltersDisplay({ setFilters, setShowKRACalculationTable }) {
	const {
		watch,
		control,
		handleSubmit,
		onSubmit,
		errors,
	} = useFilterDisplay({ setFilters, setShowKRACalculationTable });

	const WATCH_VALUES = watch();

	const controlItems = getControls(WATCH_VALUES);
	const { controls } = controlItems;

	return (
		<form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
			<section className={styles.form_container}>
				<FieldArray
					name="single_item"
					control={control}
					watch={watch}
					error={errors}
					controls={controls}
					buttonText="Add More KRA"
					showButtons
					disabled={false}
				/>
			</section>

			<div className={styles.button_container}>
				<Button
					size="sm"
					themeType="secondary"
					type="submit"
				>
					Proceed to Allocate KRAs &nbsp;
					<IcMArrowNext />
				</Button>
			</div>
		</form>
	);
}

export default FiltersDisplay;
