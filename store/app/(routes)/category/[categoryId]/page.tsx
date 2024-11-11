import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";

export const revalidate = 0;

type Params = Promise<{ categoryId: string }>
type SearchParams = Promise<{ colorId: string, sizeId: string }>

const CategoryPage = async ({ params, searchParams }: { params: Params, searchParams: SearchParams }) => {
    const { categoryId } = await params;
    const { colorId, sizeId } = await searchParams;
    const products = await getProducts({ categoryId: categoryId, colorId: colorId, sizeId: sizeId })
    const sizes = await getSizes();
    const colors = await getColors();
    const category = await getCategory(categoryId)
    console.log(category);
    return ( 
        <div className="bg-white">
            <Container>
                <Billboard data={category?.billboard} />
                <div className="px-4 pb-24 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        {/*Add Mobile Filters*/}
                        <MobileFilters sizes={sizes} colors={colors} />
                        {/*Add Computer Filters*/}
                        <div className="hidden lg:block">
                            <Filter
                                valueKey="sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                            <Filter
                                valueKey="colorId"
                                name="Colors"
                                data={colors}
                            />
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products?.length === 0 && <NoResults /> }
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {products?.map(item => (
                                    <ProductCard key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CategoryPage;