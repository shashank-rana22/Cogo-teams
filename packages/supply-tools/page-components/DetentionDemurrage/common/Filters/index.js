import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../../common/Layout';

import styles from './styles.module.css';

function Filters({ controls = [], filters = {}, setFilters = () => {}, setShow = () => {} }) {
	const { page, ...restFilters } = filters || {};
	const { control, handleSubmit } = useForm({ defaultValues: restFilters });

	const onReset = () => {
		setFilters({ page });
		setShow(false);
	};

	const onSubmit = (values) => {
		setFilters({ page, ...restFilters, ...(values || {}) });
		setShow(false);
	};

	return (
		<div>
			<div className={styles.button_container}>
				<Button onClick={onReset} themeType="secondary" size="sm">Reset</Button>

				<Button onClick={handleSubmit(onSubmit)} size="sm">Show Result</Button>
			</div>

			<div>
				<Layout controls={controls} control={control} />
			</div>
		</div>
	);
}

export default Filters;
