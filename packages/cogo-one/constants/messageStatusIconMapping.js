import { IcMTick, IcMDoubleTick } from '@cogoport/icons-react';

import FailedTooltip from '../common/FailedTooltip';

const MESSAGE_STATUS_ICON_MAPPING = {
	delivered : <IcMDoubleTick fill="#828282" width="15px" height="15px" />,
	sent      : <IcMTick fill="#828282" width="15px" height="15px" />,
	read      : <IcMDoubleTick fill="#0000FF" width="15px" height="15px" />,
	seen      : <IcMDoubleTick fill="#0000FF" width="15px" height="15px" />,
	failed    : <FailedTooltip />,
};

export default MESSAGE_STATUS_ICON_MAPPING;
