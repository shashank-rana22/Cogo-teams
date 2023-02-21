import { Pill, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import StyledTable from '../../../../commons/StyledTable';

import Header from './Header';
import styles from './styles.module.css';

const columns = [
	{
		Header   : 'QUESTIONS',
		accessor : (items) => (
			<div className={styles.question}>
				{items?.question}
			</div>
		),
	},
	{
		Header   : 'TOPICS',
		accessor : (items) => (items?.topics.length > 0 ? (
			<div className={styles.topics}>
				{items.topics.map((topic) => (
					<Pill size="sm" color="green">{startCase(topic)}</Pill>
				))}
			</div>
		) : '-'),
	},
	{
		Header   : 'TAGS',
		accessor : (items) => (items?.tags.length > 0 ? (
			<div className={styles.tags}>
				{items.tags.map((tag) => (
					<Pill size="sm" color="green">{startCase(tag)}</Pill>
				))}
			</div>
		) : '-'),
	},
	{
		Header   : 'ACTIONS',
		accessor : () => (
			<div className={styles.buttonContainer}>
				<Button themeType="secondary" size="sm" style={{ marginRight: 8 }}>EDIT</Button>
				<Button themeType="primary" size="sm">VIEW</Button>
			</div>
		),
	},
];

const data = [
	{
		question : 'How long will it take to receive B/L after payment?',
		topics   : ['discover_rates', 'shipment', 'checkout'],
		tags     : ['spot_search', 'trade_party'],
	},
	{
		question : 'What are the payment terms?',
		topics   : ['discover_rates', 'shipment', 'checkout'],
		tags     : ['spot_search', 'trade_party'],
	},
	{
		question : 'How long will it take to receive B/L after payment?',
		topics   : ['discover_rates', 'shipment', 'checkout'],
		tags     : ['spot_search', 'trade_party'],
	},
	{
		question : 'When will I receive Booking Note?',
		topics   : ['discover_rates', 'shipment', 'checkout'],
		tags     : ['spot_search', 'trade_party'],
	},
	{
		question : 'How long will it take to receive B/L after payment?',
		topics   : ['discover_rates', 'shipment', 'checkout', 'discover_rates',
			'shipment', 'checkout', 'discover_rates', 'shipment', 'checkout'],
		tags: ['spot_search', 'trade_party', 'trade_party', 'spot_search', 'trade_party'],
	},
	{
		question : 'What is the process of shipment booking?',
		topics   : ['discover_rates', 'shipment', 'checkout'],
		tags     : ['spot_search', 'trade_party'],
	},
	{
		question : 'What are Incoterms?',
		topics   : ['discover_rates', 'shipment', 'checkout'],
		tags     : ['spot_search', 'trade_party'],
	},
	{
		question : 'How long will it take to receive B/L after payment?',
		topics   : ['discover_rates', 'shipment', 'checkout'],
		tags     : ['spot_search', 'trade_party'],
	},
	{
		question : 'How long will it take to receive B/L after payment?',
		topics   : ['discover_rates', 'shipment', 'checkout'],
		tags     : ['spot_search', 'trade_party'],
	},
	{
		question : 'When will I receive Booking Note?',
		topics   : ['discover_rates', 'shipment', 'checkout'],
		tags     : ['spot_search', 'trade_party'],
	},
];

function AddedQuestions({ searchInput, setSearchInput }) {
	return (
		<div className={styles.container}>
			<Header searchInput={searchInput} setSearchInput={setSearchInput} />

			<div className={styles.table}>
				<StyledTable columns={columns} data={data} />
			</div>
		</div>
	);
}

export default AddedQuestions;
