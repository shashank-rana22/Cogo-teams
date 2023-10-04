import { Button, ButtonIcon } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import filterControls from '../../../../configuration/filterControls';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

function FilterPopover({ setShowPopover, setGlobalFilters }) {
	const { t } = useTranslation(['saasSubscription']);

	const { control, handleSubmit, reset } = useForm();

	const submitHandler = (data) => {
		setGlobalFilters((prev) => ({
			...prev,
			page: 1,
			...data,
		}));
		setShowPopover(false);
	};

	const clearHandler = () => {
		setGlobalFilters((prev) => {
			const { plan_ids, ...rest } = prev || {};
			return rest;
		});
		reset({});
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{t('saasSubscription:filters')}
				<ButtonIcon size="sm" icon={<IcMCross />} onClick={() => setShowPopover(false)} />
			</div>

			<div className={styles.body}>
				{filterControls.map((config) => {
					const { name, type, label } = config;
					const Element = getFieldController(type);
					return (
						<div key={name} className={styles.element_container}>
							<p className={styles.label}>{label}</p>
							<Element {...config} control={control} />
						</div>
					);
				})}
			</div>

			<div className={styles.footer}>
				<Button
					size="sm"
					themeType="secondary"
					onClick={clearHandler}
				>
					{t('saasSubscription:clear')}

				</Button>

				<Button
					size="sm"
					onClick={handleSubmit(submitHandler)}
					className={styles.save_btn}
					themeType="accent"
				>
					{t('saasSubscription:apply')}
				</Button>
			</div>
		</div>
	);
}

export default FilterPopover;
