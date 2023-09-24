module.exports = async function getCategories() {
    const data = await fetch("https://www.newegg.com/api/RolloverMenu?CountryCode=USA&from=www.newegg.com", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Microsoft Edge\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "Referer": "https://www.newegg.com/",
            "Referrer-Policy": "unsafe-url"
        },
        "body": null,
        "method": "GET"
    });

    const json = await data.json();
    // console.log(json.RollOverMenu);
    return json.RollOverMenu;
}

module.exports = async function getSubCategories(id) {
    const data = await fetch("https://www.newegg.com/api/RolloverMenu?CountryCode=USA&from=www.newegg.com", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Microsoft Edge\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "NV_MC_FC=Natural|www.bing.com; NV_MC_LC=Natural|www.bing.com; osano_consentmanager_uuid=3bba25ab-d4b2-4a93-888c-c7cd632d1ff0; osano_consentmanager=U-zKMqmbOuduFsRCWaZiuvOCgBaGzJKK0LaLJxOfuaQFzv7xvoI2uoTmCISKR3dLXApT4K20aimuICgjZqtECfbikoNRUWhMjwHCcubWqNUALmyfmKVzXehv95VTOro0sot7JfSe4hXvz4n-_y6JOmce3WHXph72i2fSje7fJ-h9YE7DZZRJwSCYxMKWEuPPfTWX6ITieWxSAYy7gSrRhfxcUw7OX8C4J0kZPSbLm8BFEzX5toW1xoAvaWtMrtuN5vytRci3y56iPAdAv90Zf9l7m14Np-wE9NusyQ==; NV%5FW57=USA; NV%5FW62=en; _gcl_au=1.1.160400365.1693454758; _gid=GA1.2.1405215788.1693454771; _ce.clock_event=1; _ce.clock_data=1201%2C152.207.211.105%2C1%2C3818c388c9250e9d322146783bafeb30; xyz_cr_100393_et_137==NaN&cr=100393&wegc=&et=137&ap=; _tt_enable_cookie=1; _ttp=vvUe0atkHKgfsy4MlUfI4g8NkSh; cmp_choice=none; cebs=1; _ce.s=v~edbfa40585347b790efc1c490b0c51d03b73438e~lcw~1693454785060~vpv~1~lcw~1693460404095; __gsas=ID=7dabd9ade7d524bf:T=1693461620:RT=1693461620:S=ALNI_Ma1VPtXgDEzeO3lVmssHDE3UlLTPg; cf_clearance=7zvfpqKUFBH7XXUatazFtdOqJgaRU.9SvPNuJFHQUOQ-1693461625-0-1-664ae1a0.73b063ec.314bbe40-0.2.1693461625; NV_TID_LC=6676; _ga=GA1.2.548989849.1693454764; _uetsid=c0aab47047b311ee889cf3d6e536202b; _uetvid=c0aaf47047b311eeaa34d9210579eb41; cebsp_=6; __gads=ID=c62e23ab7f0f0666:T=1693460410:RT=1693502704:S=ALNI_MaLvtsTbqo_oX_7KxXnfXP6kie7Hg; __gpi=UID=00000c6b9dd9156f:T=1693460410:RT=1693502704:S=ALNI_MYdwZQ_Joo0CT2G03IGS32-ZHORIQ; _ga_TR46GG8HLR=GS1.1.1693513901.4.0.1693513901.0.0.0; NVTC=248326808.0001.fee2df820.1693454728.1693502659.1693513901.6; NID=9D0M9D8O0M2Q729D0M; NE_STC_V1=475ca3dd44857e25c2209f5f107394628b28896637bf5ed72eb2130a68fc0c0f1e0ebac4; NV_NVTCTIMESTAMP=1693513903; NV%5FGAPREVIOUSPAGENAME=home%3AComponents%20%26%20Storage%3Atab; NV%5FCONFIGURATION=#5%7B%22Sites%22%3A%7B%22USA%22%3A%7B%22Values%22%3A%7B%22w58%22%3A%22USD%22%2C%22wd%22%3A1%2C%22w39%22%3A6676%7D%2C%22Exp%22%3A%222557513904%22%7D%7D%7D",
            "Referer": "https://www.newegg.com/Components-Storage/Store/ID-1",
            "Referrer-Policy": "unsafe-url"
        },
        "body": null,
        "method": "GET"
    });
    const json = await data.json();
    console.log(json.RollOverMenu);
    return json.RollOverMenu;
}