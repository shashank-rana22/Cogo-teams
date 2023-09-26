import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../common/Layout';

import controls from './controls';
import styles from './styles.module.css';

function Filters({ filters = '', setFilters = () => {}, activeTab = '' }) {
	const { control, handleSubmit, reset } = useForm({ defaultValues: filters });

	const onReset = () => {
		setFilters({ status: activeTab });
		reset();
	};
	const onSubmit = (values) => {
		setFilters((p) => ({ ...p, ...(values || {}) }));
	};
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<Button themeType="secondary" size="sm" onClick={onReset} className={styles.button}>Reset</Button>
				<Button themeType="primary" size="sm" onClick={handleSubmit(onSubmit)}>Apply</Button>
			</div>
			<Layout controls={controls} control={control} />
		</div>
	);
}
export default Filters;
