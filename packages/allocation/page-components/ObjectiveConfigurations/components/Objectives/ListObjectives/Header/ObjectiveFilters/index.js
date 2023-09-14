import { Button, Badge } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import Filters from '../../../../../../../common/Filters';
import SearchInput from '../../../../../../../common/SearchInput';

import styles from './styles.module.css';
import useFilterContent from './useFilterContent';

function conditionalWrapper({ condition, wrapper, children }) {
	return condition ? wrapper(children) : children;
}

function ObjectiveFilters(props) {
	const { t } = useTranslation(['allocation']);

	const {
		setParams,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = props;

	const {
		controls,
		formProps,
		showFilters,
		setShowFilters,
		handleReset,
		applyFilters,
		filtersApplied,
	} = useFilterContent({ setParams, t });

	return (
		<div className={styles.filter_container}>
			<div className={styles.search_container}>
				<SearchInput
					size="sm"
					placeholder={t('allocation:search_by_objective_name')}
					debounceQuery={debounceQuery}
					value={searchValue}
					setGlobalSearch={setSearchValue}
				/>
			</div>

			<Filters
				controls={controls}
				open={showFilters}
				setOpen={setShowFilters}
				formProps={formProps}
				onClickOutside={() => setShowFilters(false)}
				applyFilters={applyFilters}
				reset={handleReset}
			>
				<Button
					themeType="secondary"
					type="button"
					onClick={() => setShowFilters(!showFilters)}
				>
					{t('allocation:filter_label')}
					{conditionalWrapper({
						condition : filtersApplied,
						wrapper   : (children) => (
							<Badge color="red" size="md" text="">
								{children}
							</Badge>
						),
						children: <IcMFilter style={{ marginLeft: '4px' }} />,
					})}
				</Button>
			</Filters>
		</div>
	);
}

export default ObjectiveFilters;
