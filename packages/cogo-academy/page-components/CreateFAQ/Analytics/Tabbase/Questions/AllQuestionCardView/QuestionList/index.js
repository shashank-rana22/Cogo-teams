import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import useListFaqQuestions from '../../../../hooks/useListFaqQuestions';

import AllQuestions from './AllQuestions';
import styles from './styles.module.css';

function QuestionsList() {
	const props = useListFaqQuestions({});
	const { searchInput, setSearchInput } = props || {};

	return (
		<div className={styles.container}>
			<div className={styles.search}>
				<Input
					prefix={<IcMSearchlight />}
					value={searchInput}
					onChange={(val) => setSearchInput(val)}
					size="md"
					placeholder="Search a question here"
				/>
			</div>
			<div>
				<AllQuestions {...props} />
			</div>
		</div>

	);
}

export default QuestionsList;
