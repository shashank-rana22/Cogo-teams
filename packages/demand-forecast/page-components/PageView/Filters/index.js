import { Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getControls from '../../../configurations/filter-controls';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function Content({ setFilters = () => {}, setVisible, visible }) {
	const { t } = useTranslation(['demandForecast']);
	const formProps = useForm();
	const { control, handleSubmit } = formProps;
	const controls = getControls({ t });

	const applyFilters = (value) => {
		// eslint-disable-next-line custom-eslint/variables-name-check
		const filterKeys = {};

		Object.keys(value).forEach((key) => {
			if (value[key]) {
				filterKeys[key] = value[key];
			}
		});

		setFilters(filterKeys);
		setVisible(!visible);
	};

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const el = { ...controlItem };
				const Element = getFieldController(el.type);

				if (!Element) return null;

				return (
					<div
						className={styles.controls}
						key={controlItem.name}
					>
						{el.label && <div className={styles.label}>{el.label}</div>}
						<Element
							{...el}
							size="sm"
							key={el.name}
							control={control}
						/>
					</div>
				);
			})}
			<div className={styles.apply}>
				<Button size="md" themeType="accent" onClick={handleSubmit(applyFilters)}>Apply Filter</Button>
			</div>
		</div>
	);
}

function Filters({ filters = {}, setFilters = () => {} }) {
	const { t } = useTranslation(['demandForecast']);
	const [visible, setVisible] = useState(false);

	const onClickFilterButton = () => {
		setVisible(!visible);
	};

	return (
		<Popover
			theme="light"
			interactive
			placement="bottom"
			render="bottom"
			visible={visible}
			onClickOutside={onClickFilterButton}
			content={<Content filters={filters} setFilters={setFilters} visible={visible} setVisible={setVisible} />}
		>
			<div
				role="presentation"
				className={styles.filters}
				onClick={onClickFilterButton}
			>
				<IcMFilter />
				<div className={styles.filter_title}>{t('demandForecast:filters')}</div>
			</div>
		</Popover>
	);
}

export default Filters;
