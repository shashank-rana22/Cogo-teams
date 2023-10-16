import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import Layout from '../../../../../common/Layout';
import getFilterControls from '../filter-control';

import styles from './styles.module.css';

function Filters({ filters = {}, setFilters = () => {}, setShow = () => {}, activeTab = 'continent' }) {
	const { page, ...restFilters } = filters || {};

	const { t } = useTranslation(['locations']);
	const { control, handleSubmit } = useForm({ defaultValues: restFilters });

	const controls = useMemo(() => getFilterControls({ t }).filter(
		(field) => !field?.condition || field?.condition?.type.includes(activeTab),
	), [t, activeTab]);

	const onReset = () => {
		setFilters({ page: 1 });
		setShow(false);
	};

	const onSubmit = (values) => {
		setFilters({ ...restFilters, ...(values || {}), page: 1 });
		setShow(false);
	};

	return ((
		<div className={styles.container}>
			<div className={styles.button_container}>
				<Button onClick={onReset} themeType="secondary">Reset</Button>
				<Button onClick={handleSubmit(onSubmit)}>Show Result</Button>
			</div>

			<Layout controls={controls} control={control} />
		</div>
	)
	);
}

export default Filters;
