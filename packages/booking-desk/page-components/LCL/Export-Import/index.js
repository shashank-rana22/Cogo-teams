import RenderList from '../../../commons/RenderList';

import Card from './Card';

export default function LclExportImport({ tabs = [] }) {
	return <RenderList tabs={tabs} Card={Card} apiPrefix="lcl_freight" />;
}
