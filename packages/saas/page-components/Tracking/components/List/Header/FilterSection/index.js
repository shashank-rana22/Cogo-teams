import { cl, Popover, Button, Select, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import getStatsMapping from '../../../../constant/statsMapping';

import FilterContent from './FilterContent';
import styles from './styles.module.css';

function FilterSection({
	globalFilter, filter, setFilter, filterData = {}, setGlobalFilter, selectValueChangeHandler,
}) {
	const { activeTab = '' } = globalFilter;
	const { inputValue, selectValue } = filter;

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const STATS_MAPPING = getStatsMapping({ t });

	return (
		<div className={cl`${styles.flex_box} ${styles.filter_section}`}>
			<Input
				size="sm"
				className={styles.search_field}
				value={inputValue}
				onChange={(e) => setFilter((prev) => ({ ...prev, inputValue: e }))}
				placeholder={t('airOceanTracking:tracking_filer_section_placeholder_1')}
				suffix={<IcMSearchlight />}
			/>

			<Select
				size="sm"
				className={styles.select_field}
				placeholder={t('airOceanTracking:tracking_filer_section_placeholder_2')}
				options={STATS_MAPPING}
				value={selectValue}
				onChange={selectValueChangeHandler}
				isClearable
			/>

			<Popover
				caret={false}
				placement="bottom-end"
				content={(
					<FilterContent
						filterData={filterData}
						activeTab={activeTab}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>

				)}
			>
				<Button themeType="accent" type="button">
					{t('airOceanTracking:tracking_filters_popover_button_label')}
				</Button>
			</Popover>
		</div>
	);
}

export default FilterSection;
