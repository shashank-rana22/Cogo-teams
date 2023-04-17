import ButtonComponent from '../../../../commons/widgets/ButtonComponent';
import HtmlComponent from '../../../../commons/widgets/HtmlComponent';
import ImageComponent from '../../../../commons/widgets/ImageComponent';
import TextComponent from '../../../../commons/widgets/TextComponent';
import VideoComponent from '../../../../commons/widgets/VideoComponent';

function RenderComponents({ componentType, widget, components, setComponents, elementId, childId, selectedRow }) {
	const COMPONENT_MAPPING = {
		text: (
			<TextComponent
				key={elementId}
				text={widget.content}
				components={components}
				setComponents={setComponents}
				childId={childId}
				selectedRow={selectedRow}
			/>
		),

		image: (
			<ImageComponent
				key={elementId}
				src={widget.content}
				components={components}
				setComponents={setComponents}
				childId={childId}
				selectedRow={selectedRow}
			/>
		),

		button: (
			<ButtonComponent
				key={elementId}
				label={widget.content}
				themeType={widget.themeType}
				size={widget.size}
				type={widget.type}
				components={components}
				setComponents={setComponents}
				elementId={elementId}
			/>
		),

		video: (
			<VideoComponent
				key={elementId}
				src={widget.content}
				components={components}
				setComponents={setComponents}
				childId={childId}
				selectedRow={selectedRow}
			/>
		),
		html: (
			<HtmlComponent
				key={elementId}
				html={widget.content}
			/>
		),
	};

	return (
		<div style={{ width: '100%', height: '100%', color: '#222' }}>
			{COMPONENT_MAPPING[componentType]}
		</div>
	);
}

export default RenderComponents;
