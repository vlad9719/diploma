<?php

use Illuminate\Database\Seeder;
use App\Models\Brand;
use Illuminate\Support\Facades\DB;

/**
 * Class BrandsTableSeeder
 */
class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds
     *
     * @throws Exception
     */
    public function run()
    {
        $brands = include 'datasources/Brands.php';

        foreach ($brands as $brand) {
            try {
                $newBrand = new Brand();
                $newBrand->fill($brand);
                $newBrand->save();
                DB::commit();
            } catch (Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }
    }
}
