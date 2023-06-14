import RenderList from '../../../commons/RenderList';

import Card from './Card';

export default function FclExportImport({ tabs = [] }) {
	return <RenderList Card={Card} tabs={tabs} apiPrefix="fcl_freight" />;
}
