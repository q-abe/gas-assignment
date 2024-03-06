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

type value = string | number;
type EmptyObject = {
    [key: string]: value;
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
        console.log("タブ名一覧", tabNames)
    }

    //共通関数: ヘッダーと分離する

    const separateData = (array: value[][]) => {
        const [ headers, ...records ] = array;
        const isAllString = headers.every((header): header is string => {
            return typeof header === 'string';
        })
        if (isAllString) {
            return { headers, records };
        }
        throw new Error("header is not string"); //ToDo:どこでエラーかわかるように
    };

    //共通関数: ヘッダーをプロパティ名としてオブジェクトに変換する
    const convertObj = <T extends value>(
        headers: string[],
        records: T[][]
    ): EmptyObject[] => {
        return records.map((record) => {
            const obj: EmptyObject = {};
            headers.forEach((header, index) => {
                obj[header] = record[index];
            });
            return obj;
        });
    };
}
