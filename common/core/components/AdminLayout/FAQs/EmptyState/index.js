import EmptyIcon from './empty-icon.svg';
import { Container, BottomText } from './styles';

function EmptyState({
	height = 125,
	width = 125,
	bottomText = 'No Data Found',
}) {
	return (
		<Container>
			<EmptyIcon style={{ height, width }} />

			<BottomText>{bottomText}</BottomText>
		</Container>
	);
}

export default EmptyState;
