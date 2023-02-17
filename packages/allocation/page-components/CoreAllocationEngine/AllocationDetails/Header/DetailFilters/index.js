import { Badge, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Filters from '../../../../../common/Filters';

import useDetailsFilterContent from './useDetailsFilterContent';

const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

function DetailFilters({ params, setParams }) {
	const {
		controls,
		formProps,
		showFilters,
		setShowFilters,
		handleReset,
		applyFilters,
		filtersApplied,
	} = useDetailsFilterContent({ params, setParams });

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
			>
				FILTER

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
	);
}

export default DetailFilters;
