import { Pill, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

const addedQuestionsColumns = [
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

const requestedQuestionsColumns = [
	{
		Header   : 'QUESTIONS',
		accessor : (items) => (
			<div className={styles.question}>
				{items?.question}
			</div>
		),
	},
	{
		Header   : 'CREATED BY',
		accessor : (items) => (
			<div>
				{items?.created_by || '-'}
			</div>
		),
	},
	{
		Header   : 'CREATED AT',
		accessor : (items) => (
			<div>
				{items?.created_at || Date()}
			</div>
		),
	},
	{
		Header   : 'ACTIONS',
		accessor : () => (
			<div className={styles.buttonContainer}>
				<Button themeType="primary" size="sm" style={{ marginRight: 8 }}>ADD ANSWER</Button>
			</div>
		),
	},
];

const data = [
	{
		question   : 'How long will it take to receive B/L after payment?',
		topics     : ['discover_rates', 'shipment', 'checkout'],
		tags       : ['spot_search', 'trade_party'],
		created_by : 'Ashul Soni',
	},
	{
		question   : 'What are the payment terms?',
		topics     : ['discover_rates', 'shipment', 'checkout'],
		tags       : ['spot_search', 'trade_party'],
		created_by : 'Hrishikesh Kulkarni',
	},
	{
		question   : 'How long will it take to receive B/L after payment?',
		topics     : ['discover_rates', 'shipment', 'checkout'],
		tags       : ['spot_search', 'trade_party'],
		created_by : 'Ashul Soni',
	},
	{
		question   : 'When will I receive Booking Note?',
		topics     : ['discover_rates', 'shipment', 'checkout'],
		tags       : ['spot_search', 'trade_party'],
		created_by : 'Shivam Singh',
	},
	{
		question : 'How long will it take to receive B/L after payment?',
		topics   : ['discover_rates', 'shipment', 'checkout', 'discover_rates',
			'shipment', 'checkout', 'discover_rates', 'shipment', 'checkout'],
		tags       : ['spot_search', 'trade_party', 'trade_party', 'spot_search', 'trade_party'],
		created_by : 'Shivam Singh',
	},
	{
		question   : 'What is the process of shipment booking?',
		topics     : ['discover_rates', 'shipment', 'checkout'],
		tags       : ['spot_search', 'trade_party'],
		created_by : 'Bhaskar Priyadarshi',
	},
	{
		question   : 'What are Incoterms?',
		topics     : ['discover_rates', 'shipment', 'checkout'],
		tags       : ['spot_search', 'trade_party'],
		created_by : 'Rishi Agarwal',
	},
	{
		question   : 'How long will it take to receive B/L after payment?',
		topics     : ['discover_rates', 'shipment', 'checkout'],
		tags       : ['spot_search', 'trade_party'],
		created_by : 'Rishi Agarwal',
	},
	{
		question   : 'How long will it take to receive B/L after payment?',
		topics     : ['discover_rates', 'shipment', 'checkout'],
		tags       : ['spot_search', 'trade_party'],
		created_by : 'Bhaskar Priyadarshi',
	},
	{
		question   : 'When will I receive Booking Note?',
		topics     : ['discover_rates', 'shipment', 'checkout'],
		tags       : ['spot_search', 'trade_party'],
		created_by : 'Hrishikesh Kulkarni',
	},
];

const useQuestionList = () => {
	const [searchInput, setSearchInput] = useState('');
	const [activeList, setActiveList] = useState('published');

	const columns = activeList !== 'requested' ? addedQuestionsColumns : requestedQuestionsColumns;

	return {
		data,
		columns,
		searchInput,
		setSearchInput,
		activeList,
		setActiveList,
	};
};

export default useQuestionList;
