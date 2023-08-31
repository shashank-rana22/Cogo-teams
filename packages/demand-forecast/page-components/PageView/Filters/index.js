import { Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getControls from '../../../configurations/filter-controls';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

const DEFAULT_PAGE = 1;

function Content({ setFilters = () => {}, setVisible = () => {},	setPage = () => {} }) {
	const { t } = useTranslation(['demandForecast']);
	const formProps = useForm();
	const { control, handleSubmit, reset } = formProps;
	const controls = getControls({ t });

	const applyFilters = (value) => {
		const FILTER_KEYS = {};

		Object.keys(value).forEach((key) => {
			if (value[key]) {
				FILTER_KEYS[key] = value[key];
			}
		});

		setFilters(FILTER_KEYS);
		setPage(DEFAULT_PAGE);
		setVisible((prev) => !prev);
	};

	const removeFilters = () => {
		setFilters({});
		reset();
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
				<Button
					size="md"
					themeType="secondary"
					onClick={removeFilters}
					className={styles.remove_filter}
				>
					Remove Filters

				</Button>
				<Button size="md" themeType="accent" onClick={handleSubmit(applyFilters)}>Apply Filter</Button>
			</div>
		</div>
	);
}

function Filters({ filters = {}, setFilters = () => {},		setPage = () => {} }) {
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
			content={(
				<Content
					filters={filters}
					setFilters={setFilters}
					visible={visible}
					setPage={setPage}
					setVisible={setVisible}
				/>
			)}
		>
			<div
				role="presentation"
				className={styles.filters}
				onClick={onClickFilterButton}
			>
				<IcMFilter />
				<div className={styles.filter_title}>{t('demandForecast:filters')}</div>
				{!isEmpty(filters) && <div className={styles.filter_applied} />}
			</div>
		</Popover>
	);
}

export default Filters;
