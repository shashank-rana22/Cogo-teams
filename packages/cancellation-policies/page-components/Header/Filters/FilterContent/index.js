import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import Layout from '../../../../common/Layout';

import styles from './styles.module.css';

function FilterContent({
	filterValues = {}, setFilterValues = () => {},
	controls = [], visible = false, setVisible = () => {},
}) {
	const { control, handleSubmit, reset } = useForm({ defaultValues: filterValues });

	const handleFilterSubmit = (value) => {
		const arr = Object.keys(value || {}).filter((item) => (value[item] !== ''));

		if (!isEmpty(arr)) {
			const NEW_VALUE = {};
			arr.forEach((obj) => {
				(NEW_VALUE[obj] = value[obj]);
				return true;
			});

			setFilterValues(NEW_VALUE);
		}
		setVisible(!visible);
	};
	const onReset = () => {
		setFilterValues({});
		reset();
		setVisible(!visible);
	};
	return (
		<div className={styles.container}>
			<div className={styles.form_header}>
				<Button themeType="tertiary" onClick={onReset} className={styles.form_btn}>
					Clear Filters

				</Button>

				<Button
					themeType="primary"
					onClick={handleSubmit(handleFilterSubmit)}
				>
					Apply

				</Button>

			</div>
			<Layout controls={controls} control={control} />
		</div>
	);
}

export default FilterContent;
