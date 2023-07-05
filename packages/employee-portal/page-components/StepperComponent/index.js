import { IcMProfile, IcCFtick, IcMDocument, IcMFtick } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const OPACITY_VALUE = 1;
const NON_OPACITY_VALUE = 0.5;

function StepperComponent({ data, loading }) {
	const { progress_stats = {}, company_policy_data, signed_documents } = data || {};
	const {
		additional_info_added = {},
		// offer_letter_signed = {},
		personal_details = {},
		documents_signed = {},
		company_policies_read,
	} = progress_stats;

	const { documents_signed:document_sign = false } = documents_signed;

	// const { get_offer_letter_signed = false } = offer_letter_signed;

	const MAPPING = [
		{
			name      : 'personal_details',
			icon      : IcMProfile,
			is_added  : (Object.keys(personal_details) || []).every((key) => (personal_details[key])),
			sub_title : 'Added',
		},
		// {
		// 	name      : 'offer_letter',
		// 	icon      : IcMDocument,
		// 	is_added  : get_offer_letter_signed,
		// 	sub_title : 'Signed',
		// },
		{
			name     : 'additional_info',
			icon     : IcMDocument,
			is_added : !loading
			&& (Object.keys(additional_info_added) || []).every((key) => (additional_info_added[key])),
			sub_title: 'Added',
		},
		{
			name      : 'documents',
			icon      : IcMDocument,
			is_added  : !isEmpty(signed_documents) && document_sign,
			sub_title : 'Signed',
		},
		{
			name      : 'company_policies',
			icon      : IcMDocument,
			is_added  : !isEmpty(company_policy_data) && company_policies_read?.company_policies_read,
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
						<div
							key={name}
							className={styles.single_card}
							style={{ opacity: is_added ? OPACITY_VALUE : NON_OPACITY_VALUE }}
						>
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
