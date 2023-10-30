import CardLoadingState from '../../../../../../../../common/LoadingState/CardLoadingState';

import styles from './styles.module.css';

function EmailPreview({
	emailPreviews = {},
	emailWatch = () => {},
	loading = false,
	selected = {},
}) {
	if (loading) {
		return <CardLoadingState customStyles={{ height: '160px' }} />;
	}

	return (
		<>
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
