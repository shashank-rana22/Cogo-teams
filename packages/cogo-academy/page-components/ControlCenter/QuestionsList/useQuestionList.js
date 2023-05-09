import { Pill, Button, Popover } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowNext, IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import PopOverContent from '../../../commons/PopoverContent';

import styles from './styles.module.css';
import feedbackTableColumns from './utils/getFeedbackTableColumns';

const FILTER_MAPPING = {
	published : { state: 'published', status: 'active' },
	draft     : { state: 'draft', status: 'active' },
	inactive  : { status: 'inactive' },
	requested : { state: 'requested', status: 'active' },
	feedbacks : { state: 'published', status: 'active' },
};

const addedQuestionsColumns = ({
	showPopOver,
	setShowPopOver = () => {},
	onClickNoButton = () => {},
	activeList,
	onClickEditButton,
	deactivateQuestion,
	onClickViewButton = () => {},
	sortType,
	setSortType = () => {},
}) => {
	if (activeList === 'feedbacks') {
		return feedbackTableColumns({ onClickEditButton, onClickViewButton });
	}

	return [
		{
			Header   : 'QUESTIONS',
			accessor : (items) => (
				<div className={styles.question}>
					{items?.question_abstract}
				</div>
			),
		},
		{
			Header   : 'QUESTION TYPE',
			accessor : (items) => (

				<Pill
					size="sm"
					color={items?.is_parent ? 'green' : 'yellow'}
				>
					{items?.is_parent ? 'Parent' : 'Alias'}
				</Pill>

			),
		},
		{
			Header   : 'TOPICS',
			accessor : (items) => (!isEmpty(items?.faq_topics || []) ? (
				<div className={styles.topics}>
					{(items.faq_topics || []).map((topic) => {
						const { display_name, id } = topic || {};
						return <Pill size="sm" color="green" key={id}>{startCase(display_name)}</Pill>;
					})}
				</div>
			) : '-'),
		},
		{
			Header   : 'TAGS',
			accessor : (items) => (!isEmpty(items?.faq_tags || []) ? (
				<div className={styles.tags}>
					{items.faq_tags.map((tag) => {
						const { display_name, id } = tag || {};
						return <Pill size="sm" color="green" key={id}>{startCase(display_name)}</Pill>;
					})}
				</div>
			) : '-'),
		},
		{
			id     : 'LAST UPDATED AT',
			Header : (
				<div role="presentation" className={styles.sort_title} onClick={() => setSortType((prev) => !prev)}>
					LAST UPDATED AT
					<IcMArrowNext
						height={14}
						width={14}
						className={styles.sort_arrow}
						style={{ transform: sortType ? 'rotate(270deg)' : '' }}
					/>
				</div>
			),
			accessor: (items) => {
				const date = items?.updated_at || items?.created_at;
				return (
					<div>
						{formatDate({
							date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
						,
						{' '}
						{formatDate({
							date,
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
							formatType : 'time',
						})}
					</div>
				);
			},
		},
		{
			Header   : 'ACTIONS',
			accessor : (items) => {
				const { parent_question_id, id } = items || {};

				return (
					<div className={styles.button_container}>
						{!['inactive', 'draft'].includes(activeList)
							? (
								<Button
									type="button"
									themeType="primary"
									size="sm"
									style={{ marginRight: 8 }}
									onClick={() => onClickViewButton(parent_question_id || id)}
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
							onClick={() => onClickEditButton(parent_question_id || id)}
						>
							EDIT
						</Button>

						{activeList !== 'inactive' && (
							<Popover
								content={(
									<PopOverContent
										source="question"
										onCLickYesButton={() => deactivateQuestion(items.id)}
										onClickNoButton={() => onClickNoButton(items)}
									/>
								)}
								visible={showPopOver === items?.id}
							>
								<IcMDelete
									height={20}
									width={20}
									style={{ cursor: 'pointer' }}
									onClick={() => setShowPopOver(() => (showPopOver === items?.id ? null : items?.id))}
								/>
							</Popover>

						)}

					</div>
				);
			},
		},
	];
};

const requestedQuestionsColumns = ({
	deactivateQuestion, onClickEditButton, showPopOver, setShowPopOver = () => {}, onClickNoButton = () => {},
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
		accessor : (items) => (
			<div>
				{formatDate({
					date       : items?.created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
			</div>
		),
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
							onClickNoButton={() => onClickNoButton(items)}
						/>

					)}
					visible={showPopOver === items?.id}
				>
					<IcMDelete
						height={20}
						width={20}
						style={{ cursor: 'pointer' }}
						onClick={() => setShowPopOver(() => (showPopOver === items?.id ? null : items?.id))}
					/>
				</Popover>
			</div>
		),
	},
];

const useQuestionList = () => {
	const router = useRouter();
	const [showPopOver, setShowPopOver] = useState(false);
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
	}, [debounceQuery, searchInput]);

	const onClickNoButton = () => {
		setShowPopOver(null);
	};

	const getQuestionsList = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						...filters,
						...FILTER_MAPPING[activeList],
						q                    : query || undefined,
						is_feedback_positive : activeList === 'feedbacks' ? false : undefined,
					},
					page                   : !query ? page : 1,
					is_admin_view          : true,
					sort_by                : SORT_MODE,
					sort_type              : SORT_TYPE,
					faq_tags_data_required : ['published', 'draft']
						.includes(FILTER_MAPPING[activeList].state),
					faq_topics_data_required: ['published', 'draft', 'feedbacks']
						.includes(FILTER_MAPPING[activeList].state),
					author_data_required              : FILTER_MAPPING[activeList].state === 'requested',
					requested_question_count_required : true,
					faq_feedback_count_required       : true,
					answers_data_required             : undefined,
					last_updated_feedback_required    : activeList === 'feedbacks',
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [SORT_MODE, SORT_TYPE, activeList, filters, page, query, trigger]);

	useEffect(() => {
		getQuestionsList();
	}, [page, filters, query, activeList, SORT_TYPE, getQuestionsList]);

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

	const addedQuestionEnties = Object.entries(addedQuestionsColumns({
		showPopOver,
		setShowPopOver,
		onClickNoButton,
		activeList,
		onClickEditButton,
		deactivateQuestion,
		onClickViewButton,
		deleteitem,
		setDeleteitem,
		sortType,
		setSortType,
	}));

	const renderAddedQuestionColumns = () => {
		const cols = addedQuestionEnties.map(([column, obj]) => ({
			id       : column,
			Header   : obj.Header,
			accessor : obj.accessor,
		}));
		return cols;
	};
	const columns = activeList !== 'requested'
		? renderAddedQuestionColumns() : requestedQuestionsColumns({
			deactivateQuestion,
			onClickEditButton,
			showPopOver,
			setShowPopOver,
			onClickNoButton,
		});

	const {
		list: data = [],
		requested_question_count = 0,
		downvote_feedback_count = 0,
		...paginationData
	} = questionList || {};

	return {
		showPopOver,
		setShowPopOver,
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
		questionListLoading    : loading,
		onClickViewButton,
		sortType,
		setSortType,
		requestedQuestionCount : requested_question_count,
		downvoteFeedbackCount  : downvote_feedback_count,
	};
};

export default useQuestionList;
