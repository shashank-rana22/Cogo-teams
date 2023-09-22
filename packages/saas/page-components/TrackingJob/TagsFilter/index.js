import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../common/Layout';

import getFilterControls from './filter-controls';
import styles from './styles.module.css';

function Filters({ filters = {}, setFilters = () => {}, setShow = () => {} }) {
	const { page, ...restFilters } = filters || {};

	const { control, handleSubmit } = useForm({ defaultValues: restFilters });
	const controls = getFilterControls;
	const onReset = () => {
		setFilters({ page: 1 });
		setShow(false);
	};

	const onSubmit = (values) => {
		setFilters({ ...restFilters, ...(values || {}), page: 1 });

		setShow(false);
	};

	return (
		<div className={styles.filter_container}>
			<div className={styles.button_container}>
				<Button onClick={onReset} themeType="secondary">Reset</Button>

				<Button onClick={handleSubmit(onSubmit)}>Show Result</Button>
			</div>
			<div>
				<Layout controls={controls} control={control} />
			</div>
		</div>
	);
}

export default Filters;
