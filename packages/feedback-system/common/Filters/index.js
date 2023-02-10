import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import CreateForm from '../CreateForm';

import useFilters from './useFilters';

function Filters({ controls = [], params = {}, setParams = () => {} }) {
	const [showFilters, setShowFilters] = useState(false);

	const { formProps, onSubmit, onCancel } =	useFilters({ params, setParams, setShowFilters });

	const content = () => (
		<CreateForm
			type="filter"
			formProps={formProps}
			controls={controls}
			onSubmit={onSubmit}
			onCancel={onCancel}
		/>
	);

	return (
		<Popover
			visible={showFilters}
			theme="light"
			placement="bottom-start"
			render={content()}
			animation="shift-away"
			interactive
			caret={false}
			onClickOutside={() => { setShowFilters(false); }}
		>
			<Button
				size="lg"
				themeType="secondary"
				onClick={() => setShowFilters(!showFilters)}
			>
				<IcMFilter style={{ marginRight: '4px' }} />
				Filters
			</Button>
		</Popover>
	);
}

export default Filters;
