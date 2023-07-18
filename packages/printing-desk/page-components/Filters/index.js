import { Layout } from '@cogoport/air-modules';
import { cl, Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter, IcCRedCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import filterControls from '../../configurations/filter-controls';

import styles from './styles.module.css';

function Filters({ setFilters = () => {}, filters = {} }) {
	const [visible, setVisible] = useState(false);
	const { control, handleSubmit, reset, setValue, formState:{ errors } } = useForm();

	const onSubmit = (formValues) => {
		const FINAL_VALUES = {};
		Object.keys(formValues).forEach((key) => {
			if (formValues[key] === '') {
				FINAL_VALUES[key] = undefined;
			} else if (key === 'cargoHandedOverAtOriginAt') {
				FINAL_VALUES[key] = new Date(formValues[key]).toISOString();
			} else {
				FINAL_VALUES[key] = formValues[key];
			}
		});
		setFilters((prev) => ({ ...prev, ...FINAL_VALUES }));
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

	function PopoverContent() {
		return (
			<>
				<Layout fields={filterControls} control={control} errors={errors} />
				<div className={styles.footer_button}>
					<Button
						themeType="secondary"
						style={{ marginRight: '16px' }}
						onClick={() => handleClear()}
					>
						Clear

					</Button>
					<Button onClick={handleSubmit(onSubmit)}>Apply</Button>
				</div>
			</>
		);
	}
	return (
		<div className={styles.container}>
			<Popover
				placement="bottom"
				trigger="click"
				render={<PopoverContent />}
				className={cl`${styles.filters_popover} ${styles.popover_container}`}
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
