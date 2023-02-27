import { Accordion } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import EXPERTISE_CARDS_COLUMNS_MAPPING from '../../../../constants/expertise-cards-columns-mapping';
import EXPERTISE_CARDS_MAPPING from '../../../../constants/expertise-cards-mapping';

import ExpertiseParameters from './ExpertiseParameters';
import Header from './Header';
import styles from './styles.module.css';

const titleSection = (expertiseItem) => (
	<div>
		<div className={styles.expertise_name}>

			<div className={styles.icon_container}>
				{expertiseItem.icon}
			</div>

			{startCase(expertiseItem.name)}
		</div>

		<div className={styles.expertise_stats}>
			{EXPERTISE_CARDS_COLUMNS_MAPPING.map((colDetails) => {
				const { key, label, flex } = colDetails;
				return (
					<div key={key} style={{ flex }}>
						{label ? <div className={styles.label}>{label}</div> : null}

						<div className={styles.value}>{expertiseItem[key]}</div>
					</div>

				);
			})}
		</div>

	</div>
);

function KamExpertiseScoreConfig() {
	return (
		<>
			<div className={styles.container}>
				<Header />
			</div>
			<div className={styles.expertise_cards_container}>
				{
					Object.entries(EXPERTISE_CARDS_MAPPING).map(([key, value]) => (
						<Accordion id={key} title={titleSection(value)}>
							{/* like re-activation */}
							<ExpertiseParameters expertiseData={value} />
						</Accordion>
					))
				}
			</div>
		</>

	);
}

export default KamExpertiseScoreConfig;
