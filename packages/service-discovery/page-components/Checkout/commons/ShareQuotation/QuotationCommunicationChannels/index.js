import { Tooltip } from '@cogoport/components';
import { IcCError, IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const ICON_STYLES = {
	width  : '16px',
	height : '16px',
};

const MESSAGE_MAPPING = {
	email    : 'User Does`t have Email address',
	whatsapp : 'User Does`t have Whatsapp Number',
	sms      : 'User Does`t have Mobile Number',
};

// eslint-disable-next-line custom-eslint/function-name-check
const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

function IconComponent({ enabled = false, isEligible = false }) {
	if (enabled && isEligible) {
		return <IcCFtick style={ICON_STYLES} />;
	}

	if (!enabled) {
		return <IcCFcrossInCircle style={ICON_STYLES} />;
	}

	return <IcCError style={ICON_STYLES} />;
}

function QuotationCommunicationChannels({ quotationOptions = [], selectedModes = [] }) {
	if (isEmpty(selectedModes)) {
		return null;
	}

	return (
		<div className={styles.container}>

			{quotationOptions.map((item) => {
				const { enabled, isEligible, label, value = '' } = item;

				return (
					<div key={value} className={styles.item}>
						<ConditionalWrapper
							condition={!isEligible}
							wrapper={(children) => (
								<Tooltip
									content={MESSAGE_MAPPING[value]}
									placement="top"
									interactive
								>
									<div className={styles.icon}>
										{children}
									</div>
								</Tooltip>
							)}
						>
							<IconComponent enabled={enabled} isEligible={isEligible} />
						</ConditionalWrapper>

						<div className={styles.label}>{label}</div>
					</div>
				);
			})}
		</div>
	);
}

export default QuotationCommunicationChannels;
