import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const TOOLTIP_START_VALUE = 3;

function TooltipContent({ item = [] }) {
	return (
		<div>
			{item.map((tag, i) => {
				if (i >= TOOLTIP_START_VALUE) {
					return (
						<Pill key={tag?.name}>{startCase(tag?.sub_chapter_name)}</Pill>
					);
				}

				return null;
			})}
		</div>
	);
}

export default TooltipContent;
