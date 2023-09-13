import { Button, Popover } from '@cogoport/components';
import { useState } from 'react';

import FilterContent from './FilterContent';

function Filter({ scope = 'ALL', filterParams = {}, setFilterParams = () => {} }) {
	const [visible, setVisible] = useState(false);
	return (
		<Popover
			visible={visible}
			placement="bottom"
			content={(
				<FilterContent
					filterParams={filterParams}
					setFilterParams={setFilterParams}
					setVisible={setVisible}
				/>
			)}
		>
			<Button
				themeType="secondary"
				onClick={() => setVisible(!visible)}

			>
				{scope}
			</Button>
		</Popover>
	);
}
export default Filter;
