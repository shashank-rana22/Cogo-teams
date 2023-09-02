import { Button } from '@cogoport/components';

import ACTIVE_MODE_KEYS_MAPPING from '../../../../constants/active-mode-keys-mapping';

const { CREATE, EDIT } = ACTIVE_MODE_KEYS_MAPPING;

function getModeWiseButtons(props) {
	const {
		activeMode,
		onCreate = () => {},
		createLoading = false,
		createDisabled = true,
		t = () => {},
	} = props;

	const MODE_BASIS_BUTTON_MAPPING = {
		[CREATE]: (
			<>
				<Button
					size="lg"
					type="button"
					themeType="secondary"
					style={{ marginRight: '12px' }}
					onClick={() => onCreate({ distribute_equally: true })}
					loading={createLoading}
				>
					{t('allocation:distribute_send_verification')}
				</Button>

				<Button
					size="lg"
					type="button"
					themeType="primary"
					onClick={() => onCreate({ distribute_equally: false })}
					loading={createLoading}
					disabled={createDisabled}
				>
					{t('allocation:objective_send_verification')}
				</Button>
			</>
		),
		[EDIT]: (
			<>
				<Button
					size="lg"
					type="button"
					themeType="secondary"
					style={{ marginRight: '12px' }}
					onClick={() => onCreate({ distribute_equally: true })}
					loading={createLoading}
				>
					{t('allocation:duplicate_equally_send_verification')}
				</Button>

				<Button
					size="lg"
					type="button"
					themeType="primary"
					loading={createLoading}
					disabled={createDisabled}
					onClick={() => onCreate({ distribute_equally: false })}
				>
					{t('allocation:duplicate_send_verification')}
				</Button>
			</>

		),
	};

	return MODE_BASIS_BUTTON_MAPPING[activeMode] || null;
}

export default getModeWiseButtons;
