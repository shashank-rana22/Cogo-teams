import { IcMProfile, IcCFtick, IcMDocument, IcMFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function StepperComponent({ data }) {
	const { progress_stats = {} } = data || {};
	const {
		additional_info_added = {},
		offer_letter_signed = {},
		personal_details = {},
		documents_signed = {},
		company_policies_read,
	} = progress_stats;

	const { documents_signed:document_sign = false } = documents_signed;

	const {
		bank_details = false,
		educational_qualification = false,
		employment_history = false,
		resume = false,
	} = additional_info_added;

	const { get_offer_letter_signed = false } = offer_letter_signed;

	const {
		address_details = false,
		identification_documents = false,
		personal_information = false,
	} = personal_details;

	const MAPPING = [
		{
			name      : 'profile_details',
			icon      : IcMProfile,
			is_added  : address_details && identification_documents && personal_information,
			sub_title : 'Added',
		},
		{
			name      : 'offer_letter',
			icon      : IcMDocument,
			is_added  : get_offer_letter_signed,
			sub_title : 'Signed',
		},
		{
			name      : 'additional_info',
			icon      : IcMDocument,
			is_added  : bank_details && educational_qualification && employment_history && resume,
			sub_title : 'Added',
		},
		{
			name      : 'documents',
			icon      : IcMDocument,
			is_added  : document_sign,
			sub_title : 'Signed',
		},
		{
			name      : 'company_policies',
			icon      : IcMDocument,
			is_added  : company_policies_read?.company_policies_read,
			sub_title : 'Read',
		},

	];
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Your progress so far -
			</div>
			<div className={styles.flex_wrapper}>
				{ MAPPING.map((element) => {
					const { name, is_added, icon:Icon, sub_title } = element || {};
					const TickIcon = is_added ? IcCFtick : IcMFtick;

					return (
						<div key={name} className={styles.single_card} style={{ opacity: is_added ? 1 : 0.5 }}>
							<div className={styles.tick_icon}>
								<TickIcon width={24} height={24} />
							</div>

							<div className={styles.icon_wrapper}>
								<Icon width={20} height={20} />
							</div>

							<div>
								<div className={styles.text_wrapper}>
									{startCase(name)}
								</div>

								<div className={styles.text_wrapper}>
									{sub_title}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default StepperComponent;
