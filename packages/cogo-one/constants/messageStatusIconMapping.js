import { IcMTick, IcMDoubleTick, IcMInfo } from '@cogoport/icons-react';

const MESSAGE_STATUS_ICON_MAPPING = {
	delivered : <IcMDoubleTick fill="#828282" width="15px" height="15px" />,
	sent      : <IcMTick fill="#828282" width="15px" height="15px" />,
	read      : <IcMDoubleTick fill="#0000FF" width="15px" height="15px" />,
	seen      : <IcMDoubleTick fill="#0000FF" width="15px" height="15px" />,
	failed    : <IcMInfo fill="#BF291E" width="12px" height="12px" />,
};

export default MESSAGE_STATUS_ICON_MAPPING;
