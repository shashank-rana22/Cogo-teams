import { Button } from '@cogoport/components';
import { AsyncSelectController, useForm, RadioGroupController, ToggleController } from '@cogoport/forms';
import React from 'react';

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
					case 'toggle':
						return (
							<div className="toggle">
								<b>{item.label}</b>
								<ToggleController
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

export default ShowFilterOptions;
