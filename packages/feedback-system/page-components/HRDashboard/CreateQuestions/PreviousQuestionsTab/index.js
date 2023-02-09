import { Pagination, Button, Input, Placeholder } from '@cogoport/components';
import { IcMArrowNext, IcMSearchlight } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import DepartmentSelect from '../../../../common/DepartmentSelect';
import EmptyState from '../../../../common/EmptyState';
import Questions from '../../../../common/Questions';
import RoleSelect from '../../../../common/RoleSelect';
import useUpdatefeedbackQuestion from '../../../../hooks/useBulkUpdateFeedbackQuestions';
import useListFeedbackQuestions from '../../../../hooks/useListFeedbackQuestions';

import styles from './styles.module.css';

function PreviousQuestionsTab({ setActiveTab = () => {} }) {
	const [IsCheckedAll, setIsCheckedAll] = useState({});
	const [previousQuestions, setPreviousQuestions] = useState({});
	const [showAddToButton, setShowAddToButton] = useState(false);
	const [searchValue, setSearchValue] = useState(null);

	const [params, setParams] = useState({
		filters: {
			department : 'technology',
			work_scope : 'Associate Software Engineer',
		},
		page       : 1,
		page_limit : 3,
	});

	const setPage = (p) => { setParams({ ...params, page: p }); };

	const { data = {}, loading = false } = useListFeedbackQuestions({
		status: 'inactive',
		searchValue,
		params,
	});

	const { onBulkUpdate, updateApiLoading = false } =	useUpdatefeedbackQuestion();

	const { list = [], total_count = '' } = data || {};

	const saveAll = () => {
		const finalAddedQuestions = [];

		Object.keys(previousQuestions || {}).map((key) => {
			if (IsCheckedAll[key]) {
				finalAddedQuestions.push({ ...previousQuestions[key] });
			}

			onBulkUpdate({ questions: finalAddedQuestions, setActiveTab });

			return null;
		});
		setPreviousQuestions(null);
	};

	useEffect(() => {
		setShowAddToButton(false);
		Object.keys(IsCheckedAll).map((index) => {
			if (IsCheckedAll[index]) {
				setShowAddToButton(true);
			}
			return null;
		});
	}, [IsCheckedAll]);

	const handleChange = (e) => {
		setSearchValue(e);
	};

	const showLoading = () => (
		<div style={{ margin: '16px 0px' }}>
			<Placeholder margin="8px 0px 0px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
			<Placeholder margin="8px 0px 0px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
			<Placeholder margin="8px 0px 0px" style={{ borderRadius: '4px' }} width="100%" height="52px" />
		</div>
	);

	return (
		<div>
			<div className={styles.select_container}>
				<DepartmentSelect value={params.filters?.department} setValue={setParams} type="controller" />

				<RoleSelect
					value={params.filters?.work_scope}
					department={params.filters.department}
					setValue={setParams}
					type="controller"
				/>
			</div>

			<div className={styles.header}>
				<p>
					Select Questions from the list
				</p>
				<div className={styles.search_question_filter}>
					{total_count > 3 && (
						<Pagination
							type="compact"
							currentPage={params.page}
							totalItems={total_count}
							pageSize={params.page_limit}
							onPageChange={setPage}
							style={{ marginRight: '8px' }}
						/>
					)}

					<Input
						size="sm"
						value={searchValue}
						onChange={(e) => handleChange(e)}
						placeholder="Search by Question "
						prefix={<IcMSearchlight />}
						type="text"
					/>
				</div>
			</div>

			{loading && showLoading()}

			{list?.length === 0 && !loading && <EmptyState />}

			{!loading && list?.length !== 0 && (
				<div className={styles.question_section}>
					{(list || []).map((item, index) => (
						<Questions
							item={item}
							index={index}
							setPreviousQuestions={setPreviousQuestions}
							setIsCheckedAll={setIsCheckedAll}
							type="previous"
						/>
					))}
				</div>
			)}

			{list?.length > 0 && (
				<div className={styles.layout_container}>
					<Button
						size="md"
						themeType="accent"
						loading={updateApiLoading}
						disabled={!showAddToButton}
						onClick={() => {
							saveAll();
						}}
					>
						Add to Active Questions
						<IcMArrowNext
							style={{ marginLeft: '8px' }}
							height={12}
							width={12}
						/>
					</Button>
				</div>
			)}
		</div>
	);
}

export default PreviousQuestionsTab;
