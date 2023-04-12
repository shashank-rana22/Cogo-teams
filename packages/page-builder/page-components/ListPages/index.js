import { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

function ListPages() {
	const [state, setState] = useState({
		width  : 500,
		height : 200,
	});

	const onResize = (event, { element, size }) => {
		setState({ width: size.width, height: size.height });
	  };

	const { width, height } = state || {};
	return (
		<div>
			<Resizable
				className="box"
				axis="both"
				minConstraints={[200, 200]}
				height={height}
				width={width}
				onResize={onResize}
			>
				<div
					className="box"
					style={{
						width           : `${width}px`,
						height          : `${height}px`,
						backgroundColor : 'lightblue',
					}}
				>
					<span className="text">hello</span>
				</div>
			</Resizable>
		</div>
	);
}
export default ListPages;
