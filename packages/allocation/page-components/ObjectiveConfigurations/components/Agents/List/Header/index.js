import { Button, Badge } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Filters from '../../../../../../common/Filters';
import SearchInput from '../../../../../../common/SearchInput';

import styles from './styles.module.css';
import useFilterContent from './useFilterContent';

const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

function Header(props) {
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
	} = useFilterContent({ setParams });

	return (
		<div className={styles.container}>
			<div className={styles.search_container}>
				<SearchInput
					size="sm"
					placeholder="Search by Agent Name"
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
					type="button"
					themeType="secondary"
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
						<IcMFilter style={{ marginLeft: '4px' }} />
					</ConditionalWrapper>
				</Button>
			</Filters>
		</div>
	);
}

export default Header;
