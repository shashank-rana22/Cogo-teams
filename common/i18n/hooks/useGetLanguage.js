import {useSelector} from "@cogoport/store"
import languageMappings from "../configurations/language-mappings.json"

const useGetLanguage=()=>{
    const {profile,general}=useSelector(state=>state)

    const { preferred_languages } = profile?.organization || {};
    const { language } = general || {};

    if(language){
        return languageMappings[language]?.key || 'en-UK'
    }

    if((preferred_languages || []).length > 0){
        return languageMappings[preferred_languages[0]]?.key || 'en-UK'
    }

    return 'en-UK'

}

export default useGetLanguage