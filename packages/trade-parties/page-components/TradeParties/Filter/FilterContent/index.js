import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../../common/Layout';
import controls from '../controls';

import styles from './styles.module.css';

function FilterContent({
	filterParams = '',
	setFilterParams = (() => {}),
	setIsFilterVisible = (() => {}),
}) {
	const DEFAULT_VALUES = filterParams;
	const {
		control,
		handleSubmit,
		reset,
	} = useForm({ defaultValues: DEFAULT_VALUES });

	const onSubmit = (values) => {
		setFilterParams({ ...values, page: 1 });
		setIsFilterVisible(false);
	};
	const onReset = () => {
		const RESET_VALUE = {};
		Object.keys(filterParams).forEach((key) => { RESET_VALUE[key] = null; });
		RESET_VALUE.page = 1;
		setFilterParams(RESET_VALUE);
		reset();
		setIsFilterVisible(false);
	};
	return (
		<form className={styles.form}>
			<div className={styles.filter}>
				<div className={styles.header}>
					<Button size="sm" themeType="secondary" onClick={onReset} className={styles.button}>
						RESET FORM
					</Button>
					<Button
						className={styles.button}
						size="sm"
						onClick={handleSubmit(onSubmit)}
					>

						SHOW RESULTS
					</Button>
				</div>

				<br />
				<Layout controls={controls} control={control} />
			</div>
		</form>
	);
}
export default FilterContent;
