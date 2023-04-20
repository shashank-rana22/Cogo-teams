import ButtonComponent from '../../../../commons/widgets/ButtonComponent';
import HtmlComponent from '../../../../commons/widgets/HtmlComponent';
import ImageComponent from '../../../../commons/widgets/ImageComponent';
import TextComponent from '../../../../commons/widgets/TextComponent';
import VideoComponent from '../../../../commons/widgets/VideoComponent';

const componentMapping = {
	text   : TextComponent,
	button : ButtonComponent,
	image  : ImageComponent,
	video  : VideoComponent,
	html   : HtmlComponent,
};

function RenderComponents({
	componentType, widget, components, setComponents, elementId, childId, selectedRow, setSelectedItem, index,
}) {
	const componentPropsMapping = {
		text: {
			key   : elementId,
			text  : widget.content,
			style : widget.style,
			components,
			setComponents,
			childId,
			selectedRow,
			elementId,
		},

		image: {
			key : elementId,
			src : widget.content,
			components,
			setComponents,
			childId,
			selectedRow,
		},

		button: {
			key       : elementId,
			label     : widget.content,
			themeType : widget.themeType,
			size      : widget.size,
			type      : widget.type,
			components,
			setComponents,
			elementId,
		},

		video: {
			key : elementId,
			src : widget.content,
			components,
			setComponents,
			childId,
			selectedRow,
		},
		html: {
			key  : elementId,
			html : widget.content,
		},
	};

	const Component = componentMapping[componentType];

	return (
		<div
			role="presentation"
			onClick={() => {
				setSelectedItem({ ...widget, index });
			}}
			style={{ width: '100%', height: '100%', color: '#222' }}
		>
			<Component key={componentType} {...(componentPropsMapping[componentType] || {})} />
		</div>
	);
}

export default RenderComponents;
