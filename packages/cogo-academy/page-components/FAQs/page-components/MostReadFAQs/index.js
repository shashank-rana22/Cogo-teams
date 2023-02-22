import React from 'react';

import PopularTags from '../PopularTags';
import Questions from '../Questions';
import SearchInput from '../SearchInput';

import styles from './styles.module.css';

function MostReadFAQs() {
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
				Most Read FAQs
			</h1>
			<div style={{ margin: '5px 0', width: '100%', height: '467px' }} className={styles.scrollable}>
				<div className={styles.border}><Questions /></div>
				<div className={styles.border}>
					<Questions />
				</div>
				<div className={styles.border}><Questions /></div>
				<div className={styles.border}>
					<Questions />
				</div>
				<div className={styles.border}><Questions /></div>
				<div className={styles.border}>
					<Questions />
				</div>

			</div>

		</div>
	);
}

export default MostReadFAQs;
