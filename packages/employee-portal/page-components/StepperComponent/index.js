import { IcMProfile, IcCFtick, IcMDocument, IcMFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function StepperComponent({ data }) {
	const { offer_letter } = data || {};
	const { status = '' } = offer_letter || {};
	const MAPPING = [
		{
			name      : 'profile_details',
			icon      : IcMProfile,
			is_added  : true,
			sub_title : 'Added',
		},
		{
			name      : 'offer_letter',
			icon      : IcMDocument,
			is_added  : status === 'accepted',
			sub_title : 'Signed',
		},
		{
			name      : 'additional_info',
			icon      : IcMDocument,
			is_added  : false,
			sub_title : 'Added',
		},
		{
			name      : 'documents',
			icon      : IcMDocument,
			is_added  : false,
			sub_title : 'Signed',
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
						<div key={name} className={styles.flex_wrapper} style={{ opacity: is_added ? 1 : 0.5 }}>
							<div className={styles.single_card}>
								<div className={styles.tick_icon}>
									<TickIcon width={24} height={24} />
								</div>

								<div className={styles.icon_wrapper}>
									<Icon width={22} height={22} />
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
							{
								name !== 'documents' && (
									<div>
										-----
										{'>'}
									</div>
								)
							}
						</div>
					);
				})}
			</div>

		</div>
	);
}

export default StepperComponent;
