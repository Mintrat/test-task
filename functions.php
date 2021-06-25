<?php
$folder = 'lorem_ipsum';
$list = [
    'ru.txt',
    'en.txt',
    'arab.txt'
];

function countPopularWords(String $text) {
    $reg = '/\w+/u';
    preg_match_all($reg, $text, $matches);
    $countedWords = array_count_values($matches[0]);
    arsort($countedWords);
    return array_slice($countedWords, 0, 5);
}

foreach ($list as $item) {
    $path = '.'.DIRECTORY_SEPARATOR.$folder.DIRECTORY_SEPARATOR.$item;
    $text = file_get_contents($path);
    echo '<pre>';
    print_r(countPopularWords($text));
    echo '</pre>';
}