import { Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Filters from '../../../../../common/Filters';

import styles from './styles.module.css';
import useFilterContent from './useFilterContent';

function ConfigFilters() {
	const { controls, showFilters, setShowFilters } = useFilterContent();

	return (
		<Filters
			controls={controls}
			open={showFilters}
			setOpen={setShowFilters}
		>
			<Button size="md" themeType="secondary" onClick={() => setShowFilters(!showFilters)}>
				FILTER
				<IcMFilter style={{ marginLeft: '4px' }} />
				<div className={styles.filter_dot} />
			</Button>
		</Filters>
	);
}

export default ConfigFilters;
