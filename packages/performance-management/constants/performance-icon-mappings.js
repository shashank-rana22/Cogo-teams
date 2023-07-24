import { IcCStar, IcMArrowDoubleDown, IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';

const performanceIcons = {
	below_expectations   : <IcMArrowDoubleDown height={20} width={20} fill="#ee3425" />,
	needs_improvement    : <IcMArrowDown height={20} width={20} fill="#f68b21" />,
	meets_expectations   : <div style={{ fontSize: '20px', fontWeight: '700', color: '#88cad1' }}>C</div>,
	exceeds_expectations : <IcMArrowUp height={20} width={20} fill="#abcd62" />,
	outstanding          : <IcCStar height={20} width={20} fill="#fcdc00" />,
};

export default performanceIcons;
