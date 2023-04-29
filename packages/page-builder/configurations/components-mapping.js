/* eslint-disable import/no-cycle */
import ButtonComponent from '../commons/widgets/ButtonComponent';
import CarouselComponent from '../commons/widgets/CarouselComponent';
import DividerComponent from '../commons/widgets/DividerComponent';
import FormComponent from '../commons/widgets/FormComponent';
import HtmlComponent from '../commons/widgets/HtmlComponent';
import ImageComponent from '../commons/widgets/ImageComponent';
import TextComponent from '../commons/widgets/TextComponent';
import VideoComponent from '../commons/widgets/VideoComponent';

const COMPONENT_MAPPING = {
	text     : TextComponent,
	button   : ButtonComponent,
	image    : ImageComponent,
	video    : VideoComponent,
	html     : HtmlComponent,
	form     : FormComponent,
	carousel : CarouselComponent,
	divider  : DividerComponent,
};

export default COMPONENT_MAPPING;
