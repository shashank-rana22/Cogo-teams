import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import CreateForm from '../../../common/CreateForm';

import useFilters from './useFilters';

function Filters({ params = {}, setParams = () => {} }) {
	const [showFilters, setShowFilters] = useState(false);

	const {
		controls, formProps, onSubmit, onCancel,
	} =	useFilters({ params, setParams, setShowFilters });

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
		>
			<Button
				size="md"
				style={{ backgroundColor: '#abcd62' }}
				onClick={() => setShowFilters(!showFilters)}
			>
				<IcMFilter style={{ marginRight: '4px' }} />
				Filters
			</Button>
		</Popover>
	);
}

export default Filters;
