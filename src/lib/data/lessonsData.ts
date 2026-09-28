import { Lesson, Question } from '../types';

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'kb-1',
    orderNumber: 1,
    slug: 'konsep-laju-reaksi',
    title: 'KB 1: Konsep & Pengertian Laju Reaksi',
    subtitle: 'Perubahan Konsentrasi Zat Terhadap Satuan Waktu',
    description: 'Memahami bagaimana laju reaksi diukur melalui berkurangnya konsentrasi reaktan atau bertambahnya konsentrasi produk tiap satuan detik.',
    duration: '45 Menit',
    simulationType: 'CONCENTRATION_TIME',
    objectives: [
      'Menjelaskan pengertian laju reaksi secara makroskopis dan mikroskopis.',
      'Menghitung laju pengurangan reaktan dan laju pertambahan produk berdasarkan koefisien reaksi.',
      'Menginterpretasikan grafik perubahan konsentrasi terhadap waktu [A] vs t.',
      'Membedakan laju reaksi rata-rata dengan laju reaksi sesaat.'
    ],
    contentBlocks: [
      {
        id: 'b1-intro',
        type: 'heading',
        content: '1. Pengertian Dasar Laju Reaksi'
      },
      {
        id: 'b1-text1',
        type: 'text',
        content: 'Dalam kehidupan sehari-hari, kita mengamati berbagai perubahan kimia yang berlangsung dengan kecepatan berbeda. Kembang api meledak dalam hitungan milidetik, sementara perkaratan besi pada jembatan berlangsung berbulan-bulan hingga bertahun-tahun. Kecepatan berlangsungnya suatu proses kimiawi ini dipelajari dalam cabang kimia yang disebut **Kinetika Kimia**.'
      },
      {
        id: 'b1-callout1',
        type: 'callout',
        content: 'Laju reaksi ($r$ atau $v$) didefinisikan sebagai berkurangnya konsentrasi molar reaktan per satuan waktu, atau bertambahnya konsentrasi molar produk per satuan waktu.',
        metadata: { variant: 'info' }
      },
      {
        id: 'b1-equation1',
        type: 'equation',
        content: 'v = - d[Reaktan] / dt = + d[Produk] / dt  (Satuan: M/s atau mol·L⁻¹·s⁻¹)',
        metadata: { caption: 'Tanda minus menunjukkan berkurangnya reaktan, tanda plus menunjukkan bertambahnya produk.' }
      },
      {
        id: 'b1-heading2',
        type: 'heading',
        content: '2. Hubungan Laju Reaksi dengan Koefisien Reaksi'
      },
      {
        id: 'b1-text2',
        type: 'text',
        content: 'Perbandingan laju perubahan konsentrasi setiap zat dalam reaksi kimia berbanding lurus dengan koefisien stoikiometri masing-masing. Untuk reaksi umum:\n\na A + b B → c C + d D\n\nMaka berlaku kesetaraan laju:\nv = - (1/a)(Δ[A]/Δt) = - (1/b)(Δ[B]/Δt) = + (1/c)(Δ[C]/Δt) = + (1/d)(Δ[D]/Δt)'
      },
      {
        id: 'b1-fill1',
        type: 'fill_blank',
        content: 'Pada penguraian gas N2O5 menjadi NO2 dan O2:\n2 N2O5(g) → 4 NO2(g) + O2(g)\nJika laju pembentukan gas NO2 adalah 0,08 M/s, maka laju pembentukan gas O2 adalah [blank] M/s.',
        metadata: {
          blankId: 'kb1-q1',
          correctAnswer: '0,02',
          acceptableAnswers: ['0.02', '0,02', '0.02 M/s', '0,02 M/s'],
          hint: 'Gunakan perbandingan koefisien: v(O2) = (koef O2 / koef NO2) × v(NO2)'
        }
      },
      {
        id: 'b1-heading3',
        type: 'heading',
        content: '3. Kurva Perubahan Konsentrasi vs Waktu'
      },
      {
        id: 'b1-text3',
        type: 'text',
        content: 'Ketika reaksi berlangsung, kurva reaktan melandai ke bawah (gradien negatif) karena molekul reaktan saling bertumbukan membentuk ikatan baru. Sebaliknya, kurva produk melesat naik dari titik nol. Laju reaksi tertinggi terjadi pada awal reaksi (t = 0), dan semakin menurun seiring menipisnya konsentrasi reaktan.'
      },
      {
        id: 'b1-cta',
        type: 'experiment_cta',
        content: 'Uji pemahaman Anda sekarang di Laboratorium Virtual KINETIX!',
        metadata: {
          experimentType: 'CONCENTRATION_TIME',
          buttonLabel: 'Buka Simulasi Eksperimen Konsentrasi vs Waktu'
        }
      }
    ]
  },
  {
    id: 'kb-2',
    orderNumber: 2,
    slug: 'teori-tumbukan',
    title: 'KB 2: Teori Tumbukan Partikel',
    subtitle: 'Orientasi Spasial & Energi Kinetik Molekul',
    description: 'Menelusuri skala mikroskopis bagaimana partikel-partikel pereaksi harus bertumbukan secara tepat untuk dapat menghasilkan reaksi kimia.',
    duration: '50 Menit',
    simulationType: 'COLLISION_THEORY',
    objectives: [
      'Menjelaskan syarat terjadinya tumbukan efektif (energi yang cukup dan orientasi yang tepat).',
      'Menganalisis mengapa tidak semua tumbukan partikel menghasilkan reaksi kimia.',
      'Menggambarkan interaksi mikroskopis reaktan sebelum, saat, dan sesudah tumbukan.',
      'Mengaitkan frekuensi tumbukan dengan peningkatan laju reaksi.'
    ],
    contentBlocks: [
      {
        id: 'b2-intro',
        type: 'heading',
        content: '1. Mengapa Partikel Harus Bertumbukan?'
      },
      {
        id: 'b2-text1',
        type: 'text',
        content: 'Berdasarkan teori kinetik gas, molekul zat selalu bergerak secara acak dengan kecepatan tertentu. Agar terjadi pemutusan ikatan lama dan pembentukan ikatan baru, molekul pereaksi harus saling bersentuhan atau bertumbukan. Namun, jutaan tumbukan terjadi tiap detik, tetapi hanya sebagian kecil yang berhasil menghasilkan produk reaksi.'
      },
      {
        id: 'b2-callout1',
        type: 'callout',
        content: 'Tumbukan yang menghasilkan zat baru disebut TUMBUKAN EFEKTIF (Effective Collision). Tumbukan ini wajib memenuhi 2 syarat mutlak.',
        metadata: { variant: 'tip' }
      },
      {
        id: 'b2-heading2',
        type: 'heading',
        content: '2. Dua Syarat Utama Tumbukan Efektif'
      },
      {
        id: 'b2-text2',
        type: 'text',
        content: '1. **Orientasi Tumbukan yang Tepat**: Molekul harus bertubrukan dengan sudut dan arah posisi atom reaktif yang sejajar. Jika sudut salah, molekul hanya akan terpental membal tanpa memutus ikatan.\n2. **Energi Kinetik Minimum ($E_k \\ge E_a$)**: Partikel harus memiliki energi kinetik yang melampaui ambang batas Energi Aktivasi untuk merenggangkan dan memutus ikatan kovalen awal.'
      },
      {
        id: 'b2-fill1',
        type: 'fill_blank',
        content: 'Tumbukan antar molekul yang memiliki energi kinetik lebih kecil dari energi aktivasi akan menghasilkan [blank] (pilih: reaksi atau pemantulan kembali).',
        metadata: {
          blankId: 'kb2-q1',
          correctAnswer: 'pemantulan kembali',
          acceptableAnswers: ['pemantulan kembali', 'pemantulan', 'terpental', 'pantulan', 'tidak bereaksi'],
          hint: 'Molekul tidak punya cukup energi untuk menembus penghalang aktivasi.'
        }
      },
      {
        id: 'b2-cta',
        type: 'experiment_cta',
        content: 'Amati simulasi 2D partikel bertumbukan dengan orientasi dan variasi kecepatan.',
        metadata: {
          experimentType: 'COLLISION_THEORY',
          buttonLabel: 'Buka Simulasi Teori Tumbukan 2D'
        }
      }
    ]
  },
  {
    id: 'kb-3',
    orderNumber: 3,
    slug: 'energi-aktivasi',
    title: 'KB 3: Energi Aktivasi & Kompleks Teraktivasi',
    subtitle: 'Rintangan Energi Kimia & Teori Keadaan Transisi',
    description: 'Menganalisis profil diagram energi reaksi, peran penghalang energi aktivasi (Ea), dan bagaimana katalis menyediakan jalur alternatif berenergi rendah.',
    duration: '45 Menit',
    simulationType: 'ACTIVATION_ENERGY',
    objectives: [
      'Mendefinisikan energi aktivasi (Ea) sebagai energi minimum untuk memulai reaksi.',
      'Membaca diagram profil energi untuk reaksi eksoterm dan reaksi endoterm.',
      'Mengidentifikasi struktur keadaan transisi (kompleks teraktivasi).',
      'Menjelaskan mekanisme katalis dalam menurunkan energi aktivasi tanpa ikut habis terkonsumsi.'
    ],
    contentBlocks: [
      {
        id: 'b3-intro',
        type: 'heading',
        content: '1. Konsep Energi Aktivasi (Ea)'
      },
      {
        id: 'b3-text1',
        type: 'text',
        content: 'Kayu kering tidak terbakar secara spontan di udara bebas meskipun oksigen melimpah. Kayu membutuhkan percikan api atau korek untuk memulai pembakaran. Mengapa? Karena molekul selulosa dan oksigen memerlukan "dorongan energi awal" untuk memecah ikatan stabilnya. Energi minimum inilah yang dikenal sebagai **Energi Aktivasi (Ea)**, diusulkan oleh Svante Arrhenius pada tahun 1889.'
      },
      {
        id: 'b3-callout1',
        type: 'callout',
        content: 'Semakin TINGGI nilai Energi Aktivasi (Ea), semakin SEDIKIT fraksi molekul yang mampu melampauinya pada suhu ruang, sehingga laju reaksi berlangsung semakin LAMBAT.',
        metadata: { variant: 'formula' }
      },
      {
        id: 'b3-heading2',
        type: 'heading',
        content: '2. Keadaan Transisi (Kompleks Teraktivasi)'
      },
      {
        id: 'b3-text2',
        type: 'text',
        content: 'Puncak kurva pada diagram koordinat reaksi merupakan wujud spesies yang berumur sangat pendek (fraksi pikodetik) dengan energi potensial tertinggi. Ikatan reaktan sedang dalam kondisi setengah putus, sedangkan ikatan produk baru setengah terbentuk.'
      },
      {
        id: 'b3-fill1',
        type: 'fill_blank',
        content: 'Zat yang mampu mempercepat laju reaksi dengan cara menurunkan nilai energi aktivasi tanpa mengubah nilai perubahan entalpi (ΔH) disebut [blank].',
        metadata: {
          blankId: 'kb3-q1',
          correctAnswer: 'katalis',
          acceptableAnswers: ['katalis', 'katalisator', 'catalyst'],
          hint: 'Zat ini menyediakan jalur mekanisme reaksi alternatif berenergi rendah.'
        }
      },
      {
        id: 'b3-cta',
        type: 'experiment_cta',
        content: 'Eksplorasi bukit energi aktivasi dan amati pengaruh penambahan katalis secara langsung!',
        metadata: {
          experimentType: 'ACTIVATION_ENERGY',
          buttonLabel: 'Buka Simulasi Kurva Energi Aktivasi'
        }
      }
    ]
  },
  {
    id: 'kb-4',
    orderNumber: 4,
    slug: 'faktor-faktor-laju-reaksi',
    title: 'KB 4: Faktor-Faktor yang Mempengaruhi Laju Reaksi',
    subtitle: 'Konsentrasi, Luas Permukaan, Suhu, dan Katalis',
    description: 'Investigasi komprehensif 4 faktor fisik dan kimiawi penentu laju reaksi melalui manipulasi variabel laboratorium virtual.',
    duration: '60 Menit',
    simulationType: 'FACTORS_REACTION',
    objectives: [
      'Menganalisis pengaruh konsentrasi zat pereaksi terhadap frekuensi tumbukan.',
      'Membandingkan laju reaksi zat padat berbentuk kepingan kasar dengan serbuk halus.',
      'Menjelaskan kenaikan suhu terhadap distribusi energi kinetik Boltzmann.',
      'Mengoperasikan simulasi 4 variabel laju reaksi dalam tabung erlenmeyer.'
    ],
    contentBlocks: [
      {
        id: 'b4-intro',
        type: 'heading',
        content: '1. Empat Faktor Penentu Laju Reaksi'
      },
      {
        id: 'b4-text1',
        type: 'text',
        content: 'Secara eksperimental, laju reaksi kimia dapat diatur dan dikontrol melalui modifikasi kondisi sistem:\n\n1. **Konsentrasi Pereaksi**: Meningkatkan kerapatan partikel per volume menyebabkan peluang tumbukan meningkat secara drastis.\n2. **Luas Permukaan Sentuh**: Pada sistem heterogen (misal padat-cair), reaksi hanya terjadi di permukaan. Serbuk memiliki luas kontak jauh lebih besar dibanding bongkahan padat.\n3. **Suhu Sistem**: Menaikkan suhu meningkatkan kecepatan gerak partikel dan memperbesar fraksi molekul yang memiliki energi kinetik $\\ge E_a$. Kenaikan suhu sebesar 10°C umumnya melipatgandakan laju 2 hingga 3 kali lipat.\n4. **Katalis**: Memberikan tapak reaksi alternatif dengan energi aktivasi yang lebih rendah.'
      },
      {
        id: 'b4-callout1',
        type: 'callout',
        content: 'Aturan Empiris Suhu: Jika laju reaksi naik n kali lipat tiap kenaikan ΔT °C, maka: v₂ = v₁ × (n)^((T₂ - T₁) / ΔT)',
        metadata: { variant: 'formula' }
      },
      {
        id: 'b4-fill1',
        type: 'fill_blank',
        content: 'Suatu reaksi berlangsung 3 kali lebih cepat setiap kenaikan suhu 10°C. Jika pada suhu 25°C reaksi memerlukan waktu 54 detik, maka pada suhu 45°C reaksi akan selesai dalam waktu [blank] detik.',
        metadata: {
          blankId: 'kb4-q1',
          correctAnswer: '6',
          acceptableAnswers: ['6', '6 detik', '6 s'],
          hint: 'Kenaikan suhu 20°C (dua kali 10°C) membuat laju menjadi 3² = 9 kali lebih cepat. Waktu t₂ = 54 / 9.'
        }
      },
      {
        id: 'b4-cta',
        type: 'experiment_cta',
        content: 'Masuki lab erlenmeyer interaktif: Atur slider Suhu, Konsentrasi, Luas Permukaan, dan Katalis!',
        metadata: {
          experimentType: 'FACTORS_REACTION',
          buttonLabel: 'Buka Laboratorium Faktor Laju Reaksi'
        }
      }
    ]
  },
  {
    id: 'kb-5',
    orderNumber: 5,
    slug: 'hukum-laju-orde-reaksi',
    title: 'KB 5: Hukum Laju & Orde Reaksi',
    subtitle: 'Persamaan Laju Reaksi & Analisis Data Eksperimen',
    description: 'Menentukan orde reaksi parsial dan total, menghitung nilai konstanta laju reaksi (k), serta membuat grafik kinetika reaksi orde 0, 1, dan 2.',
    duration: '50 Menit',
    simulationType: 'RATE_LAW',
    objectives: [
      'Menuliskan persamaan umum hukum laju reaksi: v = k [A]^m [B]^n.',
      'Menentukan orde reaksi berdasarkan tabel data konsentrasi awal dan laju reaksi.',
      'Menghitung nilai tetapan laju jenis k beserta satuannya yang tepat.',
      'Menganalisis karakteristik grafik waktu paruh untuk orde 0, 1, dan 2.'
    ],
    contentBlocks: [
      {
        id: 'b5-intro',
        type: 'heading',
        content: '1. Persamaan Laju Reaksi'
      },
      {
        id: 'b5-text1',
        type: 'text',
        content: 'Hubungan kuantitatif antara laju reaksi dengan konsentrasi reaktan dinyatakan dalam hukum laju reaksi:\n\nv = k · [A]ᵐ · [B]ⁿ\n\nKeterangan:\n• v = laju reaksi (M/s)\n• k = tetapan jenis laju reaksi (nilainya dipengaruhi oleh suhu dan katalis)\n• [A], [B] = konsentrasi zat pereaksi (M)\n• m, n = orde reaksi (tingkat reaksi) terhadap zat A dan B. Orde reaksi HANYA dapat ditentukan melalui data eksperimen, bukan dari koefisien reaksi setara!'
      },
      {
        id: 'b5-callout1',
        type: 'callout',
        content: 'Karakteristik Orde:\n• Orde 0: Laju konstan tidak bergantung konsentrasi.\n• Orde 1: Laju berbanding lurus linier dengan konsentrasi. Waktu paruh konstan (t½ = 0,693/k).\n• Orde 2: Laju meningkat secara kuadratik (konsentrasi 2x lipat → laju 4x lipat).',
        metadata: { variant: 'info' }
      },
      {
        id: 'b5-fill1',
        type: 'fill_blank',
        content: 'Jika konsentrasi reaktan X dinaikkan menjadi 3 kali lipat dan laju reaksi terukur menjadi 9 kali lebih cepat, maka orde reaksi terhadap reaktan X adalah [blank].',
        metadata: {
          blankId: 'kb5-q1',
          correctAnswer: '2',
          acceptableAnswers: ['2', 'dua', 'orde 2'],
          hint: '3^m = 9, maka nilai m adalah...'
        }
      },
      {
        id: 'b5-cta',
        type: 'experiment_cta',
        content: 'Gunakan kalkulator data kinetika interaktif dan simulator kurva orde reaksi.',
        metadata: {
          experimentType: 'RATE_LAW',
          buttonLabel: 'Buka Simulator Analisis Orde Reaksi'
        }
      }
    ]
  },
  {
    id: 'kb-6',
    orderNumber: 6,
    slug: 'kinetika-kehidupan-industri',
    title: 'KB 6: Kinetika dalam Kehidupan & Industri',
    subtitle: 'Optimasi Proses Haber-Bosch, Katalis Otomotif & Pengawetan',
    description: 'Penerapan nyata prinsip kinetika kimia dalam manufaktur pupuk kimia amonia, konverter katalitik otomotif, pengolahan makanan, dan industri farmasi.',
    duration: '50 Menit',
    simulationType: 'INDUSTRIAL_KINETICS',
    objectives: [
      'Menganalisis kompromi suhu dan tekanan pada proses Haber-Bosch sintesis amonia.',
      'Menjelaskan cara kerja catalytic converter pada knalpot kendaraan dalam mereduksi emisi NOx dan CO.',
      'Menerapkan prinsip pendinginan lemari es dalam memperlambat laju pembusukan makanan.',
      'Merancang solusi rekayasa berbasis laju reaksi untuk problem industri modern.'
    ],
    contentBlocks: [
      {
        id: 'b6-intro',
        type: 'heading',
        content: '1. Kinetika Kimia dalam Sintesis Amonia (Proses Haber-Bosch)'
      },
      {
        id: 'b6-text1',
        type: 'text',
        content: 'Reaksi pembuatan amonia: N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)  (ΔH = -92 kJ/mol)\n\nSecara termodinamika (Prinsip Le Chatelier), reaksi eksoterm ini menghasilkan rendemen amonia tinggi pada suhu rendah. Namun pada suhu rendah, ikatan rangkap tiga N≡N yang luar biasa kuat (energi ikat 941 kJ/mol) memiliki laju pemutusan yang sangat lambat! Di sinilah peran rekayasa kinetika: Fritz Haber dan Carl Bosch menggunakan suhu kompromi (400-450°C), tekanan tinggi (200 atm), dan katalis serbuk besi (Fe) yang dipromosikan dengan K₂O dan Al₂O₃ agar laju pembentukan amonia berlangsung ekonomis dalam waktu cepat.'
      },
      {
        id: 'b6-callout1',
        type: 'callout',
        content: 'Catalytic Converter pada mobil menggunakan kisi-kisi keramik dilapisi platinum (Pt), paladium (Pd), dan rodium (Rh) untuk mengkatalisis penguraian gas berbahaya 2 NO(g) → N₂(g) + O₂(g) dan 2 CO(g) + O₂(g) → 2 CO₂(g) dalam hitungan milidetik.',
        metadata: { variant: 'tip' }
      },
      {
        id: 'b6-fill1',
        type: 'fill_blank',
        content: 'Logam transisi berharga yang sering digunakan sebagai lapisan katalis heterogen pada catalytic converter knalpot kendaraan bermotor adalah [blank] (sebutkan salah satu: Pt, Pd, atau Rh).',
        metadata: {
          blankId: 'kb6-q1',
          correctAnswer: 'platinum',
          acceptableAnswers: ['platinum', 'platina', 'Pt', 'paladium', 'Pd', 'rodium', 'Rh'],
          hint: 'Biasa disebut Platina / Platinum.'
        }
      },
      {
        id: 'b6-cta',
        type: 'experiment_cta',
        content: 'Uji simulator optimasi reaktor industri Haber-Bosch dan emisi knalpot.',
        metadata: {
          experimentType: 'INDUSTRIAL_KINETICS',
          buttonLabel: 'Buka Simulator Kinetika Industri'
        }
      }
    ]
  }
];

