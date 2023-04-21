import { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

function ListPages() {
	const [state, setState] = useState({
		width  : 500,
		height : 200,
	});

	const onResize = (_, { size }) => {
		setState({ width: size.width, height: size.height });
	};

	const { width, height } = state || {};

	return (
		<div>
			<Resizable
				axis="both"
				minConstraints={[200, 200]}
				height={height}
				width={width}
				onResize={onResize}
			>
				<div
					style={{
						width           : `${width}px`,
						height          : `${height}px`,
						backgroundColor : 'lightblue',
					}}
				>
					<span>Welcome to Cogo Page Builder 😛🍻</span>
				</div>
			</Resizable>
		</div>
	);
}
export default ListPages;
