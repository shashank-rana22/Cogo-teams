import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import PreviewDocumet from '../../../../common/PreviewDocumet';

import styles from './styles.module.css';

function IdentificationDocuments({ profileData }) {
	const { documents } = profileData || {};

	return (
		<div className={styles.container}>
			{
				(documents || []).map((doc) => {
					const { document_type, document_url, id } = doc || {};
					return (
						<div className={styles.card_wrapper} key={id}>
							<div className={styles.header}>{startCase(document_type)}</div>
							<PreviewDocumet document_header={startCase(document_type)} document_url={document_url} preview='true'/>
							<div className={styles.button_container}>
								<Button>
									Reject
								</Button>
								<div className={styles.approve_btn}>
									<Button>
										Approve
									</Button>
								</div>

							</div>
						</div>
					);
				})
			}

		</div>

	);
}

export default IdentificationDocuments;
