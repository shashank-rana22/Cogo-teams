import { Pagination, Pill, Button, Placeholder } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import useListForms from '../../../../hooks/useListForms';

import EmptyState from './EmptyState';
import styles from './styles.module.css';

function Forms({
	formsParams = {},
	setOpenCreateForm = () => {},
	openCreateForm = false,
	setFormStage = () => {},
	activationStatus = 'add',
	setFormId = () => {},
}) {
	const openOldForm = (Id) => {
		setFormId(Id);
		setOpenCreateForm(true);
		setFormStage('add_questions');
	};

	const { formsData = {}, loading = false, pagination, setPagination } = useListForms({ formsParams });

	const { department = '', designation = '' } = formsParams;

	const { list: formList = [], pagination_data: paginationData = {} } = formsData;

	const { total_count = '' } = paginationData;

	const arr = [1, 2, 3, 4, 5, 6];

	if (isEmpty(Object.values(formsParams).filter((i) => i))) {
		return <div className={styles.no_role}>Please select designation to show forms...</div>;
	}

	const showForm = () => {
		setOpenCreateForm(true);
		setFormStage('add_questions');
	};

	return (isEmpty(formList) && !loading
		? (
			<EmptyState
				setFormStage={setFormStage}
				setOpenCreateForm={setOpenCreateForm}
				activationStatus={activationStatus}
			/>
		) : (
			<div className={styles.container}>
				<div className={styles.form_header}>
					<div className={styles.form_cat}>
						{`${startCase(department || '---')}: 
					${startCase(designation || '---')}`}

					</div>
					{!openCreateForm && !!designation && (
						<Button
							themeType="primary"
							onClick={() => showForm()}
							disabled={activationStatus === 'edit'}
						>
							Create New
						</Button>
					)}
				</div>

				<div className={styles.forms}>
					{ loading ? (
						<div className={styles.right_form_div}>
							{arr.map((i) => (
								<Placeholder
									key={i}
									width="100%"
									height="80px"
									className={styles.loading_right_form}
								/>
							))}
						</div>
					) : formList.map((form) => {
						const {
							id = '', status = '', created_at = '', 'Questions Count': question_count = '',
						} = form;

						return (
							<div className={styles.form} key={id}>
								<div className={styles.published}>
									<p className={styles.label}>Published On</p>
									<div className={styles.value}>
										{formatDate({
											date       : created_at,
											formatType : 'date',
											dateFormat : 'dd MMM yyyy',
										})}
										{' '}
										<span>
											{' '}
											{formatDate({
												date       : created_at,
												formatType : 'time',
												timeFormat : 'HH:mm aaa',
											})}
										</span>
									</div>
								</div>

								<div className={styles.form_name}>
									<p className={styles.label}>Questions</p>
									<div className={styles.value}>{question_count || '---'}</div>
								</div>

								<div className={styles.status}>
									<p className={styles.label}>Status</p>
									<div className={styles.value}>
										<Pill color={status === 'active' ? 'green' : 'red'}>
											{startCase(status || '---')}
										</Pill>
									</div>
								</div>

								<div className={styles.action}>
									<Button
										themeType="tertiary"
										onClick={() => openOldForm(id)}
										disabled={activationStatus === 'edit'}
									>
										Use
									</Button>
								</div>
							</div>
						);
					}) }

				</div>

				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={pagination}
						totalItems={total_count}
						pageSize={10}
						onPageChange={setPagination}
					/>
				</div>
			</div>
		)

	);
}

export default Forms;
