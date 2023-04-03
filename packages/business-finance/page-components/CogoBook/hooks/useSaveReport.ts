import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

import { entityMappingData } from '../P&L/PLStatement/constant';

const useSaveReport = ({
	setModalData,
	fclExportVolumePer,
	fclImportVolumePer,
	lclExportVolumePer,
	lclImportVolumePer,
	oceanCustomVolumePer,
	airExportVolumePer,
	airImportVolumePer,
	airCustomVolumePer,
	FTLVolumePer,
	LTLVolumePer,
	railVolumePer,
	fclExportValuePer,
	fclImportValuePer,
	lclExportValuePer,
	lclImportValuePer,
	oceanCustomValuePer,
	airExportValuePer,
	airImportValuePer,
	airCustomValuePer,
	FTLValuePer,
	LTLValuePer,
	railValuePer,
	totalVolumePer,
	totalPer,
	totalPerSurface,
	totalPerRail,
	totalPerOcean,
	totalPerAir,
	totalPerValueSurface,
	totalPerRailValue,
}) => {
	const { query, push } = useRouter();
	const { month, entity, id } = query || {};

	const { profile } = useSelector((state) => state || {});

	const [
		{ data, loading:turnoverLoading },
		turnoverTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/turnover-ratios',
			method  : 'post',
			authKey : 'post_pnl_statement_turnover_ratios',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			const res =	await turnoverTrigger({
				data: [
					{
						ratioBasis           : 'VALUE',
						cogoEntityId         : entityMappingData[entity],
						period               : month,
						sourceFileId         : id,
						turnoverRatioDetails : {
							rail         : totalPerRailValue / 100,
							air          : totalPerAir / 100,
							ocean        : totalPerOcean / 100,
							surface      : totalPerValueSurface / 100,
							fclExports   : fclExportValuePer / 100,
							fclImports   : fclImportValuePer / 100,
							lclExports   : lclExportValuePer / 100,
							lclImports   : lclImportValuePer / 100,
							oceanCustoms : oceanCustomValuePer / 100,
							airExports   : airExportValuePer / 100,
							airImports   : airImportValuePer / 100,
							airCustoms   : airCustomValuePer / 100,
							ftl          : FTLValuePer / 100,
							ltl          : LTLValuePer / 100,
							railDomestic : railValuePer / 100,
						},
						createdBy : profile.partner?.id,
						updatedBy : profile?.user?.id,
					},
					{
						ratioBasis           : 'VOLUME',
						cogoEntityId         : entityMappingData[entity],
						period               : month,
						sourceFileId         : id,
						turnoverRatioDetails : {
							rail         : totalPerRail / 100,
							air          : totalPer / 100,
							ocean        : totalVolumePer / 100,
							surface      : totalPerSurface / 100,
							fclExports   : fclExportVolumePer / 100,
							fclImports   : fclImportVolumePer / 100,
							lclExports   : lclExportVolumePer / 100,
							lclImports   : lclImportVolumePer / 100,
							oceanCustoms : oceanCustomVolumePer / 100,
							airExports   : airExportVolumePer / 100,
							airImports   : airImportVolumePer / 100,
							airCustoms   : airCustomVolumePer / 100,
							ftl          : FTLVolumePer / 100,
							ltl          : LTLVolumePer / 100,
							railDomestic : railVolumePer / 100,
						},
						createdBy : profile.partner?.id,
						updatedBy : profile?.user?.id,
					},
				],
			});
			if (res.data) {
				push(
					'/business-finance/cogo-book/[active_tab]/[view]',
					'/business-finance/cogo-book/pl_statement/source_file',
				);
				setModalData(false);
			}
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [FTLValuePer, FTLVolumePer, LTLValuePer, LTLVolumePer, airCustomValuePer,
		airCustomVolumePer, airExportValuePer, airExportVolumePer, airImportValuePer, airImportVolumePer,
		entity, fclExportValuePer, fclExportVolumePer, fclImportValuePer, fclImportVolumePer, id,
		lclExportValuePer, lclExportVolumePer, lclImportValuePer, lclImportVolumePer, month,
		oceanCustomValuePer, oceanCustomVolumePer, profile.partner?.id, profile?.user?.id, push,
		railValuePer, railVolumePer, setModalData, totalPer, totalPerAir, totalPerOcean, totalPerRail,
		totalPerRailValue, totalPerSurface, totalPerValueSurface, totalVolumePer, turnoverTrigger]);

	return {
		refetch,
		turnoverData: data?.data,
		turnoverLoading,
	};
};
export default useSaveReport;
