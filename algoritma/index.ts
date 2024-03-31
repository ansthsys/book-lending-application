/* eslint-disable prettier/prettier */

/**
 * 1. Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"
 */
function reverseString() {
  const word = Array.from('NEGIE1');
  const number = word.pop();
  const newWord = word.reverse().join('') + number;

  return newWord;
}

/**
 * 2. Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut,
 *    jika ada kata dengan panjang yang sama silahkan ambil salah satu
 *
 * Contoh:
 * const sentence = "Saya sangat senang mengerjakan soal algoritma"
 *
 * longest(sentence)
 * // mengerjakan: 11 character
 */
function longest(sentence) {
  const words = sentence.split(' ').sort((a, b) => b.length - a.length);
  const longestWord = words[0];

  return longestWord;
}

/**
 * 3. Terdapat dua buah array yaitu array INPUT dan array QUERY,
 *    silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT
 *
 * Contoh:
 * INPUT = ['xc', 'dz', 'bbb', 'dz']
 * QUERY = ['bbb', 'ac', 'dz']
 *
 * OUTPUT = [1, 0, 2] karena kata 'bbb' terdapat 1 pada INPUT,
 * kata 'ac' tidak ada pada INPUT, dan kata 'dz' terdapat 2 pada INPUT
 */
function countWordQuery() {
  const input = ['xc', 'dz', 'bbb', 'dz'];
  const query = ['bbb', 'ac', 'dz'];
  const result = query.map((word) => {
    return input.filter((item) => item === word).length;
  });

  return result;
}

/**
 * 4. Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:
 *
 * Contoh:
 * Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
 *
 * diagonal pertama = 1 + 5 + 9 = 15
 * diagonal kedua = 0 + 5 + 7 = 12
 *
 * maka hasilnya adalah 15 - 12 = 3
 */
function matrix() {
  const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const diagonal1 = matrix.reduce((acc, curr, index) => {
    // console.log(acc, curr, index, curr[index]);
    return acc + curr[index];
  }, 0);

  const diagonal2 = matrix.reduce((acc, curr, index) => {
    // console.log(acc, curr, index, curr[index]);
    return acc + curr[curr.length - 1 - index];
  }, 0);

  const result = diagonal1 - diagonal2;

  return result;
}

// Nomor 1
console.log('Nomor 1: ', reverseString());

// Nomor 2
const sentence = 'Saya sangat senang mengerjakan soal algoritma';
console.log('Nomor 2: ', longest(sentence));

// Nomor 3
console.log('Nomor 3: ', countWordQuery());

// Nomor 4
console.log('Nomor 4: ', matrix());
