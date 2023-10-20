import { Button } from '@cogoport/components';

function ModalContent({ loading = false, onClick = () => {} }) {
	return (
		<Button disabled={loading} onClick={onClick} size="md" themeType="accent">
			Share
		</Button>
	);
}

export default ModalContent;
