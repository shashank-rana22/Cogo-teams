import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../common/Layout';

import getControls from './controls';
import styles from './styles.module.css';

function SearchForm({ activeTab = '', setFilterParams = () => {}, filterParams = {} }) {
	const { controls = {} } = getControls({ activeTab });
	const { control, handleSubmit, reset } = useForm({ defaultValues: filterParams });
	const onSubmit = (values) => {
		setFilterParams((prev) => ({ ...prev, ...values }));
	};
	const onReset = (values) => {
		const obj = values;
		Object.keys(values).forEach((key) => {
			obj[key] = '';
		});
		setFilterParams((prev) => ({ ...prev, ...obj }));
		reset();
	};
	return (
		<div className={styles.form}>
			<div className={styles.flex_space}>
				<div className={styles.heading}>Search</div>
				<div className={styles.flex}>
					<Button
						themeType="secondary"
						size="sm"
						style={{ marginRight: 5 }}
						onClick={handleSubmit(onReset)}
					>
						RESET FORM

					</Button>
					<Button size="sm" onClick={handleSubmit(onSubmit)}>SHOW RESULTS</Button>
				</div>
			</div>
			<Layout controls={controls} control={control} />
		</div>
	);
}
export default SearchForm;
