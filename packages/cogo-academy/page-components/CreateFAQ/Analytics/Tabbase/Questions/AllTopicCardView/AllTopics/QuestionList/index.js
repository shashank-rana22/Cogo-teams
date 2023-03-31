import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListFaqQuestions from '../../../../../hooks/useListFaqQuestions';

import AllQuestions from './AllQuestions';
import styles from './styles.module.css';

function QuestionsList({ id }) {
	const [sortType, setSortType] = useState('desc');

	const props = useListFaqQuestions({ topicId: id, sortType });

	const { searchInput, setSearchInput } = props;

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

			<AllQuestions
				sortType={sortType}
				setSortType={setSortType}
				{...props}
			/>
		</div>
	);
}

export default QuestionsList;
