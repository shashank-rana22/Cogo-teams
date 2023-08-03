import { Button } from '@cogoport/components';
import React from 'react';

import { getFieldController } from '../../../../../../../../../common/Form/getFieldController';
import controls from '../../../../../../../configurations/get-list-objectives-filter-controls';

import styles from './styles.module.css';

function FilterForm({
	control = {},
	handleSubmit = () => { },
	errors = {},
	setParams = () => { },
	setShowFilterPopover = () => { },
}) {
	const onSubmit = async (values) => {
		setParams((pv) => ({
			...pv,
			filters: {
				...pv.filters,
				...values,
			},
		}));
		setShowFilterPopover(false);
	};

	const onClickCancel = () => {
		setParams((pv) => ({
			...pv,
			filters: {},
		}));
		setShowFilterPopover(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{controls.map((element) => {
				const Element = getFieldController(element.type);

				return (
					<div key={element.name} className={styles.controller}>
						<div className={styles.label}>
							{element.label}
						</div>

						<Element
							{...element}
							key={element.name}
							control={control}
						/>

						<div className={styles.error_message}>
							{errors?.[element.name]?.message}
						</div>
					</div>
				);
			})}

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					style={{ marginRight: 8 }}
					onClick={onClickCancel}
				>
					Reset All
				</Button>
				<Button
					type="submit"
					size="md"
					themeType="primary"
				>
					Apply
				</Button>
			</div>
		</form>
	);
}

export default FilterForm;
