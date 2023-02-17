import { Pagination, Pill, Button } from '@cogoport/components';
import { format, isEmpty } from '@cogoport/utils';

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

	const { designation } = formsParams;

	// const {formList = []} = formsData;

	if (isEmpty(Object.values(formsParams).filter((i) => i))) {
		return <div className={styles.no_role}>Please select designation to show forms...</div>;
	}

	const formList = [
		{
			id         : 1,
			month      : 'apr',
			year       : '2022',
			dept       : 'tech',
			role       : 'role1',
			status     : 'active',
			created_at : new Date(),
			last_used  : new Date(),
		},
		{
			id         : 2,
			month      : 'apr',
			year       : '2022',
			dept       : 'tech',
			role       : 'role1',
			status     : 'active',
			created_at : new Date(),
			last_used  : new Date(),
		},
		{
			id         : 3,
			month      : 'apr',
			year       : '2022',
			dept       : 'tech',
			role       : 'role1',
			status     : 'inactive',
			created_at : new Date(),
			last_used  : new Date(),
		},
		{
			id         : 4,
			month      : 'apr',
			year       : '2022',
			dept       : 'tech',
			role       : 'role1',
			status     : 'active',
			created_at : new Date(),
			last_used  : new Date(),
		},
		{
			id         : 5,
			month      : 'apr',
			year       : '2022',
			dept       : 'tech',
			role       : 'role1',
			status     : 'active',
			created_at : new Date(),
			last_used  : new Date(),
		},
		{
			id         : 4,
			month      : 'apr',
			year       : '2022',
			dept       : 'tech',
			role       : 'role1',
			status     : 'active',
			created_at : new Date(),
			last_used  : new Date(),
		},
		{
			id         : 5,
			month      : 'apr',
			year       : '2022',
			dept       : 'tech',
			role       : 'role1',
			status     : 'active',
			created_at : new Date(),
			last_used  : new Date(),
		},
		{
			id         : 4,
			month      : 'apr',
			year       : '2022',
			dept       : 'tech',
			role       : 'role1',
			status     : 'active',
			created_at : new Date(),
			last_used  : new Date(),
		},
		{
			id         : 5,
			month      : 'apr',
			year       : '2022',
			dept       : 'tech',
			role       : 'role1',
			status     : 'active',
			created_at : new Date(),
			last_used  : new Date(),
		},
	];

	const showForm = () => {
		setOpenCreateForm(true);
		setFormStage('add_questions');
	};

	return (isEmpty(formList) ? <EmptyState setFormStage={setFormStage} setOpenCreateForm={setOpenCreateForm} /> : (
		<div className={styles.container}>
			{!openCreateForm && !!designation && (
				<div className={styles.form_header}>
					<Button themeType="accent" onClick={() => showForm()}>Create New</Button>
				</div>
			)}

			<div className={styles.forms}>
				{formList.map((form) => {
					const {
						id = '', month = '', year = '', dept = '', role = '', status = '', created_at = '',
						last_used = '',
					} = form;

					return (
						<div className={styles.form} key={id}>
							<div className={styles.form_name}>
								<p className={styles.label}>Form Name</p>
								<div className={styles.value}>
									{dept}
									_
									{role}
									_
									{month}
									_
									{year}
								</div>
							</div>

							<div className={styles.published}>
								<p className={styles.label}>Published On</p>
								<div className={styles.value}>
									{format(created_at, 'MMM yyyy')}
								</div>
							</div>

							<div className={styles.last_used}>
								<p className={styles.label}>Last Used</p>
								<div className={styles.value}>
									{format(last_used, 'MMM yyyy')}
								</div>
							</div>

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
					totalItems={30}
					pageSize={10}
					onPageChange={setPagination}
				/>
			</div>
		</div>
	)

	);
}

export default Forms;
