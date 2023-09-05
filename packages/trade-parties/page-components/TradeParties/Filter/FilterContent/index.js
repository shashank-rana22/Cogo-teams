import { Button } from '@cogoport/components';
import { SelectController, InputController, useForm, CountrySelectController } from '@cogoport/forms';

import companyOptions from './companyOptions';
import styles from './styles.module.css';

const ONE = 1;
function FilterContent({
	filterParams,
	setFilterParams,
	setIsFilterVisible,
	setPage,
}) {
	const DEFAULT_VALUES = filterParams;
	const {
		control,
		handleSubmit,
		reset,
	} = useForm({ defaultValues: DEFAULT_VALUES });

	const onSubmit = (values) => {
		setPage(ONE);
		setFilterParams(values);
		setIsFilterVisible(false);

		// console.log(values);
	};
	const onReset = () => {
		const RESET_VALUE = {};
		Object.keys(filterParams).forEach((key) => { RESET_VALUE[key] = ''; });
		// console.log(resetValue);
		setPage(ONE);
		setFilterParams(RESET_VALUE);
		reset(RESET_VALUE);
		setIsFilterVisible(false);
	};
	return (
		<form>
			<div className={styles.filter}>
				<div className={styles.header}>
					<div>
						<h3>Search</h3>
					</div>
					<div className={styles.right}>

						<Button size="md" themeType="secondary" onClick={onReset}>
							RESET FORM
						</Button>
						<Button
							className={styles.results_button}
							size="md"
							onClick={handleSubmit(onSubmit)}
						>

							SHOW RESULTS
						</Button>
					</div>
				</div>
				<hr />
				<br />
				<h4>Serial ID</h4>
				<InputController
					size="md"
					placeholder="Enter serial ID"
					name="serial_id"
					value={filterParams.serial_id}
					control={control}
				/>
				<br />

				<h4>PAN Number</h4>
				<InputController
					size="md"
					placeholder="Enter number"
					name="registration_number"
					control={control}
					value={filterParams.registration_number}
				/>
				<br />

				<h4>Country</h4>
				<CountrySelectController
					name="country_id"
					control={control}
					size="md"
					placeholder="Enter or Select Country"
					optionValueKey="id"

				/>
				<br />

				<div>Company Type</div>
				<SelectController
					size="md"
					name="company_type"
					control={control}
					options={companyOptions}
					value={filterParams.company_type}
				/>
			</div>
		</form>
	);
}
export default FilterContent;
