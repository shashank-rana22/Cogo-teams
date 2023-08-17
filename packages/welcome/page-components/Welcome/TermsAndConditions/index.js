import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';
import getTermsAndConditionsData from './termsAndConditionsData';

const ADDITION_NUMBER = 1;

function TermsAndConditions() {
	const { t } = useTranslation(['welcome']);

	const data = getTermsAndConditionsData(t);

	return (
		<div className={styles.container}>

			<div className={styles.heading}>{t('welcome:terms_and_conditions')}</div>

			<div className={styles.content_container}>

				{data.map((item, index) => {
					const { title = '', description = '' } = item;

					return (
						<div className={styles.text_item} key={item.title}>
							<div className={styles.title}>
								<u>
									{index + ADDITION_NUMBER}
									{' - '}
									{title}
								</u>
							</div>
							<div className={styles.description}>{description}</div>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default TermsAndConditions;
