import { Badge, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Filters from '../../../../../common/Filters';

import useDetailsFilterContent from './useDetailsFilterContent';

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
				{filtersApplied ? (
					// TODO ==> Use Conditional Wrapper
					<Badge color="red" size="md" text="">
						<IcMFilter style={{ marginLeft: '4px' }} />
					</Badge>
				) : <IcMFilter style={{ marginLeft: '4px' }} />}

			</Button>
		</Filters>
	);
}

export default DetailFilters;
