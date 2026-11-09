// Nama dan deskripsi singkat diambil dari desain Figma.
// Harga, tradisi, diskon, dan teks detail adalah data contoh: periksa dan sesuaikan
// dengan sumber aslimu sebelum dikumpulkan.

export const DUMMY_FLOWERS = [
  {
    id: 1,
    name: 'Cempaka',
    description: 'Bunga dalam sesaji dan tradisi Bali.',
    tradition: 'Bali',
    price: 6000,
    image: require('../../assets/flowers/cempaka.jpg'),
    localNames: 'Cempaka, Campaka',
    scientificName: 'Magnolia champaca',
    meaning:
      'Melambangkan kesucian, penghormatan, dan kemuliaan. Dalam tradisi Bali, cempaka hadir sebagai bagian dari persembahan kepada leluhur dan dewa.',
    energy:
      'Aromanya yang harum dan lembut dipercaya membawa ketenangan serta menghadirkan suasana sakral saat upacara berlangsung.',
    culturalNote:
      'Sering dipakai dalam canang sari dan sesaji upacara adat Bali.',
  },
  {
    id: 2,
    name: 'Melati',
    description: 'Kesucian dalam tradisi pernikahan.',
    tradition: 'Jawa',
    price: 5000,
    discount: 10,
    image: require('../../assets/flowers/melati.jpg'),
    localNames: 'Melati, Menur, Mlati',
    scientificName: 'Jasminum sambac',
    meaning:
      'Melambangkan kesucian, ketulusan, dan kesetiaan. Putihnya bunga menjadi lambang hati yang bersih dan niat yang baik.',
    energy:
      'Wanginya dipercaya menenangkan pikiran dan membawa suasana khidmat, terutama pada momen penting seperti pernikahan.',
    culturalNote:
      'Dirangkai menjadi untaian untuk pengantin dalam adat pernikahan Jawa.',
  },
  {
    id: 3,
    name: 'Kembang Tujuh Rupa',
    description: 'Rangkaian bunga untuk siraman.',
    tradition: 'Jawa',
    price: 15000,
    discount: 20,
    image: require('../../assets/flowers/kembang-tujuh-rupa.jpg'),
    localNames: 'Kembang setaman, Kembang tujuh rupa',
    scientificName: 'Campuran beberapa jenis bunga',
    meaning:
      'Rangkaian tujuh jenis bunga yang melambangkan harapan baik, permohonan keselamatan, dan penyucian diri.',
    energy:
      'Dipercaya menyegarkan dan membersihkan diri secara lahir dan batin sebelum menjalani momen penting.',
    culturalNote:
      'Dipakai dalam upacara siraman dan ritual adat Jawa lainnya.',
  },
  {
    id: 4,
    name: 'Kenanga',
    description: 'Keharuman dalam tradisi Jawa.',
    tradition: 'Jawa',
    price: 4000,
    image: require('../../assets/flowers/kenanga.jpg'),
    localNames: 'Kenanga, Kenanga utan',
    scientificName: 'Cananga odorata',
    meaning:
      'Melambangkan keharuman nama baik dan kenangan. Dalam tradisi Jawa, bunga ini dekat dengan penghormatan kepada leluhur.',
    energy:
      'Aromanya yang kuat dipercaya memberi rasa tenang dan mengundang suasana hening.',
    culturalNote:
      'Sering hadir dalam ritual dan tradisi ziarah di Jawa.',
  },
  {
    id: 5,
    name: 'Sedap Malam',
    description: 'Bunga harum dalam upacara adat.',
    tradition: 'Sunda',
    price: 7000,
    discount: 10,
    image: require('../../assets/flowers/sedap-malam.jpg'),
    localNames: 'Sedap malam, Kembang sedap malam',
    scientificName: 'Polianthes tuberosa',
    meaning:
      'Melambangkan keanggunan dan suasana khidmat. Harumnya yang kuat di malam hari menjadi ciri khasnya.',
    energy:
      'Wanginya dipercaya menghadirkan ketenangan dan nuansa sakral pada upacara yang berlangsung malam hari.',
    culturalNote:
      'Sering dipakai sebagai hiasan dalam upacara adat dan rangkaian bunga.',
  },
];