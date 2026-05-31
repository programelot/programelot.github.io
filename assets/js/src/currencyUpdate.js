function currencyUpdateTraget(){
    let userLang = navigator.language || navigator.userLanguage; 

    let lang = "";
    if(userLang == "ko-KR")
        lang = "kr";
    else
        lang = "en";

    let KRtoENratio = 0;
    {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD", false );
        xmlHttp.send( null );
        let currency = JSON.parse(xmlHttp.response);
        KRtoENratio = 2/(currency[0]["cashBuyingPrice"] + currency[0]["cashSellingPrice"]);
    }

    let ENtoKRratio = 1/KRtoENratio;
    
    let targets = Array.from(document.getElementsByClassName("currencyUpdateTraget"));
    for(let i = 0; i < targets.length; ++i){
        let wholeText = targets[i].innerText;
        
        let textLst = wholeText.split(' ');
        if(textLst[1] == "KRW" && lang != "kr"){
            let currentMoney = textLst[0].replaceAll(',','');
            textLst[0]  = Math.ceil(currentMoney * KRtoENratio).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            textLst[1] = "USD";
            targets[i].innerText = targets[i].innerText  + " (about " + textLst.join(' ') + ")";
        }
        else if(textLst[1] == "USD" && lang != "en"){
            let currentMoney = textLst[0].replaceAll(',','');
            textLst[0]  = Math.ceil(currentMoney * ENtoKRratio).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            textLst[1] = "KRW";
            targets[i].innerText = targets[i].innerText  + " (about " +  textLst.join(' ') + ")";
        }
    }
}

currencyUpdateTraget();
