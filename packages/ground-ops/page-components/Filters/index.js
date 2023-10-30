import { Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter, IcCRedCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Layout from '../Air/commons/Layout';

import filterControls from './filter-controls';
import styles from './styles.module.css';

function Filters({ setFilters = () => {}, filters = {} }) {
	const [visible, setVisible] = useState(false);
	const { control, handleSubmit, reset, setValue, formState:{ errors } } = useForm();

	const onSubmit = (formValues) => {
		const finalValues = {};
		Object.keys(formValues).forEach((key) => {
			if (formValues[key] === '') {
				finalValues[key] = undefined;
			} else {
				finalValues[key] = formValues[key];
			}
		});
		setFilters((prev) => ({ ...prev, ...finalValues }));
		setVisible(false);
	};
	const handleClear = () => {
		Object.keys(filters).forEach((key) => {
			setValue(key, null);
		});
		reset();
		setFilters({});
		setVisible(false);
	};
	const popoverContent = () => (
		<>
			<Layout fields={filterControls} control={control} errors={errors} />
			<div className={styles.footer_button}>
				<Button themeType="secondary" onClick={() => handleClear()}>Clear</Button>
				<Button onClick={handleSubmit(onSubmit)}>Apply</Button>
			</div>
		</>
	);
	return (
		<div className={styles.container}>
			<Popover
				placement="bottom"
				trigger="click"
				render={popoverContent()}
				className={`${styles.filters_popover} ${styles.popover_container}`}
				visible={visible}
			>
				<Button
					themeType="secondary"
					size="md"
					className={styles.filter_svg}
					onClick={() => setVisible((prev) => !prev)}
				>
					Filters
					{' '}
					<IcMFilter />
					{!isEmpty(filters) && <IcCRedCircle height={8} width={8} className={styles.filter_dot} /> }
				</Button>
			</Popover>

		</div>
	);
}

export default Filters;
