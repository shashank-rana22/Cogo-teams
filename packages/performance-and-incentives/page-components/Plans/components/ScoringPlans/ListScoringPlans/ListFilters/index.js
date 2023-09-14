import { Button, Badge } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Filters from '../../../../../../common/Filters';

import styles from './styles.module.css';
import useFilterContent from './useFilterContent';

function conditionalWrapper({ condition, wrapper, children }) {
	return condition ? wrapper(children) : children;
}

function ListFilters(props) {
	const {
		setParams,
		paginationData = {},
	} = props;

	const {
		controls,
		formProps,
		showFilters,
		setShowFilters,
		handleReset,
		applyFilters,
		filtersApplied,
	} = useFilterContent({ setParams });

	return (
		<div className={styles.container}>
			<p className={styles.heading}>
				{paginationData.total_count}
				{' '}
				Scoring Plans
			</p>

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
					type="button"
					size="md"
					themeType="secondary"
					onClick={() => setShowFilters(!showFilters)}
				>
					Filter
					{conditionalWrapper({
						condition : filtersApplied,
						wrapper   : (children) => (
							<Badge color="red" size="md" text="" style={{ marginLeft: '4px' }}>{children}</Badge>
						),
						children: <IcMFilter style={{ marginLeft: '4px' }} />,
					})}
				</Button>
			</Filters>
		</div>
	);
}

export default ListFilters;
