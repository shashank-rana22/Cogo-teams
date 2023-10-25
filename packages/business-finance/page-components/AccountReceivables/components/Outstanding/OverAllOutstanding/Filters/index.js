import { Button, Popover } from '@cogoport/components';
import { AsyncSelectController, useForm, RadioGroupController } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ShowFilterOptions({
	controls = [],
	setFilters = () => {},
	setShow = () => {},

}) {
	const { control, handleSubmit, reset } = useForm();

	const onSubmit = (values) => {
		setFilters(values);
		setShow(false);
	};

	const onReset = () => {
		setFilters({});
		reset();
		// refetch();
		setShow(false);
	};

	return (

		<div className={styles.filter_container}>
			<div className={styles.action_buttons}>
				<Button
					themeType="secondary"
					size="md"
					onClick={() => {
						onReset();
					}}
				>
					Reset
				</Button>
				<Button
					themeType="primary"
					size="md"
					onClick={handleSubmit(onSubmit)}
				>
					Apply
				</Button>

			</div>

			{controls.map((item) => {
				switch (item?.type) {
					case 'asyncSelect':
						return (
							<div style={{ marginTop: '10px' }}>
								<b>{item.label}</b>
								<AsyncSelectController
									key={item?.name}
									{...item}
									control={control}
								/>
							</div>
						);
					case 'radio':
						return (
							<div style={{ marginTop: '10px' }}>
								<b>{item.label}</b>
								<RadioGroupController
									key={item?.name}
									{...item}
									control={control}
								/>
							</div>
						);
					default:

						return null;
				}
			})}

		</div>

	);
}

function Filters({
	controls = [], filters = {},
	setFilters = () => {},
	clearFilter = () => {},
}) {
	const [show, setShow] = useState(false);

	return (

		<Popover
			visible={show}
			placement="bottom"
			onClickOutside={() => setShow(false)}
			render={(
				<ShowFilterOptions
					controls={controls}
					setFilters={setFilters}
					filters={filters}
					clearFilter={clearFilter}
					setShow={setShow}
				/>

			)}
		>

			<Button
				themeType="secondary"
				size="lg"
				onClick={() => {
					setShow(!show);
				}}
			>

				Filters

				{' '}

				<IcMFilter className={styles.style_filter_button} />

			</Button>

		</Popover>

	);
}

export default Filters;
