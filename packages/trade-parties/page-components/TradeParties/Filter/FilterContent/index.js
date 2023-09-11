import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../../common/Layout';
import controls from '../controls';

import styles from './styles.module.css';

function FilterContent({
	filterParams = {},
	setFilterParams = (() => {}),
	setIsFilterVisible = (() => {}),
}) {
	const {
		control,
		handleSubmit,
		reset,
	} = useForm({ defaultValues: filterParams });

	const onSubmit = (values) => {
		setFilterParams({ ...values, page: 1 });
		setIsFilterVisible(false);
	};

	const onReset = () => {
		setFilterParams({ page: 1 });
		reset();
		setIsFilterVisible(false);
	};
	return (
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

	);
}
export default FilterContent;
