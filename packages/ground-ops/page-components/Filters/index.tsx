import { Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Layout from '../Air/commons/Layout';

import filterControls from './filter-controls';
import styles from './styles.module.css';

function Filters({ listAPi = () => {}, setFilters = () => {} }) {
	const [visible, setVisible] = useState(false);
	const { control, handleSubmit, watch, setValue, formState:{ errors } } = useForm();
	console.log('watch', watch());

	const onSubmit = (formValues) => {
		setFilters((prev) => ({ ...prev, ...formValues }));
	};
	const popoverContent = () => (
		<>
			<Layout fields={filterControls} control={control} errors={errors} register={undefined} />
			<div className={styles.footer_button}>
				<Button themeType="secondary" onClick={() => setVisible(false)}>Cancel</Button>
				<Button onClick={handleSubmit(onSubmit)}>Apply</Button>

			</div>

		</>
	);
	return (
		<div className={styles.container}>

			<Popover
				placement="bottom"
				render={popoverContent()}
				onClickOutside={() => setVisible(false)}
				interactive
				className={`${styles.filters_popover} ${styles.popover_container}`}
				visible={visible}
			>
				<Button
					themeType="tertiary"
					size="lg"
					className={styles.filter_svg}
					onClick={() => setVisible((prev) => !prev)}
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
