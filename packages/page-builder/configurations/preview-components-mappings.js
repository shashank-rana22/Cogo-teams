import ButtonComponent from '../commons/ComponentsDropPreview/widgets/ButtonComponent';
import CardComponent from '../commons/ComponentsDropPreview/widgets/CardComponent';
import CarouselComponent from '../commons/ComponentsDropPreview/widgets/CarouselComponent';
import DefaultComponent from '../commons/ComponentsDropPreview/widgets/DefaultComponent';
import DividerComponent from '../commons/ComponentsDropPreview/widgets/DividerComponent';
import FormComponent from '../commons/ComponentsDropPreview/widgets/FormComponent';
import HtmlComponent from '../commons/ComponentsDropPreview/widgets/HtmlComponent';
import ImageComponent from '../commons/ComponentsDropPreview/widgets/ImageComponent';
import TextComponent from '../commons/ComponentsDropPreview/widgets/TextComponent';
import VideoComponent from '../commons/ComponentsDropPreview/widgets/VideoComponent';

const PREVIEW_COMPONENT_MAPPING = {
	text           : TextComponent,
	button         : ButtonComponent,
	image          : ImageComponent,
	video          : VideoComponent,
	html           : HtmlComponent,
	form           : FormComponent,
	carousel       : CarouselComponent,
	divider        : DividerComponent,
	carouselSample : CarouselComponent,
	videoSample    : VideoComponent,
	default        : DefaultComponent,
	container      : DefaultComponent,
	card           : CardComponent,
	formSample     : FormComponent,
};

export default PREVIEW_COMPONENT_MAPPING;
