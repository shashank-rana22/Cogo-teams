import { Input } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';

import EmailTemplateLoading from './EmailTemplateLoading';
import styles from './styles.module.css';
import TemplateList from './TemplateList';

function EmailTemplateList({
	list = [],
	loading = false,
	search = '',
	setSearch = () => {},
	setEmailTemplate = () => {},
	emailData = {},
	setEmailState = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Input
					value={search}
					size="sm"
					onChange={setSearch}
					placeholder="Search by name"
					className={styles.search_input}
					suffix={(
						<IcMCross
							className={styles.cross_icon}
							onClick={() => setSearch('')}
						/>
					)}
				/>
			</div>
			<div className={styles.template_content}>
				{loading ? <EmailTemplateLoading /> : (
					<TemplateList
						list={list}
						emailData={emailData}
						setEmailState={setEmailState}
						setEmailTemplate={setEmailTemplate}
					/>
				)}

			</div>

		</div>
	);
}

export default EmailTemplateList;
