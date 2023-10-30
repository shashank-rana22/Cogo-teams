import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect, useCallback } from 'react';

import Layout from '../../../../../common/Layout';

import getControls from './controls';
import styles from './styles.module.css';

function ListFilters({
	setFilters = () => { },
	activeService = '',
	setShowPopover = () => {},
}) {
	const DEFAULT_VALUES = {};

	const controls = getControls({ activeService });

	const
		{ control, formState: { errors = {} } = {}, handleSubmit, reset } = useForm({
			defaultValues: DEFAULT_VALUES,
		});

	const onClickReset = useCallback(() => {
		setShowPopover(false);
		setFilters({});
		reset();
	}, [setFilters, setShowPopover, reset]);

	const onSave = (values) => {
		const filter = Object.fromEntries(
			Object.entries(values).filter(([, value]) => value),
		);

		setFilters({ ...filter });
		setShowPopover(false);
	};

	useEffect(() => {
		onClickReset();
	}, [activeService, onClickReset]);

	return (
		<div className={styles.container}>
			<Layout
				controls={controls}
				control={control}
				errors={errors}
			/>
			<div className={styles.btn_container}>
				<Button
					themeType="secondary"
					style={{ marginRight: 8 }}
					onClick={onClickReset}
				>
					RESET
				</Button>
				<Button onClick={handleSubmit(onSave)}>
					APPLY
				</Button>
			</div>
		</div>
	);
}

export default ListFilters;
