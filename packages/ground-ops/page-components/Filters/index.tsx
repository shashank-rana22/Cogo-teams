import { Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Layout from '../Air/commons/Layout';

import filterControls from './filter-controls';
import styles from './styles.module.css';

interface Props {
	setFilters: any;
	filters: any;
}

function Filters({ setFilters = () => {}, filters = {} }:Props) {
	const [visible, setVisible] = useState(false);
	const { control, handleSubmit, reset, setValue, formState:{ errors } } = useForm();

	const onSubmit = (formValues: any) => {
		setFilters((prev?:any) => ({ ...prev, ...formValues }));
	};
	const handleClear = () => {
		Object.keys(filters).forEach((key) => {
			setValue(key, undefined);
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
				render={popoverContent()}
				className={`${styles.filters_popover} ${styles.popover_container}`}
				visible={visible}
			>
				<Button
					themeType="secondary"
					size="md"
					className={styles.filter_svg}
					onClick={() => setVisible((prev: any) => !prev)}
				>
					Filters
					{' '}
					<IcMFilter />
				</Button>
			</Popover>

		</div>
	);
}

export default Filters;
