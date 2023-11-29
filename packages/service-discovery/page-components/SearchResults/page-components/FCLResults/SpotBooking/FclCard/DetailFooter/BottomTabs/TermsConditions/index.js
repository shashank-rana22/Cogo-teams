import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function TermsConditions({ detail = {} }) {
	const { terms_and_conditions: searchTerms = [] } = detail;

	if (isEmpty(searchTerms)) {
		return (
			<div className={styles.container}>
				<b>Nothing to show here!</b>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Please note:</div>

			<ul className={styles.list}>
				{(searchTerms || []).map((term) => (
					<li className={styles.item} key={term.message || term}>
						{term.message || term}
					</li>
				))}
			</ul>
		</div>
	);
}

export default TermsConditions;
