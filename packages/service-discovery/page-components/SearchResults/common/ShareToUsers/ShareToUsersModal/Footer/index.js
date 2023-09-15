import { Button } from '@cogoport/components';

function ModalContent({ loading = false, onClick = () => {}, modalType = '' }) {
	return (
		<div>
			<Button disabled={loading} onClick={onClick} size="md" themeType="accent">
				{modalType === 'select_user'
					? 'Share'
					: 'Invite'}
			</Button>
		</div>
	);
}

export default ModalContent;
