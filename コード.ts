type product = Record<"productId" | "name" | "brandName", string>;
type category = Record<"categoryCode" | "categoryName", string>;
type prodCategory = Record<"productId" | "categoryCode", string>;

type stock = {
    skuCode: string;
    productId: string;
    color: string;
    size: string;
    stock: number;
};

function myFunction() {
    // スプレッドシートのファイル指定
    const sheet: GoogleAppsScript.Spreadsheet.Spreadsheet = SpreadsheetApp.openById("1yr5W67RsjoES2hu_ACoLBJfw-DwAqjyidGb8h0x9Ufg");

    // シートの値を取得する関数
    const getSheet = (sheetName: string) => {
        return sheet.getSheetByName(sheetName).getDataRange().getValues();
    }

    // シートのタブ名を取得する関数
    const getTabNames = () => {
        const tabNames = [];
        const spreadSheet = sheet.getSheets()
        for (let i = 0; i < spreadSheet.length; i++) {
            const tabName = spreadSheet[i].getName();
            tabNames.push(tabName)
        }
        console.log("タブ名一覧",tabNames)
    }

    //共通関数: ヘッダーと分離する
    const separateData = <T>(array: T[][]) => {
        const [headers, ...records] = array;
        return { headers, records };
    };
}