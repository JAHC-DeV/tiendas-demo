export class ProductModel {
    public id: number;
    public sku: string;
    public name: string;
    public link: string;
    public imgUrl: string;
    public price: Number;
    public desciption: string;
    public category: string;
    constructor(data?: {
        id: number;
        sku: string;
        name: string;
        link: string;
        imgUrl: string;
        price: number;
        desciption: string;
        category: string;
    }) {
        if (data) {
            this.id = data.id;
            this.sku = data.sku;
            this.name = data.name;
            this.link = data.link;
            this.imgUrl = data.imgUrl;
            this.price = data.price;
            this.desciption = data.desciption;
            this.category = data.category;
        }
    }

    static async GetModel(product: any): Promise<ProductModel> {
        let category = product.Subcategory?.SubcategoryDescription;
        category = category?.replaceAll(" ", "")
        const sku = product.ParentItem == null ? product.Item : product.ParentItem;
        return new ProductModel({
            id: product.id,
            sku: sku,
            name: product.Description.Title,
            link: "https://www.newegg.com/p/" + sku,
            imgUrl: "https://c1.neweggimages.com/ProductImageCompressAll300/" + product.NewImage.ImageName,
            price: product.FinalPrice,
            desciption: product.Description.BulletDescription,
            category: category,
        })
    }

    static async GetArrayModel(products: any): Promise<Array<ProductModel>> {
        let produtcsDto: Array<ProductModel> = await products.map(item => {
            let category = item.ItemInfo.Subcategory.SubcategoryDescription;
            category = category.replaceAll(" ", "")
            return new ProductModel({
                id: item.id,
                sku: item.ItemInfo.Item,
                name: item.ItemInfo.Description.Title,
                link: "https://www.newegg.com/p/" + item.ItemInfo.Item,
                imgUrl: "https://c1.neweggimages.com/ProductImageCompressAll300/" + item.ItemInfo.Image.ItemCellImageName,
                price: item.ItemInfo.FinalPrice,
                desciption: item.ItemInfo.Description.BulletDescription,
                category: category,
            });
        })
        return produtcsDto;
    }
}