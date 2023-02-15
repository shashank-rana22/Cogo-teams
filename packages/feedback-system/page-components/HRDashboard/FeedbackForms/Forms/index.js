import { Pill, Button } from '@cogoport/components';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import useListForms from '../../../../utils/useListForms';
import CreateFeedbackForm from '../CreateFeedbackForm';

import styles from './styles.module.css';

function Forms({
	formsParams = {},
	openCreateForm = false, setOpenCreateForm = () => {},
}) {
	const [formId, setFormId] = useState('');

	const openOldForm = (Id) => {
		setFormId(Id);
	};

	const { formsData = {}, loading = false } = useListForms({ formsParams });
	// const {formList = []} = formsData;

	const renderOldForm = () => <CreateFeedbackForm formId={formId} setFormId={setFormId} />;

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
	];

	return (
		<div className={styles.container}>
			{!openCreateForm && !formId && (
				<div className={styles.header}>
					<Button themeType="accent" onClick={() => setOpenCreateForm(true)}>Create New</Button>
				</div>
			)}

			{formId ? renderOldForm() : (
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
									{/* <p className={styles.label}>Form Name</p> */}
									<div className={styles.value}>
										<Button themeType="secondary" onClick={() => openOldForm(id)}>Use</Button>
									</div>
								</div>
							</div>
						);
					}) }

				</div>
			)}

		</div>
	);
}

export default Forms;
