import Body from './Body';
import Header from './Header';

function DetailView({ setShowDetail }) {
	return (
		<div>
			<Header setShowDetail={setShowDetail} />
			<Body />
		</div>
	);
}

export default DetailView;
