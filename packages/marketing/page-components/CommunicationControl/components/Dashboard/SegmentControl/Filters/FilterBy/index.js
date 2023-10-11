import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../../../common/Layout';
import controls from '../../../../../configurations/segment-filter-controls';
import removeObjEmptyValue from '../../../../../utils/removeObjEmptyValue';
import styles from '../styles.module.css';

function FilterBy({ setFilters = () => {}, filters = {}, setIsOpen = () => {} }) {
	const { control, handleSubmit } = useForm({ defaultValues: filters });

	const onReset = () => {
		setFilters({});
		setIsOpen(false);
	};

	const onSubmit = (values) => {
		setFilters(removeObjEmptyValue(values));
		setIsOpen(false);
	};

	return (
		<div>
			<div className={styles.filter_header}>
				<Button
					themeType="secondary"
					size="sm"
					style={{ marginRight: 5 }}
					onClick={onReset}
				>
					RESET FORM
				</Button>
				<Button
					size="sm"
					onClick={handleSubmit(onSubmit)}
				>
					SHOW RESULTS
				</Button>

			</div>

			<Layout
				control={control}
				controls={controls}
			/>
		</div>
	);
}

export default FilterBy;
