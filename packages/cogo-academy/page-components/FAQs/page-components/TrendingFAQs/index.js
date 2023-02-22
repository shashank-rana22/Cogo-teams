import React from 'react';

import PopularTags from '../PopularTags';
import Questions from '../Questions';
import SearchInput from '../SearchInput';

import styles from './styles.module.css';

function TrendingFAQs() {
	return (
		<div>
			<br />
			<SearchInput
				value=""
				onChange=""
				size="md"
				placeholder="Search for a keyword or a question"
			/>
			<PopularTags />
			<br />
			<h1 className={styles.title}>
				Trending FAQs
			</h1>
			<div className={styles.border}><Questions /></div>
			<div className={styles.border}><Questions /></div>

		</div>
	);
}

export default TrendingFAQs;
