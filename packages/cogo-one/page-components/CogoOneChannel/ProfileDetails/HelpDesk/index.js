import { Input, Pagination, Tooltip, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import IconMapping from '../../../../constants/HELP_DESK_ICON_MAPPING';
import useTopicList from '../../../../hooks/useTopicList';

import QuestionList from './QuestionList';
import styles from './styles.module.css';

function HelpDesk() {
	const {
		search = '',
		setSearch = () => {},
		list,
		loading,
		paginationData,
		page,
		setPage = () => {},
		topic = {},
		setTopic = () => {},
		question = {},
		setQuestion = () => {},
	} = useTopicList();

	const generalIcon = (
		<img
			src={GLOBAL_CONSTANTS.image_url.general_icon}
			alt="logo cogoport"
			style={{ width: 40, height: 40 }}
		/>
	);

	const render = () => {
		if (!isEmpty(topic)) {
			return (
				<QuestionList
					topic={topic}
					setTopic={setTopic}
					question={question}
					setQuestion={setQuestion}
				/>
			);
		}

		const renderIcon = ({ item }) => {
			const { name = '' } = item || {};

			let includesKey = '';
			Object.keys(IconMapping).forEach((key) => {
				if (name.includes(key)) {
					includesKey = key;
				}
			});

			const DisplayIcon = IconMapping[includesKey]?.icon || generalIcon;

			return (
				<div className={styles.icon}>
					{DisplayIcon}
				</div>
			);
		};

		return (
			<div className={styles.container}>
				<div className={styles.popular_topics}>Popular Topics</div>
				<div className={styles.display_topics}>
					{(list || []).map((item) => (
						<div
							key={item?.id}
							role="presentation"
							className={styles.square_div}
							onClick={() => setTopic(item)}
						>
							{renderIcon({ item })}

							<div>
								<Tooltip
									content={startCase(item?.display_name)}
									placement="bottom"

								>
									<div className={styles.display_name}>
										{startCase(item?.display_name)}
										{' '}
									</div>
								</Tooltip>
								<div className={styles.question_count}>
									{item?.question_count}
									{' '}
									Questions
								</div>
							</div>
						</div>
					))}
				</div>

				<div className={styles.pagination_container}>
					<Pagination
						type="page"
						currentPage={page || 1}
						totalItems={paginationData?.total_count || 0}
						pageSize={10}
						onPageChange={(val) => setPage(val)}
					/>
				</div>
			</div>
		);
	};

	const renderQuestionList = () => {
		if (search) {
			return (
				<QuestionList
					search={search}
					question={question}
					setQuestion={setQuestion}
				/>
			);
		}

		if (loading) {
			return (
				<div className={styles.spinner_container}>
					<Loader themeType="primary" />
				</div>
			);
		}

		return (
			<div>
				{isEmpty(list) ? <EmptyState type="help_desk" /> : render()}
			</div>
		);
	};

	return (
		<>
			<div className={styles.title}>Help Desk</div>
			<Input
				size="sm"
				prefix={<IcMSearchlight width={18} height={18} />}
				placeholder="Search for a question or a topic.."
				value={search}
				onChange={(val) => setSearch(val)}
				disabled={loading}
				suffix={!isEmpty(search) && (
					<IcMCross
						className={styles.cross_icon}
						onClick={() => {
							setSearch('');
						}}
					/>
				)}
			/>
			{renderQuestionList()}

		</>
	);
}
export default HelpDesk;
