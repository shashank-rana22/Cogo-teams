import { Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import SearchInput from '../../../../../commons/SearchInput';

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
			<div style={{ display: 'flex' }}>
				<SearchInput
					value={inputState}
					onChange={(val) => setInputState(val)}
					size="md"
					placeholder="Search for a keyword or a question"
				/>
				<Button
					type="submit"
					size="lg"
					themeType="primary"
					style={{ marginLeft: '10px' }}
					onClick={() => { setSearchState(inputState); }}
				>
					<IcMSearchlight />
				</Button>
			</div>

			<PopularTags
				tabTitle={tabTitle}
				searchState={searchState}
			/>
		</div>
	);
}

export default Dashboard;
