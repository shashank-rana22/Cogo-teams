import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import List from '../../commons/List';
import { ListDataType } from '../../commons/List/Interfaces';
import { NewAWBFields } from '../../configurations/new_awb_fields';

interface NewAWBProps {
	data?: ListDataType,
	loading?: boolean;
	page?: number,
	setPage?: (p:number)=>void,
	setGenerate?: (p:boolean)=>void,
	setItem?: (p:object)=>void,
}

function NewAWB({
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	setGenerate = () => {},
	setItem = () => {},
}:NewAWBProps) {
	const { fields } = NewAWBFields;
	const handleGenerateMAWB = (singleItem) => {
		setGenerate(true);
		setItem(singleItem);
	};

	const functions = {
		handleGenerate: (singleItem) => (
			<Button
				style={{ border: '1px solid #333', padding: '2px 8px', fontSize: 12 }}
				themeType="secondary"
				onClick={() => { handleGenerateMAWB(singleItem); }}
			>
				Generate
				{' '}
				{startCase(singleItem.blCategory)}
			</Button>
		),
		handleStakeholder: (singleItem) => (
			singleItem?.stakeholderName
		),
	};

	return (
		<List
			fields={fields}
			data={data}
			loading={loading}
			functions={functions}
			page={page}
			setPage={setPage}
		/>
	);
}

export default NewAWB;
