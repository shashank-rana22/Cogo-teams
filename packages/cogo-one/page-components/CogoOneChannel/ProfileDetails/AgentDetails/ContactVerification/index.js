import { Pill, Placeholder } from '@cogoport/components';
import { IcMCall, IcCWhatsapp } from '@cogoport/icons-react';
import { snakeCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ContactVerification({ leadUserId = '', userId = '', loading = false, userData = {} }) {
	const { mobile_verified, whatsapp_verified } = userData || {};

	const VERIFICATION_STATUS = [
		{
			label      : mobile_verified ? 'Verified' : 'Not Verified',
			color      : mobile_verified ? 'green' : '#f8aea8',
			size       : 'sm',
			prefixIcon : <IcMCall />,
		},
		{
			label      : whatsapp_verified ? 'Verified' : 'Not Verified',
			color      : whatsapp_verified ? 'green' : '#f8aea8',
			size       : 'sm',
			prefixIcon : <IcCWhatsapp />,
		},
	];

	if (!(leadUserId || userId)) {
		return null;
	}

	return (
		<div>
			<div className={styles.verification_pills}>
				{VERIFICATION_STATUS.map((item, index) => {
					const { label = '', prefixIcon, color } = item;
					const itemKey = `${snakeCase(item.label)}_${index}`;
					return (
						<div key={itemKey}>
							{loading ? (
								<Placeholder
									height="20px"
									width="120px"
									margin="10px 0px 10px 0px"
								/>
							) : (
								<Pill
									key={label}
									prefix={prefixIcon}
									size="md"
									color={color}
								>
									<div className={styles.pill_name}>
										{label}
									</div>
								</Pill>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ContactVerification;
