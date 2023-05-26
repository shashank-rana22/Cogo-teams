import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import PreviewDocumet from '../../../commons/PreviewDocumet';

import styles from './styles.module.css';
import useUpdateOfferLetter from './useUpdateOfferLetter';

function OfferLetter({ setInformationPage, data, getEmployeeDetails }) {
	const { id, status } = data?.offer_letter || {};

	const document_url = 'https://www.orimi.com/pdf-test.pdf';

	const { updateData } = useUpdateOfferLetter({ document_url, id, getEmployeeDetails });
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
				<div className={styles.title}>OFFER LETTER</div>
			</div>

			{
				status !== 'accepted' ? (
					<div className={styles.button_container}>
						<div style={{ paddingRight: 10 }}>
							<Button
								themeType="secondary"
								size="md"
								onClick={() => updateData({ status: 'rejected' })}
							>
								Reject
							</Button>
						</div>

						<Button
							themeType="primary"
							size="md"
							onClick={() => updateData({ status: 'accepted' })}
						>
							Accept
						</Button>
					</div>
				) : null
			}

			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<PreviewDocumet
					height="700px"
					width="800px"
					document_url={document_url}
				/>

			</div>

		</div>
	);
}

export default OfferLetter;
