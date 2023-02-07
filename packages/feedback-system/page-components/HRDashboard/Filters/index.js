import { Button, Popover } from '@cogoport/components';
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
				className="primary md"
				onClick={() => setShowFilters(!showFilters)}
			>
				Filters
			</Button>
		</Popover>
	);
}

export default Filters;
