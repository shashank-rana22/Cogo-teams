import { Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import getControls from './controls';
import FieldArray from './FieldArray';
import styles from './styles.module.css';
import useFilterDisplay from './useFilterDisplay';

const FIELD_ARRAY_NAME = 'single_item';
const BUTTON_TEXT = 'Add More KRA';

function FiltersDisplay({ setFilters, setShowKRACalculationTable }) {
	const {
		watch,
		control,
		handleSubmit,
		onSubmit,
		errors,
	} = useFilterDisplay({ setFilters, setShowKRACalculationTable });

	const watchTribeId = watch('tribe_id');

	const controlItems = getControls(watchTribeId);

	const { controls } = controlItems;

	return (
		<form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
			<section className={styles.form_container}>
				<FieldArray
					name={FIELD_ARRAY_NAME}
					control={control}
					watch={watch}
					error={errors}
					controls={controls}
					buttonText={BUTTON_TEXT}
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
					<span style={{ paddingRight: 6 }}>
						Proceed
					</span>
					<IcMArrowNext />
				</Button>
			</div>
		</form>
	);
}

export default FiltersDisplay;
