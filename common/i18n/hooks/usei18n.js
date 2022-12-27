import {useEffect,useState} from "react";
import Countries from "../contants/countries.json"
import useGetCountry from "./useGetCountry";
import useGetLanguage from "./useGetLanguage";
import getCalenderi18n from "../utils/getCalenderi18n";
import keywords from "../configurations/key-words.json"
import locales from "../configurations/locale-strings.json"

const usei18n=()=>{
    const country=useGetCountry()
    const { country_code, currency_code, mobile_country_code } = country;

    const language = useGetLanguage();
	const calendorI18n = getCalenderi18n(language, country_code);

    const defaultCountry = (Countries || []).find(
		(item) => item.country_code === country_code,
	) || { country_code };

    const countryLocales = locales[country_code] || locales.GB;

    const [i18n, setI18n] = useState({
		ln: language,
		date: calendorI18n,
		country_code,
		currency_code: currency_code || 'USD',
		mobile_country_code: mobile_country_code || '+91',
		defaultCountry,
		keywords: keywords[country_code] || keywords.GB || [],
		...countryLocales,
	});
    useEffect(() => {
		setI18n({
			ln: language,
			date: calendorI18n,
			country_code,
			currency_code: currency_code || 'USD',
			mobile_country_code: mobile_country_code || '+91',
			defaultCountry,
			keywords: keywords[country_code] || keywords.GB || [],
			...countryLocales,
		});
	}, [country_code, currency_code, mobile_country_code, language]);

    return i18n
}

export default usei18n