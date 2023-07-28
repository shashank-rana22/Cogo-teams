import { Button } from '@cogoport/components';

function ModeWiseButtons(props) {
	const {
		mode,
		onCreate = () => {},
		createLoading = false,
		createDisabled = true,
	} = props;

	const MODE_BASIS_BUTTON_MAPPING = {
		create: (
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
		edit: (
			<>
				<Button
					size="lg"
					type="button"
					themeType="tertiary"
					style={{ marginRight: '12px' }}
				>
					Equally Distribute
				</Button>

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
				>
					Duplicate & Send For Verification
				</Button>
			</>
		),
	};

	return MODE_BASIS_BUTTON_MAPPING[mode] || null;
}

export default ModeWiseButtons;
