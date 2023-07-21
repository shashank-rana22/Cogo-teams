import { Button, Input, Badge } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Filters from '../../../../../../../common/Filters';

import styles from './styles.module.css';
import useFilterContent from './useFilterContent';

const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

function ObjectiveFilters(props) {
	const { setParams, toggleValue } = props;

	const {
		controls,
		formProps,
		showFilters,
		setShowFilters,
		handleReset,
		applyFilters,
		filtersApplied,
	} = useFilterContent({ setParams, toggleValue });

	return (
		<div className={styles.filter_container}>
			<div className={styles.search_container}>
				<Input size="sm" placeholder="Search by Objective Name" />
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
					Filter
					<ConditionalWrapper
						condition={filtersApplied}
						wrapper={(children) => (
							<Badge color="red" size="md" text="">
								{children}
							</Badge>
						)}
					>
						<div>
							<IcMFilter style={{ marginLeft: '4px' }} />
						</div>
					</ConditionalWrapper>
				</Button>
			</Filters>
		</div>
	);
}

export default ObjectiveFilters;
