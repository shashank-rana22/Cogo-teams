import { Pill, Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase, format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const addedQuestionsColumns = ({ activeList }) => [
	{
		Header   : 'QUESTIONS',
		accessor : (items) => (
			<div className={styles.question}>
				{items?.question_abstract}
			</div>
		),
	},
	{
		Header   : 'TOPICS',
		accessor : (items) => (items?.topics?.length > 0 ? (
			<div className={styles.topics}>
				{items.topics.map((topic) => (
					<Pill size="sm" color="green">{startCase(topic)}</Pill>
				))}
			</div>
		) : '-'),
	},
	{
		Header   : 'TAGS',
		accessor : (items) => (items?.tags?.length > 0 ? (
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
				{activeList !== 'inactive'
					? <IcMDelete height={20} width={20} style={{ marginRight: 8 }} />
					: null}
				<Button themeType="secondary" size="sm" style={{ marginRight: 8 }}>EDIT</Button>
				{activeList !== 'inactive'
					? <Button themeType="primary" size="sm">VIEW</Button>
					: null}
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
		accessor : (items) => {
			const formatDate = format(items?.created_at, 'dd MMM yyyy');
			return (
				<div>
					{formatDate}
				</div>
			);
		},
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

const useQuestionList = () => {
	const [searchInput, setSearchInput] = useState('');
	const [activeList, setActiveList] = useState('published');
	const [filters, setFilters] = useState({});
	const [page, setPage] = useState(1);

	const [{ data: questionList, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_questions',
	}, { manual: true });

	const getQuestionsList = async () => {
		try {
			await trigger({
				params: {
					filters: {
						...filters,
						q: searchInput,
					},
					page,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getQuestionsList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, filters, searchInput]);

	const columns = activeList !== 'requested'
		? addedQuestionsColumns({ activeList })
		: requestedQuestionsColumns;
	const { list: data = [], ...paginationData } = questionList || {};

	return {
		page,
		setPage,
		paginationData,
		data,
		columns,
		setFilters,
		searchInput,
		setSearchInput,
		activeList,
		setActiveList,
		questionListLoading: loading,
	};
};

export default useQuestionList;
