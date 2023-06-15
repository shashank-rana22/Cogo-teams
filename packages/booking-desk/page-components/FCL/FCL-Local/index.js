import RenderList from '../../../commons/RenderList';

import Card from './Card';

export default function FclLocal({ tabs = [] }) {
	return <RenderList tabs={tabs} Card={Card} apiPrefix="fcl_local" />;
}
