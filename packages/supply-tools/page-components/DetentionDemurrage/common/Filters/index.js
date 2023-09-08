import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../../common/Layout';

import styles from './styles.module.css';

function Filters({ controls = [], filters = {}, setFilters = () => {}, setShow = () => {} }) {
	const finalControls = controls;

	const { page, ...restFilters } = filters || {};

	const { control, handleSubmit, watch } = useForm({ defaultValues: restFilters });

	const { location_type = '' } = watch();

	finalControls.forEach((_c, index) => {
		if (finalControls[index]?.name === 'location_id' && location_type) {
			finalControls[index].params.filters.type = location_type;
		}
	});

	const onReset = () => {
		setFilters({ page: 1 });
		setShow(false);
	};

	const onSubmit = (values) => {
		setFilters({ ...restFilters, ...(values || {}), page: 1 });
		setShow(false);
	};

	return (
		<div>
			<div className={styles.button_container}>
				<Button onClick={onReset} themeType="secondary">Reset</Button>

				<Button onClick={handleSubmit(onSubmit)}>Show Result</Button>
			</div>

			<div>
				<Layout controls={finalControls} control={control} />
			</div>
		</div>
	);
}

export default Filters;
