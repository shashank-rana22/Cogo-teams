import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import styles from './styles.module.css';

function TermsConditions({ rateCardData = {}, detail = {} }) {
	const { terms_and_conditions: rateTerms = [] } = rateCardData;
	const { terms_and_conditions: searchTerms = [] } = detail;

	const terms = useMemo(() => {
		if (!isEmpty(rateTerms)) return rateTerms;
		return searchTerms;
	}, [rateTerms, searchTerms]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Please note:</div>

			<ul className={styles.list}>
				{terms.map((term) => (
					<li className={styles.item} key={term.message || term}>
						{term.message || term}
					</li>
				))}
			</ul>
		</div>
	);
}

export default TermsConditions;
