import { cl } from '@cogoport/components';

import CardLoadingState from '../../../../../../../../common/LoadingState/CardLoadingState';

import styles from './styles.module.css';

function EmailPreview({
	emailPreviews = {},
	emailWatch = () => {},
	loading = false,
	agent_email = '',
	selected = {},
}) {
	if (loading) {
		return <CardLoadingState customStyles={{ height: '160px' }} />;
	}

	return (
		<>
			<div className={cl`${styles.label} ${styles.email_preview}`}>
				Email preview
				{' '}
				<span style={{ fontWeight: '500' }}>
					(sent from
					{' '}
					{agent_email}
					)
				</span>
			</div>
			<div className={styles.text}>
				Subject -
				{' '}
				{emailWatch()?.subject
					|| emailPreviews?.[selected?.tax_number]?.template?.subject
					|| emailPreviews?.main?.template?.subject
					|| 'Subject is required'}
			</div>
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{
					__html:
						emailPreviews?.[selected?.tax_number]?.template
						|| emailPreviews?.main?.template,
				}}
			/>
		</>
	);
}

export default EmailPreview;
