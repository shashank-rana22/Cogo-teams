import { Pill, Button, Popover } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { startCase, format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import PopOverContent from '../../../commons/PopoverContent';

import styles from './styles.module.css';

const FILTER_MAPPING = {

	published : { state: 'published', status: 'active' },
	draft     : { state: 'draft', status: 'active' },
	inactive  : { status: 'inactive' },
	requested : { state: 'requested', status: 'active' },
};

const addedQuestionsColumns = ({
	activeList,
	onClickEditButton,
	deactivateQuestion,
	onClickViewButton = () => {},

	deleteitem,
	setDeleteitem = () => {},
}) => [
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
		accessor : (items) => (items?.faq_topics?.length > 0 ? (
			<div className={styles.topics}>
				{items.faq_topics.map((topic) => {
					const { display_name } = topic || {};
					return <Pill size="sm" color="green">{startCase(display_name)}</Pill>;
				})}
			</div>
		) : '-'),
	},
	{
		Header   : 'TAGS',
		accessor : (items) => (items?.faq_tags?.length > 0 ? (
			<div className={styles.tags}>
				{items.faq_tags.map((tag) => {
					const { display_name } = tag || {};
					return <Pill size="sm" color="green">{startCase(display_name)}</Pill>;
				})}
			</div>
		) : '-'),
	},
	{
		Header   : 'LAST UPDATED AT',
		accessor : (items) => {
			const formatDate = format(items?.updated_at || items?.created_at, 'dd MMM yyyy hh:mm a');
			return (
				<div>
					{formatDate}
				</div>
			);
		},
	},
	{
		Header   : 'ACTIONS',
		accessor : (items) => (
			<div className={styles.button_container}>
				{!['inactive', 'draft'].includes(activeList)
					? (
						<Button
							type="button"
							themeType="primary"
							size="sm"
							style={{ marginRight: 8 }}
							onClick={() => onClickViewButton(items?.id)}
						>
							VIEW
						</Button>
					)
					: null}
				<Button
					type="button"
					themeType="secondary"
					size="sm"
					style={{ marginRight: 8 }}
					onClick={() => onClickEditButton(items?.id)}
				>
					EDIT
				</Button>
				{activeList !== 'inactive' ? (
					<Popover
						content={(
							<PopOverContent
								source="question"
								onCLickYesButton={() => deactivateQuestion(deleteitem.id)}
							/>
						)}
					>
						<IcMDelete
							height={20}
							width={20}
							style={{ cursor: 'pointer' }}
							onClick={() => { setDeleteitem(items); }}
						/>
					</Popover>

				) : null}

			</div>
		),
	},
];

const requestedQuestionsColumns = ({
	deactivateQuestion, onClickEditButton,
}) => [
	{
		Header   : 'QUESTIONS',
		accessor : (items) => (
			<div className={styles.question}>
				{items?.question_abstract}
			</div>
		),
	},
	{
		Header   : 'CREATED BY',
		accessor : (items) => (
			<div>
				{items?.author?.name || '-'}
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
		accessor : (items) => (
			<div className={styles.button_container}>
				<Button
					type="button"
					themeType="primary"
					size="sm"
					style={{ marginRight: 8 }}
					onClick={() => onClickEditButton(items.id)}
				>
					ADD ANSWER
				</Button>
				<Popover
					content={(
						<PopOverContent
							source="question"
							onCLickYesButton={() => deactivateQuestion(items.id)}
						/>
					)}
				>
					<IcMDelete
						height={20}
						width={20}
						style={{ cursor: 'pointer' }}

					/>
				</Popover>

			</div>
		),
	},
];

const useQuestionList = () => {
	const router = useRouter();

	const [sortType, setSortType] = useState(true);
	const [searchInput, setSearchInput] = useState('');
	const [activeList, setActiveList] = useState('published');
	const [deleteitem, setDeleteitem] = useState('');
	const [filters, setFilters] = useState({});
	const [page, setPage] = useState(1);

	const { query, debounceQuery } = useDebounceQuery();

	const SORT_TYPE = (sortType) ? 'desc' : 'asc';
	const SORT_MODE = (activeList === 'requested') ? 'created_at' : 'updated_at';
	const [{ data: questionList, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_questions',
	}, { manual: true });

	const [{ error }, updateTrigger] = useRequest({
		url    : '/update_question_answer_set',
		method : 'post',
	}, { manual: true });

	useEffect(() => {
		debounceQuery(searchInput);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchInput]);

	const getQuestionsList = async () => {
		try {
			await trigger({
				params: {
					filters: {
						...filters,
						...FILTER_MAPPING[activeList],
						q: query || undefined,
					},
					page,
					is_admin_view            : true,
					sort_by                  : SORT_MODE,
					sort_type                : SORT_TYPE,
					faq_tags_data_required   : true,
					faq_topics_data_required : true,
					author_data_required     : true,

				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getQuestionsList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, filters, query, activeList, SORT_TYPE]);

	const deactivateQuestion = async (id) => {
		try {
			await updateTrigger(
				{
					data: {
						id,
						status: 'inactive',
					},

				},
			);
			// eslint-disable-next-line no-use-before-define
			getQuestionsList();
		} catch {
			console.log('Error', error);
		}
	};

	const onClickEditButton = (id) => {
		router.push(
			`/learning/faq/create/question?mode=create&id=${id}`,
			`/learning/faq/create/question?mode=create&id=${id}`,
		);
	};

	const onClickViewButton = (id) => {
		router.push(
			`/learning/faq/create/question?mode=preview&id=${id}&source=view`,
			`/learning/faq/create/question?mode=preview&id=${id}&source=view`,
		);
	};

	const columns = activeList !== 'requested'
		? addedQuestionsColumns({
			activeList,
			onClickEditButton,
			deactivateQuestion,
			onClickViewButton,
			deleteitem,
			setDeleteitem,
		})
		: requestedQuestionsColumns({ deactivateQuestion, onClickEditButton });

	const { list: data = [], ...paginationData } = questionList || {};

	return {
		page,
		setPage,
		paginationData,
		data,
		columns,
		filters,
		setFilters,
		searchInput,
		setSearchInput,
		activeList,
		setActiveList,
		questionListLoading: loading,
		onClickViewButton,
		sortType,
		setSortType,
	};
};

export default useQuestionList;