// 10 Comprehensive Questions Per KB (Total 60 questions with high pedagogical rigor)
export const QUESTIONS_BANK: Record<string, Question[]> = {
  'kb-1': [
    {
      id: 'kb1-mc-1',
      lessonId: 'kb-1',
      orderIndex: 1,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Satuan standar internasional (SI) yang lazim digunakan untuk menyatakan laju reaksi adalah...',
      options: [
        'A. mol · L⁻¹ · s⁻¹',
        'B. mol · s · L⁻¹',
        'C. L · mol⁻¹ · s⁻¹',
        'D. gram · s⁻¹'
      ],
      correctAnswer: 'A',
      explanation: 'Laju reaksi dinyatakan sebagai perubahan konsentrasi molar (mol/L atau M) tiap satuan waktu (detik atau s), sehingga satuannya M/s atau mol·L⁻¹·s⁻¹.'
    },
    {
      id: 'kb1-mc-2',
      lessonId: 'kb-1',
      orderIndex: 2,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Untuk reaksi: 2 A + B → A₂B, laju pengurangan zat A dibandingkan dengan laju pembentukan zat A₂B adalah...',
      options: [
        'A. Sama besar',
        'B. Dua kali lebih besar',
        'C. Setengah kali lebih besar',
        'D. Empat kali lebih besar'
      ],
      correctAnswer: 'B',
      explanation: 'Sesuai perbandingan koefisien: laju pengurangan zat A = (koefisien A / koefisien A₂B) × laju pembentukan A₂B = (2 / 1) = 2 kali lebih besar.'
    },
    {
      id: 'kb1-mc-3',
      lessonId: 'kb-1',
      orderIndex: 3,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pernyataan berikut yang PALING TEPAT mengenai laju reaksi seiring berjalannya waktu adalah...',
      options: [
        'A. Laju reaksi selalu konstan dari awal hingga akhir reaksi',
        'B. Laju reaksi meningkat seiring berjalannya waktu karena produk bertambah',
        'C. Laju reaksi umumnya menurun seiring berjalannya waktu karena konsentrasi reaktan berkurang',
        'D. Laju reaksi mula-mula nol kemudian naik drastis di akhir reaksi'
      ],
      correctAnswer: 'C',
      explanation: 'Seiring berjalannya waktu reaksi, reaktan bereaksi membentuk produk sehingga konsentrasi pereaksi semakin sedikit. Akibatnya, frekuensi tumbukan menurun dan laju reaksi berkurang.'
    },
    {
      id: 'kb1-mc-4',
      lessonId: 'kb-1',
      orderIndex: 4,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pada reaksi penguraian N₂O₄(g) ⇌ 2 NO₂(g), jika konsentrasi N₂O₄ berkurang dari 0,20 M menjadi 0,10 M dalam waktu 20 detik, maka laju pembentukan NO₂ adalah...',
      options: [
        'A. 0,005 M/s',
        'B. 0,010 M/s',
        'C. 0,020 M/s',
        'D. 0,0025 M/s'
      ],
      correctAnswer: 'B',
      explanation: 'Δ[N₂O₄] = 0,20 - 0,10 = 0,10 M. Laju pengurangan N₂O₄ = 0,10 / 20 = 0,005 M/s. Karena koefisien NO₂ adalah 2 kali koefisien N₂O₄, maka laju pembentukan NO₂ = 2 × 0,005 = 0,010 M/s.'
    },
    {
      id: 'kb1-mc-5',
      lessonId: 'kb-1',
      orderIndex: 5,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Grafik hubungan konsentrasi reaktan terhadap waktu ditandai dengan kurva...',
      options: [
        'A. Garis lurus horizontal sejajar sumbu waktu',
        'B. Kurva melengkung ke atas (gradien positif)',
        'C. Kurva menurun secara eksponensial mendekati nol (gradien negatif)',
        'D. Garis vertikal tegak lurus sumbu konsentrasi'
      ],
      correctAnswer: 'C',
      explanation: 'Konsentrasi reaktan berkurang terhadap waktu dengan laju yang semakin melambat, menghasilkan kurva melengkung menurun dengan gradien bertanda negatif.'
    },
    {
      id: 'kb1-mc-6',
      lessonId: 'kb-1',
      orderIndex: 6,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Perbedaan utama antara laju reaksi sesaat dengan laju reaksi rata-rata adalah...',
      options: [
        'A. Laju reaksi sesaat dihitung pada selang waktu yang sangat panjang',
        'B. Laju reaksi sesaat adalah gradien garis singgung kurva konsentrasi-waktu pada satu titik waktu tertentu (dt → 0)',
        'C. Laju reaksi rata-rata selalu bernilai negatif sedangkan laju sesaat positif',
        'D. Laju reaksi sesaat hanya dapat ditentukan pada reaksi berfase padat'
      ],
      correctAnswer: 'B',
      explanation: 'Laju reaksi sesaat diperoleh dari limit Δt mendekati nol, yang secara grafis merupakan kemiringan (slope) garis singgung kurva konsentrasi vs waktu pada waktu t tertentu.'
    },
    {
      id: 'kb1-mc-7',
      lessonId: 'kb-1',
      orderIndex: 7,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Dalam suatu wadah 2 Liter, 4 mol gas NH₃ terurai membentuk N₂ dan H₂ selama 10 detik. Laju penguraian gas NH₃ adalah...',
      options: [
        'A. 0,2 M/s',
        'B. 0,4 M/s',
        'C. 0,1 M/s',
        'D. 0,8 M/s'
      ],
      correctAnswer: 'A',
      explanation: 'Konsentrasi molar [NH₃] = 4 mol / 2 L = 2 M. Laju penguraian = Δ[NH₃] / Δt = 2 M / 10 s = 0,2 M/s.'
    },
    {
      id: 'kb1-mc-8',
      lessonId: 'kb-1',
      orderIndex: 8,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Manakah di antara peristiwa berikut yang memiliki laju reaksi PALING CEPAT pada kondisi kamar?',
      options: [
        'A. Reaksi pengendapan larutan AgNO₃ dengan larutan NaCl',
        'B. Fermentasi singkong menjadi tapai',
        'C. Pembentukan stalaktit dan stalagmit di gua kapur',
        'D. Perkaratan pagar besi di dekat pantai'
      ],
      correctAnswer: 'A',
      explanation: 'Reaksi ionik dalam larutan seperti pengendapan AgCl (Ag⁺ + Cl⁻ → AgCl(s)) tidak membutuhkan pemutusan ikatan kovalen yang rumit sehingga terjadi seketika (dalam mikrodetik).'
    },
    {
      id: 'kb1-mc-9',
      lessonId: 'kb-1',
      orderIndex: 9,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Jika laju penguraian gas SO₃ adalah v, maka pada reaksi: 2 SO₃(g) → 2 SO₂(g) + O₂(g), laju pembentukan O₂ adalah...',
      options: [
        'A. 2 v',
        'B. 0,5 v',
        'C. v',
        'D. 4 v'
      ],
      correctAnswer: 'B',
      explanation: 'Koefisien O₂ adalah 1 sedangkan SO₃ adalah 2. Berdasarkan perbandingan koefisien: v(O₂) = (1/2) × v(SO₃) = 0,5 v.'
    },
    {
      id: 'kb1-mc-10',
      lessonId: 'kb-1',
      orderIndex: 10,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Besaran yang TIDAK DAPAT digunakan secara langsung untuk memonitor laju reaksi secara visual di laboratorium adalah...',
      options: [
        'A. Volume gas yang tertampung dalam suntikan gas per detik',
        'B. Waktu hilangnya tanda silang akibat terbentuknya endapan belerang',
        'C. Perubahan intensitas warna larutan dengan spektrofotometer',
        'D. Perubahan jumlah total proton di dalam inti atom'
      ],
      correctAnswer: 'D',
      explanation: 'Reaksi kimia biasa hanya melibatkan elektron valensi dan pemutusan/pembentukan ikatan antar atom, jumlah proton di dalam inti tidak berubah.'
    }
  ],
  'kb-2': [
    {
      id: 'kb2-mc-1',
      lessonId: 'kb-2',
      orderIndex: 1,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Dua faktor utama yang menentukan keberhasilan suatu tumbukan efektif adalah...',
      options: [
        'A. Massa molekul dan volume wadah reaksi',
        'B. Orientasi spasial yang tepat dan energi kinetik melampaui Ea',
        'C. Keberadaan medan magnet dan gaya gravitasi bumi',
        'D. Jumlah neutron inti dan wujud zat pelarut'
      ],
      correctAnswer: 'B',
      explanation: 'Teori tumbukan menetapkan bahwa reaksi hanya terjadi jika partikel bertumbukan dengan orientasi posisi atom yang memungkinkan pembentukan ikatan dan energi kinetik $\\ge E_a$.'
    },
    {
      id: 'kb2-mc-2',
      lessonId: 'kb-2',
      orderIndex: 2,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Apa yang terjadi jika dua molekul bertumbukan dengan orientasi yang tepat namun memiliki energi kinetik di bawah Energi Aktivasi (Ek < Ea)?',
      options: [
        'A. Molekul langsung membentuk produk dengan cepat',
        'B. Terjadi reaksi spontan melepaskan energi panas',
        'C. Kedua molekul saling memantul kembali tanpa menghasilkan reaksi kimia',
        'D. Molekul akan melebur menjadi atom tunggal bebas'
      ],
      correctAnswer: 'C',
      explanation: 'Jika energi kinetik belum mencapai ambang batas Ea, elektron-elektron kulit luar partikel akan saling tolak-menolak kuat (gaya tolak elektrostatik) sehingga molekul membal kembali.'
    },
    {
      id: 'kb2-mc-3',
      lessonId: 'kb-2',
      orderIndex: 3,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Faktor orientasi tumbukan berkaitan erat dengan...',
      options: [
        'A. Posisi geometris relatif atom-atom yang akan berikatan saat bersentuhan',
        'B. Arah gerak partikel selalu menuju kutub utara',
        'C. Sudut kemiringan tabung reaksi laboratorium',
        'D. Tingkat keasaman (pH) larutan'
      ],
      correctAnswer: 'A',
      explanation: 'Orientasi spasial memastikan gugus fungsional atau atom yang reaktif saling bertatap muka secara langsung sehingga gaya tarik pembentukan ikatan dapat terjadi.'
    },
    {
      id: 'kb2-mc-4',
      lessonId: 'kb-2',
      orderIndex: 4,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Meningkatkan frekuensi tumbukan per detik dapat dicapai dengan cara...',
      options: [
        'A. Menurunkan suhu dan memperbesar volume wadah',
        'B. Meningkatkan konsentrasi pereaksi atau memperkecil volume wadah gas',
        'C. Mengurangi jumlah partikel dalam sistem',
        'D. Memperbesar ukuran bongkahan zat padat'
      ],
      correctAnswer: 'B',
      explanation: 'Dengan memperbanyak partikel per satuan ruang (konsentrasi lebih tinggi) atau mempersempit ruang gerak (volume diperkecil), peluang partikel berpapasan dan bertumbukan meningkat drastis.'
    },
    {
      id: 'kb2-mc-5',
      lessonId: 'kb-2',
      orderIndex: 5,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Menurut distribusi Maxwell-Boltzmann, peningkatan suhu akan mengakibatkan...',
      options: [
        'A. Nilai energi aktivasi (Ea) menjadi bergeser turun',
        'B. Semua partikel memiliki kecepatan gerak yang identik seragam',
        'C. Puncak kurva bergeser ke kanan dan fraksi molekul berenergi kinetik ≥ Ea meningkat',
        'D. Jumlah molekul total dalam wadah bertambah banyak'
      ],
      correctAnswer: 'C',
      explanation: 'Pemanasan meratakan dan menggeser kurva Maxwell-Boltzmann ke arah energi kinetik yang lebih tinggi, sehingga area di bawah kurva di sebelah kanan garis Ea menjadi jauh lebih luas.'
    },
    {
      id: 'kb2-mc-6',
      lessonId: 'kb-2',
      orderIndex: 6,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pada reaksi gas: NO(g) + O₃(g) → NO₂(g) + O₂(g), orientasi tumbukan efektif terjadi jika...',
      options: [
        'A. Atom nitrogen pada molekul NO menabrak salah satu atom oksigen ujung pada molekul O₃',
        'B. Atom oksigen pada molekul NO menabrak atom oksigen tengah pada O₃',
        'C. Kedua molekul bergerak saling membelakangi',
        'D. Molekul bertumbukan dalam posisi sejajar tanpa kontak atomik'
      ],
      correctAnswer: 'A',
      explanation: 'Atom nitrogen bermuatan parsial positif akan menyerang atom oksigen dari ozon untuk membentuk ikatan kovalen koordinasi baru N-O pada NO₂.'
    },
    {
      id: 'kb2-mc-7',
      lessonId: 'kb-2',
      orderIndex: 7,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Fraksi tumbukan yang efektif dalam suatu reaksi gas pada suhu kamar umumnya bernilai...',
      options: [
        'A. 100% dari semua tumbukan yang terjadi',
        'B. Sekitar 50% dari semua tumbukan',
        'C. Sangat kecil (hanya 1 dari jutaan atau milyaran tumbukan)',
        'D. Nol, gas tidak pernah bereaksi pada suhu kamar'
      ],
      correctAnswer: 'C',
      explanation: 'Hanya sebagian sangat kecil molekul yang secara simultan memiliki orientasi presisi dan energi kinetik melampaui Ea, itulah mengapa reaksi kimia tidak langsung meledak seketika.'
    },
    {
      id: 'kb2-mc-8',
      lessonId: 'kb-2',
      orderIndex: 8,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Hubungan matematis frekuensi tumbukan Z dengan laju reaksi v adalah...',
      options: [
        'A. v berbanding lurus dengan frekuensi tumbukan efektif (v ∝ Z × f × p)',
        'B. v berbanding terbalik dengan frekuensi tumbukan',
        'C. v tidak memiliki korelasi dengan frekuensi partikel',
        'D. v bernilai konstan terlepas dari nilai Z'
      ],
      correctAnswer: 'A',
      explanation: 'Dalam teori tumbukan, laju reaksi = Z (frekuensi tumbukan) × f (fraksi berenergi cukup) × p (faktor sterik orientasi).'
    },
    {
      id: 'kb2-mc-9',
      lessonId: 'kb-2',
      orderIndex: 9,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Mengapa reaksi fasa gas berlangsung lebih cepat jika tekanan sistem ditingkatkan?',
      options: [
        'A. Partikel menjadi kehilangan massa',
        'B. Jarak antarpartikel mengecil sehingga frekuensi tumbukan per satuan waktu meningkat',
        'C. Energi aktivasi menurun akibat gravitasi',
        'D. Nilai entalpi reaksi berubah drastis'
      ],
      correctAnswer: 'B',
      explanation: 'Menaikkan tekanan pada fasa gas sama artinya dengan memperkecil volume, yang meningkatkan konsentrasi molar dan kerapatan tumbukan partikel.'
    },
    {
      id: 'kb2-mc-10',
      lessonId: 'kb-2',
      orderIndex: 10,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Dalam simulasi 2D kinetika, partikel yang bertumbukan namun tidak memiliki energi cukup digambarkan dengan visual...',
      options: [
        'A. Berubah warna menjadi produk lalu berikatan erat',
        'B. Meledak dan lenyap dari layar canvas',
        'C. Memantul elastis kembali ke arah asal tanpa perubahan warna jenis zat',
        'D. Berhenti diam total di tengah tabung'
      ],
      correctAnswer: 'C',
      explanation: 'Tumbukan tidak efektif hanya menghasilkan tumbukan lenting elastis tanpa terjadinya pembentukan spesies produk baru.'
    }
  ],
  'kb-3': [
    {
      id: 'kb3-mc-1',
      lessonId: 'kb-3',
      orderIndex: 1,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Energi Aktivasi (Ea) didefinisikan sebagai...',
      options: [
        'A. Selisih energi antara produk dan reaktan (ΔH)',
        'B. Energi kinetik minimum yang harus dimiliki pereaksi agar dapat menghasilkan reaksi kimia',
        'C. Energi yang dilepaskan ketika ikatan kimia baru terbentuk',
        'D. Total energi panas yang diserap dari lingkungan sekitar'
      ],
      correctAnswer: 'B',
      explanation: 'Ea adalah bukit energi minimum yang harus dilewati molekul reaktan untuk mencapai keadaan transisi yang memungkinkan pembentukan produk.'
    },
    {
      id: 'kb3-mc-2',
      lessonId: 'kb-3',
      orderIndex: 2,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pada diagram profil energi reaksi eksotermik, posisi tingkat energi produk berada...',
      options: [
        'A. Lebih tinggi daripada tingkat energi reaktan (ΔH > 0)',
        'B. Lebih rendah daripada tingkat energi reaktan (ΔH < 0)',
        'C. Sejajar tepat dengan puncak kompleks teraktivasi',
        'D. Sama persis dengan tingkat energi reaktan'
      ],
      correctAnswer: 'B',
      explanation: 'Reaksi eksoterm melepaskan energi panas ke lingkungan sehingga energi potensial produk lebih rendah dibanding reaktan, dengan ΔH bertanda negatif.'
    },
    {
      id: 'kb3-mc-3',
      lessonId: 'kb-3',
      orderIndex: 3,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Bagaimanakah pengaruh penambahan katalis terhadap profil kurva koordinat reaksi?',
      options: [
        'A. Meningkatkan nilai energi aktivasi reaksi maju',
        'B. Mengubah nilai entalpi reaksi (ΔH) menjadi lebih negatif',
        'C. Menurunkan puncak energi aktivasi (Ea) dengan menyediakan mekanisme alternatif',
        'D. Menaikkan energi reaktan sehingga produk lebih stabil'
      ],
      correctAnswer: 'C',
      explanation: 'Katalis menyediakan rute reaksi baru dengan energi aktivasi yang lebih rendah tanpa mengubah posisi awal reaktan maupun posisi akhir produk (ΔH tetap konstan).'
    },
    {
      id: 'kb3-mc-4',
      lessonId: 'kb-3',
      orderIndex: 4,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Spesies kimia yang berada pada puncak diagram energi kinetika disebut...',
      options: [
        'A. Zat antara (Intermediat stabil)',
        'B. Kompleks teraktivasi (Keadaan transisi)',
        'C. Produk sampingan reaksi',
        'D. Inhibitor permanen'
      ],
      correctAnswer: 'B',
      explanation: 'Kompleks teraktivasi adalah konfigurasi partikel pada puncak energi potensial tertinggi dengan ikatan lama yang mulai putus dan ikatan baru yang mulai terbentuk.'
    },
    {
      id: 'kb3-mc-5',
      lessonId: 'kb-3',
      orderIndex: 5,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Berdasarkan persamaan Arrhenius k = A · e^(-Ea / RT), jika nilai Ea semakin besar maka konstanta laju k akan...',
      options: [
        'A. Semakin besar dan laju semakin cepat',
        'B. Semakin kecil dan laju reaksi berlangsung semakin lambat',
        'C. Bernilai konstan tidak berubah',
        'D. Menjadi negatif secara instan'
      ],
      correctAnswer: 'B',
      explanation: 'Karena nilai Ea berada pada eksponen negatif (-Ea/RT), semakin besar Ea maka nilai pangkat negatif semakin besar, yang membuat nilai k mengecil.'
    },
    {
      id: 'kb3-mc-6',
      lessonId: 'kb-3',
      orderIndex: 6,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Suatu reaksi memiliki energi aktivasi reaksi maju sebesar 80 kJ/mol dan ΔH reaksi = -30 kJ/mol. Berapakah energi aktivasi untuk reaksi baliknya?',
      options: [
        'A. 50 kJ/mol',
        'B. 110 kJ/mol',
        'C. 80 kJ/mol',
        'D. -110 kJ/mol'
      ],
      correctAnswer: 'B',
      explanation: 'Ea(balik) = Ea(maju) - ΔH = 80 - (-30) = 80 + 30 = 110 kJ/mol. Reaksi balik harus mendaki bukit dari dasar energi produk yang lebih rendah.'
    },
    {
      id: 'kb3-mc-7',
      lessonId: 'kb-3',
      orderIndex: 7,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Grafik hubungan ln(k) terhadap 1/T pada plot Arrhenius menghasilkan kurva garis lurus dengan kemiringan (slope) sebesar...',
      options: [
        'A. - Ea / R',
        'B. + Ea · R',
        'C. - ΔH / R',
        'D. ln(A)'
      ],
      correctAnswer: 'A',
      explanation: 'Bentuk linear Arrhenius adalah ln(k) = - (Ea / R)(1/T) + ln(A). Slope grafik y terhadap x (1/T) adalah -Ea/R.'
    },
    {
      id: 'kb3-mc-8',
      lessonId: 'kb-3',
      orderIndex: 8,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Biokatalis alami di dalam tubuh makhluk hidup yang menurunkan energi aktivasi reaksi metabolisme adalah...',
      options: [
        'A. Enzim',
        'B. Asam klorida lambung pekat',
        'C. Lemak jenuh',
        'D. Logam merkuri'
      ],
      correctAnswer: 'A',
      explanation: 'Enzim adalah protein katalis hayati dengan sisi aktif spesifik yang mengikat substrat dan menurunkan Ea ribuan hingga jutaan kali lipat pada suhu fisiologis 37°C.'
    },
    {
      id: 'kb3-mc-9',
      lessonId: 'kb-3',
      orderIndex: 9,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pernyataan yang BENAR mengenai sifat katalis adalah...',
      options: [
        'A. Katalis ikut bereaksi dan terpakai habis pada akhir reaksi',
        'B. Katalis memperbesar jumlah rendemen produk kesetimbangan',
        'C. Katalis mempercepat laju reaksi maju dan reaksi balik secara seimbang',
        'D. Katalis hanya bekerja pada reaksi fasa gas'
      ],
      correctAnswer: 'C',
      explanation: 'Katalis menurunkan rintangan energi aktivasi pada kedua arah (maju dan balik) dengan besaran penurunan yang sama sehingga posisi kesetimbangan tidak bergeser.'
    },
    {
      id: 'kb3-mc-10',
      lessonId: 'kb-3',
      orderIndex: 10,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Mengapa bensin dapat disimpan bertahun-tahun di tangki mobil tanpa terbakar sendiri pada suhu ruang, padahal reaksi pembakarannya sangat eksoterm?',
      options: [
        'A. Bensin tidak mengandung atom karbon',
        'B. Energi aktivasi pembakaran bensin sangat tinggi sehingga membutuhkan loncatan bunga api',
        'C. Nilai ΔH pembakaran bensin adalah nol',
        'D. Oksigen di udara menolak molekul hidrokarbon'
      ],
      correctAnswer: 'B',
      explanation: 'Meskipun sangat menguntungkan secara termodinamika (eksoterm besar), rintangan kinetik (Ea) sangat tinggi pada suhu ruang sehingga fraksi molekul yang bereaksi praktis nol tanpa bantuan pemantik api.'
    }
  ],
  'kb-4': [
    {
      id: 'kb4-mc-1',
      lessonId: 'kb-4',
      orderIndex: 1,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Reaksi antara pita magnesium dengan larutan asam klorida: Mg(s) + 2 HCl(aq) → MgCl₂(aq) + H₂(g). Perlakuan yang menghasilkan laju reaksi PALING CEPAT adalah...',
      options: [
        'A. 1 gram pita Mg utuh + 100 mL HCl 0,5 M pada 25°C',
        'B. 1 gram pita Mg utuh + 100 mL HCl 2,0 M pada 25°C',
        'C. 1 gram serbuk Mg + 100 mL HCl 0,5 M pada 25°C',
        'D. 1 gram serbuk Mg + 100 mL HCl 2,0 M pada 45°C'
      ],
      correctAnswer: 'D',
      explanation: 'Kombinasi serbuk (luas permukaan kontak maksimal), konsentrasi asam tertinggi (2,0 M), dan suhu paling tinggi (45°C) akan memaksimalkan frekuensi tumbukan efektif.'
    },
    {
      id: 'kb4-mc-2',
      lessonId: 'kb-4',
      orderIndex: 2,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Mengapa serbuk batu kapur (CaCO₃) bereaksi lebih cepat dengan asam dibandingkan bongkahan batu kapur dengan massa yang sama?',
      options: [
        'A. Serbuk kapur memiliki massa jenis yang lebih kecil',
        'B. Serbuk kapur memiliki total luas permukaan sentuh yang jauh lebih luas bagi partikel asam untuk bertumbukan',
        'C. Serbuk kapur menurunkan energi aktivasi reaksi',
        'D. Serbuk kapur menghasilkan gas CO₂ yang bermassa negatif'
      ],
      correctAnswer: 'B',
      explanation: 'Pada zat padat, reaksi hanya dapat berlangsung pada antarmuka sentuh. Memecah padatan menjadi butiran serbuk mengekspos jutaan atom baru ke larutan.'
    },
    {
      id: 'kb4-mc-3',
      lessonId: 'kb-4',
      orderIndex: 3,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Suatu reaksi berlangsung 2 kali lebih cepat setiap kenaikan suhu 10°C. Jika laju reaksi pada suhu 20°C adalah 0,04 M/s, berapa laju reaksi pada suhu 50°C?',
      options: [
        'A. 0,08 M/s',
        'B. 0,16 M/s',
        'C. 0,32 M/s',
        'D. 0,64 M/s'
      ],
      correctAnswer: 'C',
      explanation: 'Kenaikan suhu = 50°C - 20°C = 30°C. Jumlah kelipatan n = 30 / 10 = 3 kali. Laju v = 0,04 × (2)³ = 0,04 × 8 = 0,32 M/s.'
    },
    {
      id: 'kb4-mc-4',
      lessonId: 'kb-4',
      orderIndex: 4,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Jika pada suhu 30°C waktu reaksi adalah 48 detik, dan setiap kenaikan 10°C laju reaksi meningkat 2 kali lipat, maka waktu reaksi pada suhu 60°C adalah...',
      options: [
        'A. 24 detik',
        'B. 12 detik',
        'C. 6 detik',
        'D. 3 detik'
      ],
      correctAnswer: 'C',
      explanation: 'Waktu berbanding terbalik dengan laju reaksi: t₂ = t₁ / 2^((60-30)/10) = 48 / 2³ = 48 / 8 = 6 detik.'
    },
    {
      id: 'kb4-mc-5',
      lessonId: 'kb-4',
      orderIndex: 5,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Katalis yang wujud fasanya sama dengan fasa pereaksinya (misalnya larutan dengan larutan) disebut...',
      options: [
        'A. Katalis heterogen',
        'B. Katalis homogen',
        'C. Biokatalis kristalin',
        'D. Inhibitor fasa'
      ],
      correctAnswer: 'B',
      explanation: 'Katalis homogen berada dalam fasa fisik yang sama dengan reaktan (misal katalis cair asam sulfat dalam esterifikasi larutan alkohol dan asam karboksilat).'
    },
    {
      id: 'kb4-mc-6',
      lessonId: 'kb-4',
      orderIndex: 6,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Peristiwa menyalakan arang briket dengan mengipasi memakai kipas angin menerapkan prinsip laju reaksi faktor...',
      options: [
        'A. Menambah konsentrasi oksigen di sekitar permukaan arang',
        'B. Menurunkan energi aktivasi pembakaran arang',
        'C. Memperkecil luas bidang sentuh arang',
        'D. Mengubah reaksi endoterm menjadi eksoterm'
      ],
      correctAnswer: 'A',
      explanation: 'Mengipasi pasokan udara menyuplai oksigen segar terus menerus, meningkatkan konsentrasi lokal pereaksi gas O₂ di zona pembakaran.'
    },
    {
      id: 'kb4-mc-7',
      lessonId: 'kb-4',
      orderIndex: 7,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Penguraian hidrogen peroksida 2 H₂O₂(aq) → 2 H₂O(l) + O₂(g) berlangsung sangat lambat. Penambahan sedikit serbuk MnO₂ hitam seketika menimbulkan gelembung gas O₂ yang melimpah. Peran MnO₂ di sini adalah sebagai...',
      options: [
        'A. Pereaksi utama pembentuk gas',
        'B. Pelarut hidrogen peroksida',
        'C. Katalis heterogen yang menurunkan Ea penguraian H₂O₂',
        'D. Zat pengikat endapan air'
      ],
      correctAnswer: 'C',
      explanation: 'Mangan dioksida (MnO₂) bertindak sebagai katalis anorganik yang mempercepat laju pembentukan gas oksigen tanpa ikut habis terpakai di akhir reaksi.'
    },
    {
      id: 'kb4-mc-8',
      lessonId: 'kb-4',
      orderIndex: 8,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Mengapa potongan daging yang dipotong dadu kecil matang lebih cepat saat dimasak dibandingkan daging utuh sekilo?',
      options: [
        'A. Potongan kecil memiliki luas kontak perpindahan panas yang lebih besar',
        'B. Potongan kecil memerlukan kalor jenis yang lebih tinggi',
        'C. Struktur protein daging berubah menjadi asam',
        'D. Suhu minyak di dalam daging menjadi dua kali lipat'
      ],
      correctAnswer: 'A',
      explanation: 'Prinsip luas permukaan bidang sentuh: luas total bagian luar yang terkena panas meningkat pesat bila padatan dipotong kecil-kecil.'
    },
    {
      id: 'kb4-mc-9',
      lessonId: 'kb-4',
      orderIndex: 9,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Larutan natrium tiosulfat (Na₂S₂O₃) bereaksi dengan asam klorida (HCl) membentuk endapan kuning belerang (S). Untuk mengukur laju reaksinya, metode praktikum yang umum digunakan adalah...',
      options: [
        'A. Menimbang massa bejana menggunakan neraca analitik setiap jam',
        'B. Mencatat waktu hingga tanda silang hitam (X) di bawah labu tidak lagi terlihat tembus pandang',
        'C. Mengukur perubahan volume larutan dengan pipet ukur',
        'D. Menyaring gas hidrogen yang menguap ke udara'
      ],
      correctAnswer: 'B',
      explanation: 'Kekeruhan endapan belerang koloid menghalangi transmisi cahaya, sehingga waktu tertutupnya tanda silang hitam merepresentasikan laju pembentukan endapan.'
    },
    {
      id: 'kb4-mc-10',
      lessonId: 'kb-4',
      orderIndex: 10,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Manakah dari pernyataan berikut yang SALAH mengenai pengaruh suhu terhadap reaksi kimia?',
      options: [
        'A. Kenaikan suhu meningkatkan energi kinetik rata-rata partikel',
        'B. Kenaikan suhu meningkatkan frekuensi tumbukan total partikel',
        'C. Kenaikan suhu menurunkan energi aktivasi reaksi itu sendiri',
        'D. Kenaikan suhu memperbesar fraksi molekul yang energinya melebihi Ea'
      ],
      correctAnswer: 'C',
      explanation: 'Suhu TIDAK MENGUBAH nilai Energi Aktivasi (Ea). Ea adalah sifat intrinsik ikatan kimia reaksi tersebut. Yang berubah oleh suhu adalah distribusi energi partikel (Maxwell-Boltzmann).'
    }
  ],
  'kb-5': [
    {
      id: 'kb5-mc-1',
      lessonId: 'kb-5',
      orderIndex: 1,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Untuk reaksi: A + B → C, diperoleh data: jika [A] dinaikkan 2 kali lipat pada [B] tetap, laju menjadi 4 kali lebih besar. Orde reaksi terhadap zat A adalah...',
      options: [
        'A. 0',
        'B. 1',
        'C. 2',
        'D. 3'
      ],
      correctAnswer: 'C',
      explanation: 'Hubungan [A]ᵐ = laju. (2)ᵐ = 4, maka m = 2 (orde reaksi kedua).'
    },
    {
      id: 'kb5-mc-2',
      lessonId: 'kb-5',
      orderIndex: 2,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Jika laju reaksi suatu proses kimia TIDAK BERUBAH sedikit pun ketika konsentrasi zat pereaksi dilipatgandakan, maka orde reaksi terhadap zat tersebut adalah...',
      options: [
        'A. Orde nol (0)',
        'B. Orde satu (1)',
        'C. Orde dua (2)',
        'D. Orde pecahan (1/2)'
      ],
      correctAnswer: 'A',
      explanation: 'Pada orde nol, v = k [A]⁰ = k · 1 = k. Laju reaksi konstan dan independen terhadap konsentrasi pereaksi.'
    },
    {
      id: 'kb5-mc-3',
      lessonId: 'kb-5',
      orderIndex: 3,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Suatu reaksi memiliki persamaan laju: v = k [A]² [B]¹. Satuan dari tetapan laju jenis k dalam satuan M dan s adalah...',
      options: [
        'A. M⁻¹ · s⁻¹',
        'B. M⁻² · s⁻¹',
        'C. s⁻¹',
        'D. M · s⁻¹'
      ],
      correctAnswer: 'B',
      explanation: 'Orde total = 2 + 1 = 3. Rumus umum satuan k = M^(1 - orde total) · s⁻¹ = M^(1 - 3) · s⁻¹ = M⁻² · s⁻¹ atau L² · mol⁻² · s⁻¹.'
    },
    {
      id: 'kb5-mc-4',
      lessonId: 'kb-5',
      orderIndex: 4,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Data eksperimen reaksi: 2 NO + Br₂ → 2 NOBr menunjukkan orde reaksi terhadap NO adalah 2 dan terhadap Br₂ adalah 1. Jika konsentrasi NO dan Br₂ masing-masing diperbesar 3 kali semula, laju reaksi akan meningkat sebesar...',
      options: [
        'A. 9 kali',
        'B. 18 kali',
        'C. 27 kali',
        'D. 81 kali'
      ],
      correctAnswer: 'C',
      explanation: 'v₂ / v₁ = (3)² × (3)¹ = 9 × 3 = 27 kali lebih cepat.'
    },
    {
      id: 'kb5-mc-5',
      lessonId: 'kb-5',
      orderIndex: 5,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Grafik hubungan konsentrasi reaktan [A] terhadap waktu t yang menghasilkan garis lurus linear menandakan reaksi berorde...',
      options: [
        'A. Orde nol ([A]t = -kt + [A]₀)',
        'B. Orde satu (ln[A]t = -kt + ln[A]₀)',
        'C. Orde dua (1/[A]t = kt + 1/[A]₀)',
        'D. Orde tiga'
      ],
      correctAnswer: 'A',
      explanation: 'Plot langsung [A] vs t menghasilkan garis lurus hanya pada reaksi orde nol. Untuk orde satu garis lurus didapat dari plot ln[A] vs t, sedangkan orde dua dari plot 1/[A] vs t.'
    },
    {
      id: 'kb5-mc-6',
      lessonId: 'kb-5',
      orderIndex: 6,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Karakteristik penting waktu paruh (t½) pada reaksi berorde satu adalah...',
      options: [
        'A. Nilai t½ selalu berbanding lurus dengan konsentrasi awal reaktan',
        'B. Nilai t½ konstan tidak tergantung pada konsentrasi awal (t½ = 0,693 / k)',
        'C. Waktu paruh semakin lama seiring berkurangnya reaktan',
        'D. Reaksi berhenti tuntas setelah melewati satu waktu paruh'
      ],
      correctAnswer: 'B',
      explanation: 'Untuk reaksi orde satu, waktu yang dibutuhkan agar konsentrasi berkurang menjadi setengahnya selalu konstan (seperti pada peluruhan zat radioaktif).'
    },
    {
      id: 'kb5-mc-7',
      lessonId: 'kb-5',
      orderIndex: 7,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Faktor apakah yang DAPAT mengubah nilai konstanta laju reaksi k untuk reaksi tertentu?',
      options: [
        'A. Menambahkan konsentrasi reaktan',
        'B. Mengubah suhu reaksi atau menambahkan katalis',
        'C. Memperbesar ukuran wadah reaksi',
        'D. Mengocok larutan secara mekanik tanpa mengubah suhu'
      ],
      correctAnswer: 'B',
      explanation: 'Nilai k hanya dipengaruhi secara intrinsik oleh suhu (sesuai persamaan Arrhenius) dan adanya katalis yang merubah jalur aktivasi.'
    },
    {
      id: 'kb5-mc-8',
      lessonId: 'kb-5',
      orderIndex: 8,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Perhatikan tahap-tahap mekanisme reaksi berikut:\nTahap 1: NO₂ + NO₂ → NO₃ + NO  (lambat)\nTahap 2: NO₃ + CO → NO₂ + CO₂  (cepat)\nHukum laju reaksi keseluruhan ditentukan oleh...',
      options: [
        'A. Tahap 2 karena menghasilkan produk akhir CO₂',
        'B. Penjumlahan kedua tahap secara simultan',
        'C. Tahap 1 (tahap penentu laju), sehingga v = k [NO₂]²',
        'D. Konsentrasi gas CO saja'
      ],
      correctAnswer: 'C',
      explanation: 'Laju reaksi total dibatasi oleh tahapan yang paling lambat (Rate Determining Step / RDS). Karena Tahap 1 lambat dan melibatkan dua molekul NO₂, maka v = k [NO₂]².'
    },
    {
      id: 'kb5-mc-9',
      lessonId: 'kb-5',
      orderIndex: 9,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pada suatu eksperimen, waktu reaksi berbanding terbalik dengan laju reaksi (v = 1/t). Jika waktu reaksi berkurang dari 80 detik menjadi 20 detik saat konsentrasi dinaikkan 2 kali lipat, orde reaksinya adalah...',
      options: [
        'A. 1',
        'B. 2',
        'C. 3',
        'D. 0'
      ],
      correctAnswer: 'B',
      explanation: 'Waktu menjadi 1/4 kali (dari 80s ke 20s), berarti laju reaksi menjadi 4 kali lebih cepat saat konsentrasi naik 2 kali lipat: 2ᵐ = 4 → m = 2.'
    },
    {
      id: 'kb5-mc-10',
      lessonId: 'kb-5',
      orderIndex: 10,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Apakah orde reaksi suatu reaksi kimia selalu sama dengan koefisien stoikiometri persamaan reaksi setaranya?',
      options: [
        'A. Ya, selalu sama untuk semua reaksi kimia',
        'B. Tidak selalu, orde reaksi ditentukan secara empiris melalui eksperimen kecuali untuk reaksi elementer satu tahap',
        'C. Tidak pernah sama dalam kondisi apa pun',
        'D. Hanya sama bila reaksi berfasa padat'
      ],
      correctAnswer: 'B',
      explanation: 'Sebagian besar reaksi berlangsung melalui beberapa tahapan elementer berurutan (mekanisme reaksi), sehingga orde reaksi harus dicari melalui percobaan laboratorium.'
    }
  ],
  'kb-6': [
    {
      id: 'kb6-mc-1',
      lessonId: 'kb-6',
      orderIndex: 1,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pada sintesis industri amonia (Proses Haber-Bosch): N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g) (eksoterm), suhu yang digunakan adalah 400-450°C. Alasan penggunaan suhu ini adalah...',
      options: [
        'A. Merupakan suhu optimum untuk menggeser kesetimbangan ke arah produk sebesar 100%',
        'B. Merupakan suhu kompromi agar laju reaksi cukup cepat tanpa mengurangi rendemen amonia secara berlebihan',
        'C. Agar gas nitrogen mencair menjadi cairan',
        'D. Mencegah amonia teroksidasi menjadi asam nitrat'
      ],
      correctAnswer: 'B',
      explanation: 'Secara termodinamika suhu rendah menguntungkan produk, namun secara kinetika suhu rendah membuat reaksi berjalan sangat lambat. Suhu 400-450°C adalah titik kompromi kinetika-termodinamika terbaik.'
    },
    {
      id: 'kb6-mc-2',
      lessonId: 'kb-6',
      orderIndex: 2,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Katalis yang digunakan pada proses Haber-Bosch untuk mempercepat pemutusan ikatan rangkap tiga N≡N adalah...',
      options: [
        'A. Besi (Fe) dengan promotor Al₂O₃ dan K₂O',
        'B. Vanadium pentoksida (V₂O₅)',
        'C. Nikel Raney dalam larutan asam',
        'D. Karbon aktif berpori'
      ],
      correctAnswer: 'A',
      explanation: 'Serbuk besi dengan promotor oksida logam aluminium dan kalium menyediakan permukaan adsorpsi aktif untuk memisahkan molekul gas nitrogen yang sangat inert.'
    },
    {
      id: 'kb6-mc-3',
      lessonId: 'kb-6',
      orderIndex: 3,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Mengapa menyimpan bahan makanan basah di dalam lemari pendingin (kulkas 4°C) dapat mencegah pembusukan lebih lama?',
      options: [
        'A. Suhu dingin membunuh semua bakteri seketika menjadi steril',
        'B. Suhu dingin memperlambat laju reaksi biokimia metabolisme mikroorganisme dan hidrolisis makanan',
        'C. Suhu dingin menghilangkan gas oksigen di dalam lemari es',
        'D. Suhu dingin menaikkan pH makanan menjadi sangat basa'
      ],
      correctAnswer: 'B',
      explanation: 'Suhu rendah menurunkan energi kinetik enzim pembusuk dan bakteri, sehingga laju reaksi dekomposisi makanan berkurang drastis sesuai persamaan Arrhenius.'
    },
    {
      id: 'kb6-mc-4',
      lessonId: 'kb-6',
      orderIndex: 4,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pada knalpot mobil, alat catalytic converter berfungsi untuk mengubah gas buang berbahaya menjadi ramah lingkungan. Reaksi yang dikatalisis adalah...',
      options: [
        'A. CO dan NO diubah menjadi gas CO₂ dan N₂ yang tidak beracun',
        'B. Bensin yang tersisa diubah menjadi bahan bakar hidrogen',
        'C. Gas karbon dioksida diubah menjadi batu bara padat',
        'D. Uap air diuraikan menjadi ozon pelindung atmosfer'
      ],
      correctAnswer: 'A',
      explanation: 'Katalis logam mulia Pt/Pd/Rh mengoksidasi CO beracun menjadi CO₂ dan mereduksi nitrogen oksida (NOx) penyebab hujan asam menjadi gas N₂ bebas.'
    },
    {
      id: 'kb6-mc-5',
      lessonId: 'kb-6',
      orderIndex: 5,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pada proses pembuatan asam sulfat melalui Proses Kontak, reaksi SO₂ + O₂ ⇌ 2 SO₃ menggunakan katalis...',
      options: [
        'A. Serbuk seng (Zn)',
        'B. Vanadium(V) oksida (V₂O₅)',
        'C. Tembaga sulfat (CuSO₄)',
        'D. Natrium klorida (NaCl)'
      ],
      correctAnswer: 'B',
      explanation: 'Vanadium pentoksida (V₂O₅) adalah katalis industri standar yang digunakan pada suhu 450°C untuk mempercepat oksidasi belerang dioksida menjadi belerang trioksida.'
    },
    {
      id: 'kb6-mc-6',
      lessonId: 'kb-6',
      orderIndex: 6,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pengemasan makanan kemasan keripik dengan gas nitrogen (N₂) bertekanan menerapkan pengendalian laju reaksi untuk...',
      options: [
        'A. Mencegah reaksi oksidasi lemak/minyak oleh oksigen yang menimbulkan bau tengik',
        'B. Meningkatkan suhu kemasan saat pengiriman',
        'C. Mempercepat pembusukan bumbu keripik',
        'D. Mengkristalkan garam dapur pada keripik'
      ],
      correctAnswer: 'A',
      explanation: 'Gas nitrogen inert menggantikan oksigen dalam kantong kemasan, sehingga laju ketengikan lemak melalui reaksi oksidasi dapat dihindari.'
    },
    {
      id: 'kb6-mc-7',
      lessonId: 'kb-6',
      orderIndex: 7,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Mengapa debu batu bara atau serbuk tepung di gudang pabrik berisiko memicu ledakan dahsyat (dust explosion) bila tersulut percikan api kecil?',
      options: [
        'A. Serbuk tepung mengandung gas dinamit alami',
        'B. Serbuk halus memiliki luas permukaan kontak luar biasa masif dengan oksigen di udara',
        'C. Tepung bereaksi menghasilkan suhu di bawah nol',
        'D. Percikan api menyerap semua partikel oksigen'
      ],
      correctAnswer: 'B',
      explanation: 'Partikel tersuspensi berukuran mikro menghasilkan luas permukaan kontak total yang amat luas, sehingga laju pembakaran terjadi serentak dalam hitungan milidetik menghasilkan gelombang kejut ledakan.'
    },
    {
      id: 'kb6-mc-8',
      lessonId: 'kb-6',
      orderIndex: 8,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Pematangan buah pisang atau mangga yang dibungkus rapat dalam karung jerami atau beras berlangsung lebih cepat karena...',
      options: [
        'A. Gas etilen alami yang dikeluarkan buah terperangkap dan memekat, mengkatalisis pematangan',
        'B. Karung jerami memancarkan sinar ultraviolet buatan',
        'C. Oksigen di dalam karung bereaksi menjadi gas klorin',
        'D. Dinding buah menjadi tipis akibat tekanan udara'
      ],
      correctAnswer: 'A',
      explanation: 'Hormon gas etilen (C₂H₄) memicu pematangan. Dalam ruang tertutup, konsentrasi gas etilen meningkat dan mempercepat laju reaksi hidrolisis pati menjadi gula fruktosa manis.'
    },
    {
      id: 'kb6-mc-9',
      lessonId: 'kb-6',
      orderIndex: 9,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Dalam industri farmasi, formulasi obat tablet effervescent (larut air mendesis) menggunakan reaktan berwujud padat kering (asam sitrat dan natrium bikarbonat). Mengapa reaktan ini tidak bereaksi di dalam botol kemasan?',
      options: [
        'A. Karena tidak ada molekul air yang memfasilitasi kontak mobilitas ion antar reaktan padat',
        'B. Karena asam sitrat di dalam botol bersifat sangat basa',
        'C. Karena natrium bikarbonat tidak dapat bereaksi dengan asam',
        'D. Karena kedua zat tersebut adalah gas inert'
      ],
      correctAnswer: 'A',
      explanation: 'Dalam fasa kristal padat kering, ion-ion terikat kuat dalam kisi kristal sehingga tidak dapat bertumbukan. Ketika dimasukkan ke dalam air, kisi larut dan ion bebas bertumbukan secepat kilat menghasilkan gas CO₂.'
    },
    {
      id: 'kb6-mc-10',
      lessonId: 'kb-6',
      orderIndex: 10,
      type: 'MULTIPLE_CHOICE',
      questionText: 'Tantangan terbesar transisi energi masa depan dalam produksi "Green Ammonia" adalah...',
      options: [
        'A. Menemukan elektrokatalis berefisiensi tinggi yang mampu memutus ikatan kuat N≡N pada suhu dan tekanan lingkungan rendah',
        'B. Mengganti unsur nitrogen dengan gas mulia helium',
        'C. Mengubah molekul hidrogen menjadi molekul karbon',
        'D. Mencegah amonia larut di dalam air laut'
      ],
      correctAnswer: 'A',
      explanation: 'Riset kinetika kimia modern berfokus pada perancangan nanokatalis baru yang dapat mengaktifkan ikatan N≡N pada suhu ruang menggunakan listrik dari energi terbarukan tanpa emisi karbon proses Bosch.'
    }
  ]
};
