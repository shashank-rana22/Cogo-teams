import { Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Filters from '../../../../../common/Filters';

function DetailFilters() {
	return (
		<Filters>
			<Button
				size="md"
				themeType="secondary"
			>
				FILTER
				<IcMFilter style={{ marginLeft: '4px' }} />
			</Button>
		</Filters>
	);
}

export default DetailFilters;
