import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';

import Layout from '../../../../../common/Layout';
import getFilterControls from '../filter-control';

import styles from './styles.module.css';

function Filters({ filters = {}, setFilters = () => {}, setShow = () => {}, activeTab = 'continent' }) {
	const { page, ...restFilters } = filters || {};

	const { t } = useTranslation(['locations']);

	const { control, watch } = useForm({ defaultValues: restFilters });
	const controls = getFilterControls({ t });

	const newControls = controls.filter(
		(field) => !field?.condition || field?.condition?.type.includes(activeTab),
	);

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
				<Button onClick={() => onSubmit(watch())}>Show Result</Button>
			</div>

			<div>
				<Layout controls={newControls} control={control} />
			</div>
		</div>
	);
}

export default Filters;
