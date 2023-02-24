import { Accordion } from '@cogoport/components';
import { IcMAgentManagement } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import ExpertiseParameters from './ExpertiseParameters';
import Header from './Header';
import styles from './styles.module.css';

const EXPERTISE_CARDS_MAPPING = {
	customer_expertise: {
		name                   : 'customer_expertise',
		icon                   : <IcMAgentManagement />,
		high_impact_conditions : 12,
		minimum_score          : 5000,
		parameters_count       : 12,
		changes_made           : 23,
	},
	trade_expertise: {
		name                   : 'trade_expertise',
		icon                   : <IcMAgentManagement />,
		high_impact_conditions : 12,
		minimum_score          : 5000,
		parameters_count       : 12,
		changes_made           : 23,
	},
	commodity_expertise: {
		name                   : 'commodity_expertise',
		icon                   : <IcMAgentManagement />,
		high_impact_conditions : 12,
		minimum_score          : 5000,
		parameters_count       : 12,
		changes_made           : 23,
	},
	misc_expertise: {
		name                   : 'misc_expertise',
		icon                   : <IcMAgentManagement />,
		high_impact_conditions : 12,
		minimum_score          : 5000,
		parameters_count       : 12,
		changes_made           : 23,
	},
};

const columnsMapping = [
	{
		key   : 'high_impact_conditions',
		label : 'No. of high impact conditions',
		flex  : 2.5,
	},
	{
		key   : 'minimum_score',
		label : 'Minimum Score for expertise',
		flex  : 2.5,
	},
	{
		key   : 'parameters_count',
		label : 'Number of parameters',
		flex  : 2,
	},
	{
		key   : 'changes_made',
		label : 'Changes Made',
		flex  : 1,
	},

];

const titleSection = (expertiseItem) => (
	<div>
		<div className={styles.expertise_name}>

			<div className={styles.icon_container}>
				{expertiseItem.icon}
			</div>

			{startCase(expertiseItem.name)}
		</div>

		<div className={styles.expertise_stats}>
			{columnsMapping.map((colDetails) => {
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
							<ExpertiseParameters expertiseData={value} />
						</Accordion>
					))
				}
			</div>
		</>

	);
}

export default KamExpertiseScoreConfig;
