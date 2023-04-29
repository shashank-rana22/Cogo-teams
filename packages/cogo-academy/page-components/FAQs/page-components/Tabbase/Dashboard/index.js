import { Button, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import PopularTags from './PopularTags';

function Dashboard({ tabTitle = '' }) {
	const [searchState, setSearchState] = useState('');
	const [inputState, setInputState] = useState('');
	useEffect(() => {
		if (!inputState) {
			setSearchState('');
		}
	}, [inputState]);

	return (
		<div style={{ marginTop: 12 }}>
			<form
				style={{ display: 'flex' }}
				onSubmit={(e) => {
					e.preventDefault();
					setSearchState(inputState);
				}}
			>
				<Input
					value={inputState}
					onChange={(e) => {
						setInputState(e);
						if (!e) setSearchState('');
					}}
					size="md"
					placeholder="Search for a keyword or a question"
				/>
				<Button
					type="submit"
					size="lg"
					themeType="primary"
					style={{ marginLeft: '10px' }}
				>
					<IcMSearchlight />
				</Button>
			</form>

			<PopularTags
				tabTitle={tabTitle}
				searchState={searchState}
			/>
		</div>
	);
}

export default Dashboard;
