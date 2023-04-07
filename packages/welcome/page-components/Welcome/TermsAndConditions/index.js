import React from 'react';

import styles from './styles.module.css';
import data from './termsAndConditionsData';

function TermsAndConditions() {
	return (
		<div className={styles.container}>

			<div className={styles.heading}>Terms of Use and Privacy Policy </div>

			<div className={styles.content_container}>

				{data.map((item, index) => {
					const { title = '', description = '' } = item;

					return (
						<div className={styles.text_item} key={item.title}>
							<div className={styles.title}>
								<u>
									{index + 1}
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
