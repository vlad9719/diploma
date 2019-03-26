<?php

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use League\Csv\Reader;

/**
 * Class ProductsTableSeeder
 */
class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @throws Exception
     */
    public function run()
    {
        $csv = Reader::createFromPath('database/seeds/datasources/products.csv');
        $csv->setHeaderOffset(0);

        $products = $csv->getRecords();
        foreach ($products as $product) {
            try {
                $newProduct = new Product();
                $newProduct->fill([
                    'name' => $product['name'],
                    'article' => $product['article'],
                    'order_code' => $product['order_code'],
                ]);

                $category = Category::where('name', '=', $product['category'])->first();
                $newProduct->categories()->associate($category);

                $newProduct->save();
            } catch (Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }

    }
}
