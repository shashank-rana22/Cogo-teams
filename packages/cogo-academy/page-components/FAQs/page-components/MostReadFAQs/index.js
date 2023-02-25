import React, { useState } from 'react';

import SearchInput from '../SearchInput';

import MostReadFaqResults from './MostReadResults';

function MostReadFAQs() {
	const [searchState, setSearchState] = useState('');

	return (
		<div>
			<br />
			<SearchInput
				value={searchState}
				onChange={(val) => setSearchState(val)}
				size="md"
				placeholder="Search for a keyword or a question"
			/>

			<MostReadFaqResults searchState={searchState} />

		</div>
	);
}

export default MostReadFAQs;
