import { Button } from '@cogoport/components';

import ACTIVE_MODE_KEYS_MAPPING from '../../../../../constants/active-mode-keys-mapping';

const { CREATE, EDIT } = ACTIVE_MODE_KEYS_MAPPING;

function ModeWiseButtons(props) {
	const {
		activeMode,
		onCreate = () => {},
		createLoading = false,
		createDisabled = true,
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
					Equally Distribute & Send For Verification
				</Button>

				<Button
					size="lg"
					type="button"
					themeType="primary"
					onClick={() => onCreate({ distribute_equally: false })}
					loading={createLoading}
					disabled={createDisabled}
				>
					Create Objective & Send For Verification
				</Button>
			</>
		),
		[EDIT]: (
			<>
				{/* <Button
					size="lg"
					type="button"
					themeType="tertiary"
					style={{ marginRight: '12px' }}
				>
					Equally Distribute
				</Button> */}

				<Button
					size="lg"
					type="button"
					themeType="secondary"
					style={{ marginRight: '12px' }}
				>
					Replace & Send For Verification
				</Button>

				<Button
					size="lg"
					type="button"
					themeType="primary"
					loading={createLoading}
					disabled={createDisabled}
					onClick={() => onCreate({ distribute_equally: false })}
				>
					Duplicate & Send For Verification
				</Button>
			</>
		),
	};

	return MODE_BASIS_BUTTON_MAPPING[activeMode] || null;
}

export default ModeWiseButtons;
