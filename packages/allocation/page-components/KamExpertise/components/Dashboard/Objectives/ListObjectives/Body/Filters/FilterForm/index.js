import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { getFieldController } from '../../../../../../../../../common/Form/getFieldController';
import getControls from '../../../../../../../configurations/get-list-objectives-filter-controls';

import styles from './styles.module.css';

function FilterForm({
	control = {},
	handleSubmit = () => { },
	errors = {},
	setParams = () => { },
	setShowFilterPopover = () => { },
	setValue = () => { },
}) {
	const { t } = useTranslation(['allocation']);

	const controls = getControls({ t });

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
		controls.forEach((item) => {
			setValue(`${item.name}`, '');
		});

		setParams((pv) => ({
			...pv,
			filters: {
				status: pv?.filters?.status,
			},
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
					{t('allocation:reset_all_button')}
				</Button>
				<Button
					type="submit"
					size="md"
					themeType="primary"
				>
					{t('allocation:apply_button')}
				</Button>
			</div>
		</form>
	);
}

export default FilterForm;
