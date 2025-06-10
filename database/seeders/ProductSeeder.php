<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                "name" => "Eleganckie Skarpetki",
                "description" => "Uzupełnij swój formalny strój naszymi **eleganckimi skarpetkami**, zaprojektowanymi z myślą o najwyższym komforcie i subtelnym stylu. Wykonane z wysokiej jakości materiałów, zapewniają idealne dopasowanie i dyskretny wygląd, który dopełni każdą stylizację. Dostępne w klasycznych kolorach, są niezbędnym elementem garderoby każdego dżentelmena, dbającego o detale.",
                "price" => 49.99,
                "category_id" => 2
            ],
            [
                "name" => "Eleganckie Buty",
                "description" => "Nasze **eleganckie buty** to kwintesencja klasy i wygody. Ręcznie wykonane z najwyższej jakości skóry, łączą tradycyjne rzemiosło z nowoczesnym designem. Idealne na specjalne okazje, spotkania biznesowe czy wieczorne wyjścia. Zapewniają nie tylko nienaganny wygląd, ale także komfort noszenia przez cały dzień. Wybierz swój model i poczuj różnicę.",
                "price" => 499.00,
                "category_id" => 2
            ],
            [
                "name" => "Krawat",
                "description" => "Dodaj szyku swojej stylizacji dzięki naszemu **krawatowi**, który jest synonimem elegancji. Wykonany z luksusowego jedwabiu, dostępny w szerokiej gamie wzorów i kolorów, aby idealnie dopasować się do Twojej koszuli i marynarki. Krawat to nie tylko dodatek, ale wyraz Twojego indywidualnego stylu. Podkreśl swoją prezencję, wybierając krawat, który mówi o Tobie najwięcej.",
                "price" => 129.50,
                "category_id" => 2
            ],
            [
                "name" => "Muszka",
                "description" => "Nasza **muszka** to idealny wybór dla tych, którzy cenią sobie klasyczną elegancję z odrobiną nonszalancji. Wykonana z najwyższej jakości tkanin, dostępna w różnych wariantach – od klasycznej czerni po wzorzyste propozycje. Muszka to idealny dodatek na wieczorne gale, uroczystości czy spotkania, które wymagają wyjątkowego wyglądu.",
                "price" => 89.00,
                "category_id" => 2
            ],
            [
                "name" => "Marynarka",
                "description" => "Nasza **marynarka** to podstawa każdej eleganckiej stylizacji. Wykonana z dbałością o każdy detal, z wysokiej jakości wełny, idealnie dopasowuje się do sylwetki. Klasyczny krój, staranne wykończenia i ponadczasowy design sprawiają, że nasza marynarka to inwestycja w Twój wygląd na lata. Idealna do garnituru, jak i w zestawie z chinosami czy jeansami.",
                "price" => 799.00,
                "category_id" => 1
            ],
            [
                "name" => "Spodnie",
                "description" => "Stwórz perfekcyjny garnitur z naszymi **spodniami**, które łączą w sobie komfort i nienaganny styl. Wykonane z wysokiej jakości tkanin, zapewniają doskonałe dopasowanie i swobodę ruchów. Dostępne w różnych krojach i kolorach, by idealnie pasować do Twojej marynarki i okazji. Nasze spodnie to fundament eleganckiej garderoby.",
                "price" => 349.99,
                "category_id" => 1
            ],
            [
                "name" => "Koszula",
                "description" => "Nasza **koszula** to niezbędny element formalnego stroju, który łączy w sobie elegancję i wygodę. Wykonana z najwyższej jakości bawełny, zapewnia komfort noszenia przez cały dzień. Klasyczne kroje, staranne szycie i szeroka gama kolorów sprawiają, że nasza koszula jest idealna na każdą okazję – od spotkań biznesowych po uroczystości rodzinne. Wybierz koszulę, która podkreśli Twój indywidualny styl.",
                "price" => 229.00,
                "category_id" => 1
            ]
        ]);
    }
}
