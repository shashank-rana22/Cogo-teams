import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../../common/Layout';

import getControls from './controls';
import styles from './styles.module.css';

function SearchForm({
	activeTab = '', activeService = '', setFilterParams = () => { }, filterParams = {},
	setShowPopver = () => { },
}) {
	const { controls = {} } = getControls({ activeTab });

	const { control, handleSubmit, reset } = useForm({ defaultValues: filterParams });

	const onSubmit = (values) => {
		setFilterParams((prev) => ({
			...prev,
			...values,
			margin_type: activeTab,
		}));

		setShowPopver(false);
	};

	const onReset = (values) => {
		const obj = values;

		Object.keys(values).forEach((key) => {
			obj[key] = undefined;
		});

		setFilterParams((prev) => ({
			...prev,
			...obj,
			status                : 'active',
			margin_type           : activeTab,
			service               : activeService,
			is_partner_id_present : true,
		}));

		reset();

		setShowPopver(false);
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
