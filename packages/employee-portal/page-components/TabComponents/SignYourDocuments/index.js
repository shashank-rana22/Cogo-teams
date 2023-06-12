import { Button, Loader } from '@cogoport/components';
import { IcCFtick, IcMArrowBack } from '@cogoport/icons-react';

import PreviewDocument from '../../../commons/PreviewDocument';
import useGetCompanyDocument from '../../../hooks/useGetCompanyDocument';
import useGetDocumentSigningUrl from '../../../hooks/useGetDocumentSigningUrl';

import styles from './styles.module.css';

function SignYourDocuments({ setInformationPage, data }) {
	const { companyDoc, loading, getDocRefetch } = useGetCompanyDocument({
		detail: data?.detail,
	});

	const { onClickSignDocument } = useGetDocumentSigningUrl(
		{ getEmployeeDetails: getDocRefetch, document_type: 'signed_document' },
	);

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

			{loading ? (
				<div className={styles.spinner}>
					<Loader
						width="100px"
						height="100px"
						style={{ height: '50px', width: '50px' }}
					/>
				</div>
			) : (
				<div style={{ display: 'flex', marginTop: '20px', flexWrap: 'wrap' }}>

					{(companyDoc || []).map((item) => (
						<div key={item?.id} style={{ padding: '0 12px', flexWrap: 'wrap' }}>

							<PreviewDocument document_url={item?.signed_document_url || item?.document_url} />

							<div>
								{item?.status === 'accepted' ? (
									<div className={styles.already_signed}>
										<span style={{ paddingRight: 4 }}>Already Signed</span>

										<IcCFtick width={20} height={20} />
									</div>
								) : (
									<Button
										size="md"
										themeType="primary"
										style={{
											margin : '12px auto',
											width  : '20%',
										}}
										onClick={() => onClickSignDocument(item?.id)}
									>
										Sign
									</Button>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default SignYourDocuments;
