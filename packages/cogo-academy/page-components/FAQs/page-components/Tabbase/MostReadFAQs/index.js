import { Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import MostReadFaqResults from './MostReadResults';

function MostReadFAQs() {
	const [searchState, setSearchState] = useState('');
	const [inputState, setInputState] = useState('');
	useEffect(() => {
		if (!inputState) {
			setSearchState('');
		}
	}, [inputState]);

	return (
		<div>
			<br />

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

			<MostReadFaqResults searchState={searchState} />
		</div>
	);
}

export default MostReadFAQs;
