import { IcMAccountEnrichment, IcMAccounts, IcMEngagement, IcMShipment } from '@cogoport/icons-react';

import ACTIVITY_CONSTANTS from '../../../../../constants/activity-constants';

import styles from './styles.module.css';

const { ENGAGEMENT, ACCOUNTS, ENRICHMENT, SHIPMENTS } = ACTIVITY_CONSTANTS;

const COMPONENT_MAPPING = {
	[ENGAGEMENT]: {
		Icon       : IcMEngagement,
		heading    : 'Engagement',
		parameters : [
			{
				label : 'calls received',
				value : 55,
			},
			{
				label : 'chats attended',
				value : 122,
			},
			{
				label : 'emails sent',
				value : 70,
			},
			{
				label : 'missed calls',
				value : 0,
			},
			{
				label : 'calls made',
				value : 90,
			},
			{
				label : 'chats missed',
				value : 100,
			},
		],
	},
	[ACCOUNTS]: {
		Icon       : IcMAccounts,
		heading    : 'Accounts',
		parameters : [
			{
				label : 'new activations',
				value : 21,
			},
			{
				label : 'reactivations',
				value : 23,
			},
			{
				label : 'KYC verifications',
				value : 0,
			},
			{
				label : 'true activations',
				value : 430,
			},
			{
				label : 'retentions',
				value : 1,
			},
		],
	},
	[ENRICHMENT]: {
		Icon       : IcMAccountEnrichment,
		heading    : 'Enrichment',
		parameters : [
			{
				label : 'contacts enriched',
				value : 32,
			},
			{
				label : 'feedbacks submitted',
				value : 0,
			},
		],
	},
	[SHIPMENTS]: {
		Icon       : IcMShipment,
		heading    : 'Shipments',
		parameters : [
			{
				label : 'new SIDs',
				value : 21,
			},
			{
				label : 'SIDs cancelled',
				value : 0,
			},
			{
				label : 'quotations sent',
				value : 12,
			},
			{
				label : 'new services unlocked',
				value : 43,
			},
		],
	},
};

function Block(props) {
	const { block } = props;

	const { Icon, heading, parameters } = COMPONENT_MAPPING[block] || {};

	return (
		<div className={styles.container}>
			<div className={styles.block_container}>
				<Icon height={20} width={20} style={{ marginRight: '8px' }} />
				<p className={styles.block_text}>{heading}</p>
			</div>

			<div className={styles.activity_container}>
				{parameters.map(({ label, value }) => (
					<div className={styles.param_container} key={label}>
						<div className={styles.value_text_container}>
							<p className={styles.value_text}>{value}</p>
						</div>

						<p className={styles.label_text}>{label}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Block;
