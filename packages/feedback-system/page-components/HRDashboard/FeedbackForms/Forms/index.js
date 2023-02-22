import { Pagination, Pill, Button, Placeholder } from '@cogoport/components';
import { format, isEmpty, startCase } from '@cogoport/utils';

import useListForms from '../../../../utils/useListForms';

import EmptyState from './EmptyState';
import styles from './styles.module.css';

function Forms({
	formsParams = {},
	setOpenCreateForm = () => {},
	openCreateForm = false,
	setFormStage = () => {},
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

	const dummyArray = ['ok', 'ok1', 'harry', 'potter', 'lorem', 'ipsum'];

	if (isEmpty(Object.values(formsParams).filter((i) => i))) {
		return <div className={styles.no_role}>Please select designation to show forms...</div>;
	}

	const showForm = () => {
		setOpenCreateForm(true);
		setFormStage('add_questions');
	};

	return (isEmpty(formList) ? <EmptyState setFormStage={setFormStage} setOpenCreateForm={setOpenCreateForm} /> : (
		<div className={styles.container}>
			<div className={styles.form_header}>
				<div className={styles.form_cat}>{`${startCase(department)}: ${startCase(designation)}`}</div>
				{!openCreateForm && !!designation && (
					<Button themeType="accent" onClick={() => showForm()}>Create New</Button>
				)}
			</div>

			<div className={styles.forms}>
				{ loading ? (
					<div className={styles.right_form_div}>
						{dummyArray.map(() => (
							<Placeholder
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
									{format(created_at, 'MMM yyyy')}
								</div>
							</div>

							<div className={styles.form_name}>
								<p className={styles.label}>Questions</p>
								<div className={styles.value}>{question_count || '---'}</div>
							</div>

							{/* <div className={styles.last_used}>
								<p className={styles.label}>Last Used</p>
								<div className={styles.value}>
									{format(last_used, 'MMM yyyy')}
								</div>
							</div> */}

							<div className={styles.status}>
								<p className={styles.label}>Status</p>
								<div className={styles.value}>
									<Pill color={status === 'active' ? 'green' : 'red'}>
										{status}
									</Pill>
								</div>
							</div>

							<div className={styles.action}>
								<div className={styles.value}>
									<Button themeType="secondary" onClick={() => openOldForm(id)}>Use</Button>
								</div>
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
