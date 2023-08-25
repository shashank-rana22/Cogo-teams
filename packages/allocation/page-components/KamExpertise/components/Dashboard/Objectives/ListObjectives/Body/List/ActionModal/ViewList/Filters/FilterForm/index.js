import { Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { getFieldController } from '../../../../../../../../../../../../common/Form/getFieldController';
import getControls from '../../../../../../../../../../configurations/get-kam-list-filter-controls';

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

	const { id: partnerId = '' } = useSelector((state) => state.profile.partner);

	const onSubmit = async (values) => {
		setParams((pv) => ({
			...pv,
			filters: {
				...pv.filters,
				manager_ids         : values?.manager_ids || undefined,
				role_ids            : values?.role_ids || undefined,
				kam_expertise_level : values?.kam_expertise_level || undefined,
				kam_status          : values?.kam_status || undefined,
			},
		}));
		setShowFilterPopover(false);
	};

	const newControls = getControls(partnerId, t);

	const onClickCancel = () => {
		newControls.forEach((item) => {
			setValue(`${item.name}`, '');
		});

		setParams((pv) => ({
			...pv,
			filters: {
				objective_id: pv?.filters?.objective_id,
			},
		}));
		setShowFilterPopover(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{newControls.map((element) => {
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
