import { Badge, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Filters from '../../../../../../common/Filters';

import useFilterContent from './useFilterContent';

const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

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
	);
}

export default ConfigFilters;
