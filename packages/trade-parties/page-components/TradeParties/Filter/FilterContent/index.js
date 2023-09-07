import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from '../controls';

import Layout from './Layout';
import styles from './styles.module.css';

const ONE = 1;
function FilterContent({
	filterParams = '',
	setFilterParams = (() => {}),
	setIsFilterVisible = (() => {}),
	setPage = (() => {}),
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
		<form className={styles.form}>
			<div className={styles.filter}>
				<div className={styles.header}>
					<div className={styles.right}>

						<Button size="md" themeType="secondary" onClick={onReset} className={styles.button}>
							RESET FORM
						</Button>
						<Button
							className={styles.button}
							size="md"
							onClick={handleSubmit(onSubmit)}
						>

							SHOW RESULTS
						</Button>
					</div>
				</div>

				<br />
				<Layout controls={controls} control={control} />
			</div>
		</form>
	);
}
export default FilterContent;
