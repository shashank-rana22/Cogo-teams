import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import PreviewDocumet from '../../../commons/PreviewDocumet';
import useGetCompanyDocument from '../../../hooks/useGetCompanyDocument';
import useGetEsignDocuments from '../../../hooks/useGetEsignDocuments';

import styles from './styles.module.css';

function SignYourDocuments({ setInformationPage, data }) {
	const { progress_stats = {}, detail = {} } = data || {};
	const { documents_signed = {} } = progress_stats;
	const { documents_signed: document_sign = false } = documents_signed;

	const {
		companyDoc,
		loading,
		getDocRefetch,
	} = useGetCompanyDocument({ detail });

	const { signDocumentsRefetch } = useGetEsignDocuments();

	const onOpen = (url, item) => {
		signDocumentsRefetch();

		if (item?.status === 'accepted') {
			getDocRefetch();
		} else { window.open(url, '_blank'); }
	};

	if (loading) {
		return (
			<div>loading...</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					role="presentation"
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setInformationPage('')}
				/>
				<div className={styles.title}>SIGN YOUR DOCUMENTS</div>
			</div>
			<div> Sign Your Documents</div>

			<div style={{ display: 'flex', marginTop: '20px' }}>
				{([1, 2, 3]).map((item, i) => (

					<div key={i} style={{ padding: '0 12px' }}>
						<PreviewDocumet document_url={item?.document_url} />
						{item?.status === 'accepted' ? <div>Already Done</div> : (
							<Button
								size="md"
								themeType="primary"
								style={{
									margin : '12px auto',
									width  : '20%',
								}}
								onClick={() => onOpen(item?.document_url, item)}
							>
								Sign

							</Button>
						)}

					</div>

				))}
			</div>
		</div>
	);
}

export default SignYourDocuments;
