import { Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Filters from '../../../../../common/Filters';

import styles from './styles.module.css';
import useFilterContent from './useFilterContent';

function ConfigFilters({
	params,
	setParams,
	disabled,
}) {
	const {
		controls, formProps, showFilters, setShowFilters, handleReset, applyFilters, filtersApplied,
	} = useFilterContent({ params, setParams });

	return (
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
				size="md"
				themeType="secondary"
				onClick={() => setShowFilters(!showFilters)}
				disabled={disabled}
			>
				FILTER

				<IcMFilter style={{ marginLeft: '4px' }} />

				{filtersApplied ? <div className={styles.filter_dot} /> : null}
			</Button>
		</Filters>
	);
}

export default ConfigFilters;
