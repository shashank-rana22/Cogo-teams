import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';

import CommonLoader from '../../../common/Loader';
import PreviewDocument from '../../../common/PreviewDocumet';
import useGetEmployeeSignedDocuments from '../../hooks/useGetEmployeeSigningDocuments';

import styles from './styles.module.css';

const STATUS_MAPPING = {
	active   : 'CHROs Approval Pending',
	approved : 'Approved by CHRO',
	accepted : 'Offer letter accepted',
};

function OfferLetter() {
	const { data, loading } = useGetEmployeeSignedDocuments();
	const { offer_letter } = data || {};
	const { signed_document_url, document_url, status, created_at } = offer_letter || {};

	if (loading) {
		return <CommonLoader />;
	}

	return (
		<div className={styles.container}>

			<PreviewDocument
				document_url={signed_document_url || document_url}
				preview
			/>

			<div className={styles.content}>
				<div style={{ fontWeight: 600, paddingBottom: 10 }}>
					OFFER LETTER
				</div>

				<div style={{ paddingBottom: 10 }}>
					<span className={styles.label}>
						Created at :
					</span>

					{' '}
					{formatDate({
						date       : created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</div>

				<div style={{ paddingBottom: 10 }}>
					<span className={styles.label}>
						Status :
						{' '}
					</span>
					{STATUS_MAPPING[status]}
				</div>

			</div>

		</div>
	);
}

export default OfferLetter;
