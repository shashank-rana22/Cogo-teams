import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../common/Layout';

import controls from './controls';
import styles from './styles.module.css';

function FilterContent({ setFilterParams = () => {}, filterParams = {}, setVisible = () => {} }) {
	const { control, handleSubmit, reset } = useForm({ defaultValues: filterParams });
	const onSubmit = (values) => {
		setFilterParams((prev) => ({ ...prev, ...values }));
		setVisible(false);
	};
	const onReset = (values) => {
		const obj = { ...values };
		Object.keys(values).forEach((key) => {
			obj[key] = '';
		});
		setFilterParams((prev) => ({ ...prev, ...obj }));
		reset();
		setVisible(false);
	};
	return (
		<div className={styles.form}>
			<div className={styles.flex_space}>
				<div className={styles.heading}>VIEW SUMMARY</div>
				<div className={styles.flex}>
					<Button
						themeType="secondary"
						size="sm"
						style={{ marginRight: 5 }}
						onClick={handleSubmit(onReset)}
					>
						CANCEL

					</Button>
					<Button size="sm" onClick={handleSubmit(onSubmit)}>APPLY</Button>
				</div>
			</div>
			<Layout controls={controls} control={control} />
		</div>
	);
}
export default FilterContent;
