import { Button } from '@cogoport/components';

const renderButtons = (
	{ operationType = '' },
) => {
	switch (operationType) {
		case 'add': {
			return (
				<>
					<Button themeType="secondary">CANCEL</Button>
					<Button>SAVE</Button>
				</>
			);
		}
		case 'edit': {
			return (
				<>
					<Button themeType="secondary">CANCEL</Button>
					<Button>SAVE</Button>
				</>
			);
		}
		case 'deactivate': {
			return (
				<>
					<Button themeType="secondary">NO</Button>
					<Button>YES</Button>
				</>
			);
		}
		default:
			return null;
	}
};
export default renderButtons;
