import { Button, Input, Placeholder } from '@cogoport/components';
import { IcMArrowNext, IcMSearchlight } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import DepartmentSelect from '../../../../common/DepartmentSelect';
import EmptyState from '../../../../common/EmptyState';
import RoleSelect from '../../../../common/RoleSelect';
import useUpdatefeedbackQuestion from '../../../../hooks/useBulkUpdateFeedbackQuestions';
import useListFeedbackQuestions from '../../../../hooks/useListFeedbackQuestions';

import Questions from './Questions';
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
	});

	const { data = {}, loading = false } = useListFeedbackQuestions({
		status: 'inactive',
		searchValue,
		params,
	});

	const { onBulkUpdate, updateApiLoading = false } =	useUpdatefeedbackQuestion();

	const { list = [] } = data || {};

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
		setSearchValue(e.target?.value);
	};

	const showLoading = () => (
		<div style={{ margin: '16px' }}>
			{' '}
			<Placeholder style={{ marginBottom: '16px' }} width="100%" height="80px" />
			<Placeholder style={{ marginBottom: '16px' }} width="100%" height="80px" />
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
					<Input
						size="lg"
						value={searchValue}
						onChange={(e) => handleChange(e)}
						placeholder="Search by Question "
						prefix={<IcMSearchlight style={{ marginTop: '6px' }} />}
						type="text"
					/>
				</div>
			</div>

			{loading && showLoading()}

			{list?.length === 0 && !loading && <EmptyState />}

			{!loading && (
				<div className={styles.question_section}>
					{(list || []).map((item, index) => (
						<div>
							<Questions
								item={item}
								index={index}
								setPreviousQuestions={setPreviousQuestions}
								setIsCheckedAll={setIsCheckedAll}
							/>
						</div>
					))}
				</div>
			)}

			{list?.length > 0 && (
				<div className={styles.layout_container}>
					<Button
						loading={updateApiLoading}
						disabled={!showAddToButton}
						className="primary sm"
						onClick={() => {
							saveAll();
						}}
					>
						Add to Active Questions
						{' '}
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
