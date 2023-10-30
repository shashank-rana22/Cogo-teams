import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { useState } from 'react';

const Filter = dynamic(() => import('./Filter'), { ssr: false });

function Filters({ filters = {}, setFilters = () => {}, activeTab = 'create' }) {
	const [show, setShow] = useState(false);

	return (
		<div>
			<Popover
				placement="bottom"
				visible={show}
				onClickOutside={() => setShow(false)}
				render={show ? (
					<Filter
						filters={filters}
						setFilters={setFilters}
						setShow={setShow}
						activeTab={activeTab}
					/>

				) : null}
			>
				<Button themeType="secondary" onClick={() => setShow(!show)}>
					<IcMFilter />
					{' '}
					FILTERS
				</Button>
			</Popover>
		</div>

	);
}

export default Filters;
