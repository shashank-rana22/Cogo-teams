import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import PreviewDocumet from '../../../commons/PreviewDocumet';

import styles from './styles.module.css';
import useUpdateOfferLetter from './useUpdateOfferLetter';

function OfferLetter({ setInformationPage, data, getEmployeeDetails }) {
	// const { progress_stats = {} } = data;
	const { id, document_url, status } = data?.offer_letter || {};
	// const {
	// 	offer_letter_signed = {},
	// } = progress_stats;
	// const { get_offer_letter_signed = false } = offer_letter_signed;

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
				status === 'approved' ? (
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
