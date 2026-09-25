from typing import Dict, Any


class AgroTranslationService:
    """
    Translates standard ICAR/IMD agro-meteorological advisories into
    Hindi (हिन्दी), Punjabi (ਪੰਜਾਬੀ), Marathi (मराठी), and Gujarati (ગુજરાતી).
    """

    TRANSLATIONS: Dict[str, Dict[str, str]] = {
        "hi": {
            "irrigation_high": "मृदा वाष्पीकरण अधिक है। {crop} की फसल में सुबह या शाम के समय हल्की सिंचाई करें।",
            "drainage_warning": "भारी वर्षा का अनुमान है। {crop} के खेतों में जलजमाव रोकने हेतु जल निकासी नालियों को तुरंत साफ करें।",
            "spray_optimal": "{crop} पर कीटनाशक एवं पोषक तत्वों के छिड़काव के लिए अनुकूल मौसम है। हवा की गति सामान्य है।",
            "spray_deferred": "तेज हवा ({wind} किमी/घंटा) अथवा वर्षा की संभावना के कारण रासायनिक छिड़काव स्थगित रखें।"
        },
        "pa": {
            "irrigation_high": "ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ਦੀ ਕਮੀ ਹੈ। {crop} ਦੀ ਫ਼ਸਲ ਨੂੰ ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਹਲਕਾ ਪਾਣੀ ਲਗਾਓ।",
            "drainage_warning": "ਭਾਰੀ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। {crop} ਦੇ ਖੇਤਾਂ ਵਿੱਚੋਂ ਪਾਣੀ ਦੇ ਨਿਕਾਸ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ।",
            "spray_optimal": "{crop} ਉੱਤੇ ਸਪਰੇਅ ਕਰਨ ਲਈ ਮੌਸਮ ਅਨੁਕੂਲ ਹੈ। ਹਵਾ ਦੀ ਰਫ਼ਤਾਰ ਸ਼ਾਂਤ ਹੈ।",
            "spray_deferred": "ਤੇਜ਼ ਹਵਾ ({wind} ਕਿਲੋਮੀਟਰ/ਘੰਟਾ) ਕਾਰਨ ਸਪਰੇਅ ਦਾ ਕੰਮ ਮੁਲਤਵੀ ਰੱਖੋ।"
        },
        "mr": {
            "irrigation_high": "जमिनीतील ओलावा कमी होत आहे. {crop} पिकाला सकाळच्या किंवा संध्याकाळच्या वेळी हलके पाणी द्यावे.",
            "drainage_warning": "मुसळधार पावसाचा अंदाज आहे. {crop} शेतात पाणी साचू नये म्हणून चर काढून निचरा करावा.",
            "spray_optimal": "{crop} पिकावर फवारणीसाठी हवामान अनुकूल आहे. वाऱ्याचा वेग शांत आहे.",
            "spray_deferred": "जोरदार वाऱ्यामुळे ({wind} किमी/तास) रासायनिक फवारणी तात्पुरती पुढे ढकलावी."
        },
        "gu": {
            "irrigation_high": "જમીનમાં ભેજનું પ્રમાણ ઘટી રહ્યું છે. {crop} પાકમાં સવારે અથવા સાંજે હળવું પિયત આપવું.",
            "drainage_warning": "ભારે વરસાદની શક્યતા છે. {crop} પાકમાં પાણી ભરાઈ ન રહે તે માટે નિકાલની વ્યવસ્થા કરવી.",
            "spray_optimal": "{crop} પાક પર છંટકાવ માટે હવામાન અનુકૂળ છે. પવનની ગતિ સામાન્ય છે.",
            "spray_deferred": "ઝડપી પવન ({wind} કિમી/કલાક) ના કારણે દવાનો છંટકાવ મોકૂફ રાખવો."
        }
    }

    @classmethod
    def translate_bulletin(cls, key: str, lang: str, crop: str, wind: float = 0.0) -> str:
        lang_key = lang.lower().strip()
        if lang_key in cls.TRANSLATIONS and key in cls.TRANSLATIONS[lang_key]:
            template = cls.TRANSLATIONS[lang_key][key]
            return template.format(crop=crop, wind=wind)
        
        # English fallback
        english_templates = {
            "irrigation_high": f"Soil evapotranspiration is elevated. Apply light sprinkler or furrow irrigation during morning or evening hours for {crop}.",
            "drainage_warning": f"Heavy rainfall forecast detected. Ensure field drainage channels are clear to prevent water stagnation in {crop} roots.",
            "spray_optimal": f"Favorable conditions for foliar nutrient sprays and biological insecticides on {crop}. Wind speeds are below threshold.",
            "spray_deferred": f"Avoid chemical spray operations due to active wind drift ({wind} km/h) or precipitation risk."
        }
        return english_templates.get(key, "Maintain regular crop monitoring.")


translation_service = AgroTranslationService()
