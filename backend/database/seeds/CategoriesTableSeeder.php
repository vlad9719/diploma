<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\Brand;

/**
 * Class CategoriesTableSeeder
 */
class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @throws Exception
     */
    public function run()
    {
        $mazCategories = include 'datasources/categories/MazCategories.php';
        $gazCategories = include 'datasources/categories/GazCategories.php';
        $mtzCategories = include 'datasources/categories/MtzCategories.php';
        $kamazCategories = include 'datasources/categories/KamazCategories.php';
        $zilCategories = include 'datasources/categories/ZilCategories.php';
        $otherCategories = include 'datasources/categories/OtherCategories.php';

        $allCategories = array_merge($mazCategories,
            $gazCategories,
            $mtzCategories,
            $kamazCategories,
            $zilCategories,
            $otherCategories);

        foreach ($allCategories as $category) {
            try {
                $newCategory = new Category();
                $newCategory->name = $category['name'];

                if (isset($category['catalog_number'])) {
                    $newCategory->catalog_number = $category['catalog_number'];
                }

                $brand = Brand::firstOrCreate([
                    'name' => $category['brand'],
                ]);
                $newCategory->brands()->associate($brand);

                $newCategory->save();
            } catch (Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }
    }
}
