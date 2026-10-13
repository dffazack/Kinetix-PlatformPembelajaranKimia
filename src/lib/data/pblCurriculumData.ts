import { Lesson, Question, StudentResult, User } from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'teacher-1',
    email: 'friska.farah@kinetix.id',
    name: 'Friska Farah Faridah',
    role: 'TEACHER',
    school: 'S1 Pendidikan Kimia (NIM: 240331605527)',
    avatar: '👩‍🏫',
  },
  {
    id: 'student-1',
    email: 'budi@siswa.kinetix.id',
    name: 'Budi Pratama',
    role: 'STUDENT',
    school: 'SMA Negeri 1 Sains Kimia - XI MIPA 1',
    avatar: '👨‍🎓',
  },
  {
    id: 'student-2',
    email: 'aulia@siswa.kinetix.id',
    name: 'Aulia Zahra',
    role: 'STUDENT',
    school: 'SMA Negeri 1 Sains Kimia - XI MIPA 1',
    avatar: '👩‍🎓',
  },
  {
    id: 'student-3',
    email: 'dimas@siswa.kinetix.id',
    name: 'Dimas Wahyu',
    role: 'STUDENT',
    school: 'SMA Negeri 1 Sains Kimia - XI MIPA 2',
    avatar: '🧑‍🎓',
  }
];

export const PBL_LESSONS: Lesson[] = [
  {
    id: 'kb-1',
    orderNumber: 1,
    slug: 'konsep-laju-reaksi-teori-tumbukan',
    title: 'Pertemuan 1 (KB 1): Konsep Laju Reaksi & Teori Tumbukan',
    subtitle: 'Pengertian Laju Reaksi, Tumbukan Efektif, Orientasi Molekul, & Energi Aktivasi (Ea)',
    description: 'Memahami bagaimana laju reaksi diukur secara makroskopik dan mikroskopik melalui teori tumbukan efektif, energi aktivasi, dan orientasi spasial partikel.',
    duration: '90 Menit (2 JP)',
    videoUrl: 'https://youtu.be/vTD0h6d_H-Y?si=bVyD1eZUoyrY9A8K',
    pblProblem: 'Orientasi Masalah: Bandingkan ledakan debu/kembang api (yang meletus dalam hitungan milidetik) dengan perkaratan paku besi di jembatan (yang berlangsung berbulan-bulan hingga bertahun-tahun). Mengapa dua reaksi kimia dapat memiliki laju yang sangat berbeda secara ekstrem pada tingkat molekuler?',
    simulationType: 'COLLISION_THEORY',
    objectives: [
      'Menjelaskan definisi laju reaksi kimia secara makroskopik, submikroskopik, dan simbolik.',
      'Menganalisis syarat terjadinya tumbukan efektif (energi kinetik cukup ≥ Ea dan orientasi spasial tepat).',
      'Menghubungkan perbandingan laju reaksi dengan koefisien stoikiometri zat pereaksi dan produk.',
      'Menginterpretasikan kurva perubahan konsentrasi terhadap waktu [Reaktan] vs waktu (t).'
    ],
    reflectionPrompts: [
      'Konsep baru apa yang paling mengubah pemahamanmu tentang cara reaksi kimia terjadi?',
      'Bagaimana kamu menjelaskan perbedaan reaksi cepat dan lambat kepada temanmu menggunakan Teori Tumbukan?',
      'Bagian simulasi mana yang paling membantumu memvisualisasikan orientasi molekul?'
    ],
    contentBlocks: [
      {
        id: 'kb1-pbl-box',
        type: 'callout',
        content: '📌 FASE 1 PBL: ORIENTASI MASALAH\nBandingkan reaksi lambat perkaratan besi (timelapse) dengan reaksi sangat cepat eksperimen ledakan debu. Amati kedua video demonstrasi di bawah untuk mengidentifikasi mengapa perbedaan laju reaksi dapat terjadi begitu ekstrem pada tingkat molekuler!',
        metadata: { variant: 'info', caption: 'Orientasi Masalah Kontekstual' }
      },
      {
        id: 'kb1-video-rust',
        type: 'video',
        content: 'https://youtu.be/vTD0h6d_H-Y?si=bVyD1eZUoyrY9A8K',
        metadata: { caption: 'Video 1: Reaksi Lambat — Perkaratan Paku Besi (Timelapse)' }
      },
      {
        id: 'kb1-video-dust',
        type: 'video',
        content: 'https://youtu.be/jENpGlJ0dzA?si=FCbzypui9aYs_ifI',
        metadata: { caption: 'Video 2: Reaksi Cepat — Eksperimen Ledakan Debu (Dust Explosion)' }
      },
      {
        id: 'kb1-h1',
        type: 'heading',
        content: '1. Pengertian Laju Reaksi (Tinjauan Tiga Level Representasi)'
      },
      {
        id: 'kb1-t1',
        type: 'text',
        content: 'Laju reaksi kimia ($v$) menyatakan seberapa cepat suatu reaktan diubah menjadi produk. Secara kuantitatif, laju reaksi adalah **laju berkurangnya konsentrasi molar reaktan** atau **laju bertambahnya konsentrasi molar produk per satuan waktu**.\n\nDalam reaksi umum:\na A + b B → c C + d D\n\nPerbandingan laju konsumsi reaktan dan pembentukan produk berbanding lurus dengan koefisien stoikiometrinya:\nv = - (1/a)(Δ[A]/Δt) = - (1/b)(Δ[B]/Δt) = + (1/c)(Δ[C]/Δt) = + (1/d)(Δ[D]/Δt)'
      },
      {
        id: 'kb1-eq',
        type: 'equation',
        content: 'v = - Δ[Reaktan] / Δt = + Δ[Produk] / Δt   (Satuan: M/s atau mol·L⁻¹·s⁻¹)',
        metadata: { caption: 'Tanda negatif menunjukkan konsentrasi reaktan berkurang, positif menunjukkan produk bertambah.' }
      },
      {
        id: 'kb1-h2',
        type: 'heading',
        content: '2. Teori Tumbukan & Tumbukan Efektif'
      },
      {
        id: 'kb1-t2',
        type: 'text',
        content: 'Reaksi kimia tidak terjadi hanya karena dua molekul saling mendekat. Menurut **Teori Tumbukan (Collision Theory)**, suatu tumbukan baru menghasilkan reaksi (disebut **Tumbukan Efektif**) jika memenuhi dua syarat mutlak:\n\n1. **Energi Kinetik Minimum ($E_k \\ge E_a$):** Partikel harus memiliki energi tumbukan yang melampaui ambang batas Energi Aktivasi ($E_a$) untuk memutuskan ikatan kimia lama.\n2. **Orientasi Spasial Tepat:** Partikel harus bertumbukan dengan arah dan posisi sudut atom yang tepat agar ikatan baru dapat terbentuk.'
      },
      {
        id: 'kb1-callout2',
        type: 'callout',
        content: 'Miskonsepsi Umum: Memperbanyak tumbukan belum tentu mempercepat reaksi jika orientasi molekul salah atau energinya di bawah Energi Aktivasi (Ea). Partikel hanya akan memantul kembali secara elastis!',
        metadata: { variant: 'warning' }
      },
      {
        id: 'kb1-fill1',
        type: 'fill_blank',
        content: 'Pada penguraian gas N2O5 menjadi NO2 dan O2: 2 N2O5(g) → 4 NO2(g) + O2(g). Jika laju pembentukan gas NO2 adalah 0,08 M/s, maka laju pembentukan gas O2 adalah [blank] M/s.',
        metadata: {
          blankId: 'kb1-fill-1',
          correctAnswer: '0,02',
          acceptableAnswers: ['0.02', '0,02', '0.02 M/s', '0,02 M/s'],
          hint: 'Gunakan perbandingan koefisien: v(O2) = (koef O2 / koef NO2) × v(NO2) = (1/4) × 0,08'
        }
      },
      {
        id: 'kb1-cta',
        type: 'experiment_cta',
        content: 'Uji Teori Tumbukan di Laboratorium Virtual: Atur kecepatan dan orientasi tumbukan partikel 2D untuk membuktikan terjadinya pembentukan produk!',
        metadata: { experimentType: 'COLLISION_THEORY', buttonLabel: 'Buka Virtual Lab: Teori Tumbukan' }
      }
    ]
  },
  {
    id: 'kb-2',
    orderNumber: 2,
    slug: 'faktor-konsentrasi-luas-permukaan',
    title: 'Pertemuan 2 (KB 2): Faktor Laju Reaksi I - Konsentrasi & Luas Permukaan',
    subtitle: 'Pengaruh Konsentrasi Larutan & Ukuran Partikel Padatan terhadap Frekuensi Tumbukan',
    description: 'Menyelidiki pengaruh kerapatan konsentrasi zat terlarut dan luas permukaan bidang sentuh padatan terhadap frekuensi tumbukan partikel.',
    duration: '90 Menit (2 JP)',
    videoUrl: 'https://www.youtube.com/watch?v=jENpGlJ0dzA',
    pblProblem: 'Orientasi Masalah: Fenomena bahaya ledakan debu kayu (Dust Explosion) di pabrik mebel serta mengapa obat demam dalam bentuk puyer serbuk halus bekerja jauh lebih cepat meredakan demam dibandingkan obat tablet padat utuh.',
    simulationType: 'FACTORS_REACTION',
    objectives: [
      'Menjelaskan pengaruh konsentrasi larutan terhadap frekuensi tumbukan antarpartikel reaktan.',
      'Menganalisis hubungan ukuran partikel (luas permukaan bidang sentuh) padatan terhadap laju reaksi.',
      'Mengaitkan fenomena ledakan debu (dust explosion) dan efektivitas obat puyer secara ilmiah.',
      'Melakukan penyelidikan virtual reaksi HCl + CaCO3 dengan variasi konsentrasi dan bentuk padatan.'
    ],
    reflectionPrompts: [
      'Apa hubungan antara konsentrasi/luas permukaan dengan kerapatan tumbukan partikel yang berhasil kamu temukan dari simulasi?',
      'Miskonsepsi apa yang berhasil kamu perbaiki setelah melakukan percobaan virtual?',
      'Bagaimana pemahaman ini membantu cara pandangmu terhadap cara kerja obat puyer?'
    ],
    contentBlocks: [
      {
        id: 'kb2-pbl-box',
        type: 'callout',
        content: '📌 FASE 1 PBL: ORIENTASI MASALAH\nLedakan debu (Dust Explosion) di pabrik tepung atau kayu dan khasiat obat puyer serbuk vs tablet padat. Mengapa luas permukaan dan konsentrasi memiliki efek dramatis terhadap kecepatan reaksi kimia?',
        metadata: { variant: 'info', caption: 'Studi Kasus Kontekstual' }
      },
      {
        id: 'kb2-video',
        type: 'video',
        content: 'https://www.youtube.com/watch?v=jENpGlJ0dzA',
        metadata: { caption: 'Video Eksperimen: Konsentrasi dan Luas Permukaan Bidang Sentuh' }
      },
      {
        id: 'kb2-h1',
        type: 'heading',
        content: '1. Pengaruh Konsentrasi (Tinjauan Kerapatan Molekul)'
      },
      {
        id: 'kb2-t1',
        type: 'text',
        content: 'Semakin tinggi konsentrasi suatu larutan, semakin banyak partikel zat terlarut yang berada dalam satu satuan volume yang sama. Hal ini menyebabkan jarak antarpartikel reaktan menjadi semakin rapat, sehingga **kemungkinan dan frekuensi tumbukan antarpartikel per detik meningkat secara signifikan**. Akibatnya, frekuensi tumbukan efektif bertambah dan laju reaksi meningkat.'
      },
      {
        id: 'kb2-h2',
        type: 'heading',
        content: '2. Pengaruh Luas Permukaan Bidang Sentuh (Tinjauan Heterogen)'
      },
      {
        id: 'kb2-t2',
        type: 'text',
        content: 'Pada reaksi heterogen (misalnya padatan dengan larutan), reaksi hanya dapat berlangsung pada permukaan bidang kontak zat padat yang bersentuhan dengan larutan. Ketika 1 gram padatan dihaluskan menjadi serbuk, bagian dalam padatan terbuka menjadi ribuan bidang sentuh baru, sehingga total **luas permukaan bidang sentuh melonjak drastis** dan tumbukan terjadi serentak di banyak titik.'
      },
      {
        id: 'kb2-cta',
        type: 'experiment_cta',
        content: 'Eksperimen Virtual Reaksi CaCO3 + HCl: Variasikan konsentrasi asam (0.5M, 1.0M, 2.0M) dan bentuk kalsium karbonat (bongkahan, butiran, serbuk) untuk mengamati laju produksi gas CO2!',
        metadata: { experimentType: 'FACTORS_REACTION', buttonLabel: 'Buka Virtual Lab: Faktor Konsentrasi & Luas Permukaan' }
      }
    ]
  },
  {
    id: 'kb-3',
    orderNumber: 3,
    slug: 'faktor-suhu-katalis',
    title: 'Pertemuan 3 (KB 3): Faktor Laju Reaksi II - Suhu & Katalis',
    subtitle: 'Energi Kinetik Partikel, Kurva Maxwell-Boltzmann, & Jalur Reaksi Alternatif Katalis',
    description: 'Menganalisis bagaimana kenaikan suhu menggeser kurva distribusi Maxwell-Boltzmann dan bagaimana katalis menurunkan energi aktivasi melalui jalur reaksi baru.',
    duration: '135 Menit (3 JP)',
    videoUrl: 'https://www.youtube.com/watch?v=42vqeVHW3LM',
    pblProblem: 'Orientasi Masalah: Mengapa makanan yang diletakkan di freezer bertahan berminggu-minggu tanpa membusuk dibandingkan di suhu ruang, serta bagaimana catalytic converter pada knalpot kendaraan bermotor mampu menguraikan gas beracun CO dan NOx dalam hitungan milidetik?',
    simulationType: 'ACTIVATION_ENERGY',
    objectives: [
      'Menjelaskan pengaruh suhu terhadap energi kinetik rata-rata partikel menggunakan kurva distribusi Maxwell-Boltzmann.',
      'Menghitung perubahan laju reaksi berdasarkan rumus kenaikan suhu kelipatan 10°C.',
      'Menganalisis mekanisme kerja katalis dalam menurunkan energi aktivasi (Ea) tanpa mengubah entalpi reaksi (ΔH).',
      'Menginterpretasikan diagram profil energi reaksi eksoterm dan endoterm sebelum dan sesudah penambahan katalis.'
    ],
    reflectionPrompts: [
      'Bagaimana Kurva Maxwell-Boltzmann membantumu memahami mengapa sedikit kenaikan suhu berdampak besar pada laju reaksi?',
      'Mengapa katalis dikatakan "ramah lingkungan" dalam proses kimia industri?',
      'Apa aspek paling menarik dari simulasi penurunan Energi Aktivasi tadi?'
    ],
    contentBlocks: [
      {
        id: 'kb3-pbl-box',
        type: 'callout',
        content: '📌 FASE 1 PBL: ORIENTASI MASALAH\nMakanan awet di dalam kulkas/freezer vs membusuk cepat di meja makan, dan filter catalytic converter mobil. Bagaimana peran suhu dan katalis pada energi ambang reaksi?',
        metadata: { variant: 'info', caption: 'Studi Kasus Kontekstual' }
      },
      {
        id: 'kb3-video',
        type: 'video',
        content: 'https://www.youtube.com/watch?v=42vqeVHW3LM',
        metadata: { caption: 'Video Pembelajaran: Pengaruh Suhu dan Katalis terhadap Laju Reaksi' }
      },
      {
        id: 'kb3-h1',
        type: 'heading',
        content: '1. Pengaruh Suhu & Distribusi Maxwell-Boltzmann'
      },
      {
        id: 'kb3-t1',
        type: 'text',
        content: 'Kenaikan suhu tidak mengubah besarnya Energi Aktivasi ($E_a$), melainkan meningkatkan **energi kinetik rata-rata partikel**. Pada kurva Maxwell-Boltzmann, kenaikan suhu menggeser puncak kurva ke kanan dan mendatarkannya, sehingga luas area di bawah kurva yang melampaui nilai $E_a$ bertambah berlipat ganda. Partikel yang mampu melakukan tumbukan efektif melonjak tajam.'
      },
      {
        id: 'kb3-eq',
        type: 'equation',
        content: 't₂ = t₁ × (1/n)^((T₂ - T₁) / ΔT)   atau   v₂ = v₁ × n^((T₂ - T₁) / ΔT)',
        metadata: { caption: 'Rumus empiris laju terhadap kenaikan suhu per ΔT derajat Celcius.' }
      },
      {
        id: 'kb3-h2',
        type: 'heading',
        content: '2. Mekanisme Kerja Katalis'
      },
      {
        id: 'kb3-t2',
        type: 'text',
        content: 'Katalis adalah zat yang mempercepat laju reaksi kimia dengan cara **menyediakan mekanisme reaksi alternatif yang memiliki Energi Aktivasi ($E_a$) lebih rendah**. Katalis tidak ikut terkonsumsi secara netto di akhir reaksi, tidak mengubah nilai perubahan entalpi ($\\Delta H$), dan tidak mengubah posisi kesetimbangan kimia.'
      },
      {
        id: 'kb3-cta',
        type: 'experiment_cta',
        content: 'Eksperimen Virtual Energi Aktivasi & Katalis: Atur slider temperatur dan toggle katalis untuk mengamati grafik Maxwell-Boltzmann dan diagram koordinat profil energi secara dinamis!',
        metadata: { experimentType: 'ACTIVATION_ENERGY', buttonLabel: 'Buka Virtual Lab: Energi Aktivasi & Katalis' }
      }
    ]
  },
  {
    id: 'kb-4',
    orderNumber: 4,
    slug: 'persamaan-laju-orde-reaksi',
    title: 'Pertemuan 4 (KB 4): Persamaan Laju Reaksi & Orde Reaksi',
    subtitle: 'Penentuan Orde Reaksi (0, 1, 2), Konstanta Laju Reaksi (k), & Formulasi v = k[A]^x[B]^y',
    description: 'Menentukan persamaan laju reaksi secara matematis dari data eksperimental laju awal, menentukan orde reaksi parsial/total, dan menghitung konstanta laju k.',
    duration: '135 Menit (3 JP)',
    videoUrl: 'https://www.youtube.com/watch?v=oC7W6qsBwZQ',
    pblProblem: 'Orientasi Masalah: Bagaimana ahli farmakologi menentukan dosis dan jadwal minum obat (orde 1 vs orde 0) agar kadar zat aktif obat di dalam darah pasien tetap berada pada rentang terapeutik yang aman dan efektif tanpa menimbulkan toksisitas?',
    simulationType: 'RATE_LAW',
    objectives: [
      'Menjelaskan bahwa persamaan dan orde reaksi hanya dapat ditentukan melalui data eksperimen, bukan koefisien stoikiometri.',
      'Menentukan orde reaksi nol, satu, dan dua menggunakan metode perbandingan laju awal.',
      'Menghitung harga dan satuan konstanta laju reaksi (k) berdasarkan orde total reaksi.',
      'Memprediksi laju reaksi pada konsentrasi reaktan yang belum diuji di laboratorium.'
    ],
    reflectionPrompts: [
      'Langkah sistematis apa yang paling efektif membantumu menentukan orde reaksi dari data eksperimen?',
      'Mengapa kita tidak boleh langsung mengambil koefisien reaksi sebagai orde reaksi?',
      'Bagaimana pemahaman kalkulasi kinetika ini melatih cara berpikir logis-analitis dirimu?'
    ],
    contentBlocks: [
      {
        id: 'kb4-pbl-box',
        type: 'callout',
        content: '📌 FASE 1 PBL: ORIENTASI MASALAH\nPenentuan dosis peluruhan obat dalam darah pasien oleh ahli farmakologi. Bagaimana matematika kinetika kimia membedakan reaksi orde nol, satu, dan dua dalam menentukan laju reaksi?',
        metadata: { variant: 'info', caption: 'Studi Kasus Farmakokinetika' }
      },
      {
        id: 'kb4-video',
        type: 'video',
        content: 'https://www.youtube.com/watch?v=oC7W6qsBwZQ',
        metadata: { caption: 'Video Penjelasan: Cara Menentukan Persamaan Laju & Orde Reaksi' }
      },
      {
        id: 'kb4-h1',
        type: 'heading',
        content: '1. Formulasi Persamaan Laju Reaksi'
      },
      {
        id: 'kb4-t1',
        type: 'text',
        content: 'Untuk reaksi homogen: a A + b B → c C + d D, persamaan laju reaksinya dituliskan sebagai:\n\n**v = k [A]^x [B]^y**\n\nKeterangan:\n- $v$: Laju reaksi (M/s)\n- $k$: Konstanta laju reaksi (nilainya bergantung pada suhu dan jenis zat)\n- $[A], [B]$: Konsentrasi molar reaktan\n- $x$: Orde reaksi terhadap reaktan A\n- $y$: Orde reaksi terhadap reaktan B\n- Orde Total = $x + y$'
      },
      {
        id: 'kb4-callout1',
        type: 'callout',
        content: 'Prinsip Kunci: Orde reaksi (x dan y) TIDAK SELALU SAMA dengan koefisien reaksi (a dan b). Orde reaksi HANYA DAPAT DITENTUKAN secara empiris melalui data eksperimen.',
        metadata: { variant: 'warning' }
      },
      {
        id: 'kb4-h2',
        type: 'heading',
        content: '2. Makna Fisis Orde Reaksi'
      },
      {
        id: 'kb4-t2',
        type: 'text',
        content: '- **Orde 0:** Laju reaksi konstan dan tidak dipengaruhi konsentrasi reaktan ($v = k$). Grafik mendatar.\n- **Orde 1:** Laju reaksi berbanding lurus linier dengan konsentrasi. Jika konsentrasi naik 2 kali, laju naik 2 kali ($v = k[A]$).\n- **Orde 2:** Laju reaksi berbanding kuadratik. Jika konsentrasi naik 2 kali, laju melonjak 4 kali ($v = k[A]^2$).'
      },
      {
        id: 'kb4-cta',
        type: 'experiment_cta',
        content: 'Laboratorium Data Interaktif: Gunakan generator tabel eksperimen untuk menganalisis data konsentrasi awal vs laju, tentukan orde x dan y, dan lihat visualisasi grafiknya!',
        metadata: { experimentType: 'RATE_LAW', buttonLabel: 'Buka Virtual Lab: Hukum & Orde Reaksi' }
      }
    ]
  },
  {
    id: 'kb-5',
    orderNumber: 5,
    slug: 'kinetika-industri-evaluasi-reflektif',
    title: 'Pertemuan 5 (KB 5): Aplikasi Kinetika Kimia dalam Industri & Evaluasi Reflektif',
    subtitle: 'Optimasi Industri (Haber-Bosch N2 + 3H2 ⇌ 2NH3), Green Chemistry, & Integrasi Konsep',
    description: 'Menerapkan konsep laju reaksi, energi aktivasi, dan kompromi kinetika-kesetimbangan pada perancangan reaktor industri amonia dan asam sulfat.',
    duration: '90 Menit (2 JP)',
    videoUrl: 'https://www.youtube.com/watch?v=jEkgf-EGC9U',
    pblProblem: 'Orientasi Masalah: Peran Chemical Process Engineer dalam mengoptimalkan produksi amonia pada proses Haber-Bosch. Mengapa pabrik tidak menggunakan suhu 1000°C untuk reaksi yang eksotermik, dan bagaimana kompromi suhu, tekanan, dan katalis besi diterapkan demi efisiensi biaya dan energi?',
    simulationType: 'INDUSTRIAL_KINETICS',
    objectives: [
      'Menganalisis dilema kinetika vs termodinamika kesetimbangan pada reaksi sintesis amonia Haber-Bosch.',
      'Menjelaskan pemilihan kondisi optimum (suhu kompromi 400-450°C, tekanan 150-200 atm, katalis besi Fe).',
      'Mengintegrasikan seluruh faktor laju reaksi pada tingkat submikroskopik dalam konteks industri hijau (Green Chemistry).',
      'Menyusun refleksi metakognitif komprehensif atas perkembangan pemahaman kimia dari Pertemuan 1 hingga 5.'
    ],
    reflectionPrompts: [
      'Bagaimana pemahamanmu tentang kinetika kimia berkembang dari Pertemuan 1 hingga Pertemuan 5?',
      'Bagaimana pengalaman belajar berbasis masalah (PBL) dan simulasi virtual lab membantumu memahami kimia dibanding metode konvensional?',
      'Kemampuan berpikir kritis/HOTS apa yang paling terasa berkembang dalam dirimu?',
      'Apa pesan atau komitmenmu untuk menerapkan cara berpikir ilmiah ini dalam kehidupan sehari-hari?'
    ],
    contentBlocks: [
      {
        id: 'kb5-pbl-box',
        type: 'callout',
        content: '📌 FASE 1 PBL: ORIENTASI MASALAH INDUSTRI\nSintesis amonia Haber-Bosch (N2 + 3H2 ⇌ 2NH3, ΔH = -92 kJ). Mengapa insinyur proses kimia tidak menggunakan suhu setinggi mungkin padahal suhu tinggi mempercepat reaksi?',
        metadata: { variant: 'info', caption: 'Studi Kasus Desain Reaktor Industri' }
      },
      {
        id: 'kb5-video',
        type: 'video',
        content: 'https://www.youtube.com/watch?v=jEkgf-EGC9U',
        metadata: { caption: 'Video Studi Kasus: Proses Haber-Bosch & Kinetika Industri' }
      },
      {
        id: 'kb5-h1',
        type: 'heading',
        content: '1. Dilema Kinetika vs Termodinamika Kesetimbangan'
      },
      {
        id: 'kb5-t1',
        type: 'text',
        content: 'Dalam sintesis amonia:\nN₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)   ΔH = -92 kJ/mol (Eksoterm)\n\n- **Tinjauan Kinetika:** Suhu tinggi diinginkan agar reaksi cepat berlangsung.\n- **Tinjauan Termodinamika (Le Chatelier):** Karena reaksi bersifat eksoterm, kenaikan suhu justru menggeser kesetimbangan ke arah kiri (reaktan), menyebabkan rendemen amonia turun drastis mendekati 0%!\n\n**Solusi Rekayasa Industri:**\nDigunakan **suhu kompromi sedang (400 - 450°C)** dipadukan dengan **tekanan tinggi (150 - 200 atm)** dan **katalis besi (Fe)** terpromosi kalium oksida dan aluminium oksida.'
      },
      {
        id: 'kb5-cta',
        type: 'experiment_cta',
        content: 'Simulasi Reaktor Industri Interaktif: Kendalikan suhu, tekanan, dan rasio katalis untuk memaksimalkan laju pembentukan amonia dan efisiensi biaya pabrik!',
        metadata: { experimentType: 'INDUSTRIAL_KINETICS', buttonLabel: 'Buka Virtual Lab: Simulator Reaktor Industri' }
      }
    ]
  }
];

export const PBL_QUESTIONS: Question[] = [
  // ================= PERTEMUAN 1 =================
  {
    id: 'kb1-pre-1',
    lessonId: 'kb-1',
    testType: 'PRE_TEST',
    category: 'DIAGNOSTIC',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 1,
    questionText: 'Manakah dari pernyataan berikut yang paling tepat mendefinisikan laju reaksi kimia?',
    options: [
      'A. Jumlah total pereaksi yang tersisa selama reaksi berlangsung.',
      'B. Berkurangnya konsentrasi reaktan atau bertambahnya konsentrasi produk per satuan waktu.',
      'C. Waktu yang dibutuhkan agar seluruh reaktan habis bereaksi.',
      'D. Kecepatan perpindahan elektron antar molekul yang bereaksi.'
    ],
    correctAnswer: 'B',
    explanation: 'Laju reaksi kimia didefinisikan secara kuantitatif sebagai berkurangnya konsentrasi molar reaktan per satuan waktu atau bertambahnya konsentrasi molar produk per satuan waktu (v = -Δ[R]/Δt = +Δ[P]/Δt).'
  },
  {
    id: 'kb1-pre-2',
    lessonId: 'kb-1',
    testType: 'PRE_TEST',
    category: 'MISCONCEPTION',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 2,
    questionText: 'Apakah setiap tumbukan yang terjadi antara molekul-molekul reaktan pasti menghasilkan reaksi kimia baru?',
    options: [
      'A. Ya, karena tumbukan selalu memutus ikatan kimia lama.',
      'B. Ya, karena semua molekul memiliki energi yang sama besar.',
      'C. Tidak, hanya tumbukan dengan energi yang cukup dan orientasi posisi yang tepat.',
      'D. Tidak, karena reaksi kimia hanya terjadi saat ada penambahan katalis.'
    ],
    correctAnswer: 'C',
    explanation: 'Menurut Teori Tumbukan, reaksi kimia hanya terjadi bila terjadi tumbukan efektif, yaitu tumbukan yang memiliki energi minimal sama dengan energi aktivasi (Ea) serta orientasi spasial molekul yang tepat. Tumbukan lainnya hanya menghasilkan pemantulan elastis.'
  },
  {
    id: 'kb1-pre-3',
    lessonId: 'kb-1',
    testType: 'PRE_TEST',
    category: 'SYMBOLIC',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 3,
    questionText: 'Pada reaksi 2A + B → C, pernyataan ungkapan laju reaksi yang benar adalah:',
    options: [
      'A. Laju berkurangnya A sama dengan laju bertambahnya C.',
      'B. Laju berkurangnya A adalah dua kali laju berkurangnya B.',
      'C. Laju pembentukan C adalah dua kali laju berkurangnya A.',
      'D. Laju berkurangnya B adalah dua kali laju pembentukan C.'
    ],
    correctAnswer: 'B',
    explanation: 'Perbandingan laju konsumsi atau pembentukan zat berbanding lurus dengan koefisien stoikiometri persamaan setara: v(A) / v(B) = 2 / 1, sehingga laju berkurangnya A adalah dua kali laju berkurangnya B.'
  },
  {
    id: 'kb1-post-1',
    lessonId: 'kb-1',
    testType: 'POST_TEST',
    category: 'VISUAL',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 1,
    questionText: 'Perhatikan grafik perubahan konsentrasi terhadap waktu pada reaksi P → Q. Pada interval waktu awal, kurva P turun curam kemudian melandai. Penyebab melandainya kurva tersebut adalah...',
    options: [
      'A. Energi aktivasi reaksi semakin meningkat seiring waktu.',
      'B. Konsentrasi reaktan P berkurang sehingga frekuensi tumbukan antarpartikel P menurun.',
      'C. Produk Q menghambat terjadinya tumbukan efektif.',
      'D. Reaksi telah berhenti total sejak awal interval melandai.'
    ],
    correctAnswer: 'B',
    explanation: 'Seiring berjalannya reaksi, reaktan P bereaksi menjadi produk Q sehingga konsentrasi P semakin menurun. Penurunan konsentrasi menyebabkan jarak antarpartikel reaktan semakin renggang dan frekuensi tumbukan menurun, sehingga laju reaksi berkurang (kemiringan kurva melandai).'
  },
  {
    id: 'kb1-post-2',
    lessonId: 'kb-1',
    testType: 'POST_TEST',
    category: 'SUBMICROSCOPIC',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 2,
    questionText: 'Gas NO dan O3 bereaksi membentuk NO2 dan O2. Miskonsepsi umum menyatakan bahwa memperbanyak jumlah molekul pasti mempercepat reaksi. Analisis mengapa dua molekul yang bertumbukan dengan energi melebihi Energi Aktivasi (Ea) tetap gagal bereaksi!',
    options: [
      'A. Karena energi kinetik partikel terlalu besar sehingga memantul.',
      'B. Karena orientasi spasial (arah tumbukan) antarmolekul tidak tepat saat bertumbukan.',
      'C. Karena reaksi membutuhkan pelarut polar.',
      'D. Karena katalis tidak ditambahkan ke dalam wadah reaksi.'
    ],
    correctAnswer: 'B',
    explanation: 'Kegagalan reaksi terjadi karena orientasi spasial (arah tumbukan) yang tidak tepat. Molekul harus bertumbukan pada posisi atom yang saling merenggangkan ikatan lama dan membentuk ikatan baru, bukan sekadar memiliki energi kinetik yang cukup.'
  },

  // ================= PERTEMUAN 2 =================
  {
    id: 'kb2-pre-1',
    lessonId: 'kb-2',
    testType: 'PRE_TEST',
    category: 'DIAGNOSTIC',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 1,
    questionText: 'Jika 1 gram kalsium karbonat (CaCO3) berbentuk kepingan dibandingkan dengan 1 gram serbuk halus, manakah yang memiliki luas permukaan bidang sentuh lebih besar?',
    options: [
      'A. Kepingan padat, karena ukurannya lebih besar.',
      'B. Serbuk halus, karena total area kontak partikelnya lebih luas.',
      'C. Keduanya sama, karena massanya sama-sama 1 gram.',
      'D. Kepingan padat, karena volumenya lebih padat.'
    ],
    correctAnswer: 'B',
    explanation: 'Membagi padatan menjadi butiran/serbuk halus membuka permukaan-permukaan baru di bagian dalam yang sebelumnya tertutup. Dengan massa yang sama (1 gram), serbuk memiliki total luas bidang sentuh yang jauh lebih luas dibandingkan kepingan padat utuh.'
  },
  {
    id: 'kb2-pre-2',
    lessonId: 'kb-2',
    testType: 'PRE_TEST',
    category: 'MISCONCEPTION',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 2,
    questionText: 'Penambahan air ke dalam larutan asam pekat akan menyebabkan...',
    options: [
      'A. Jumlah mol zat terlarut berkurang dan jarak antarpartikel makin rapat.',
      'B. Konsentrasi berkurang dan jarak antarpartikel reaktan semakin renggang.',
      'C. Konsentrasi meningkat karena volume bertambah.',
      'D. Laju reaksi meningkat karena air berfungsi sebagai katalis.'
    ],
    correctAnswer: 'B',
    explanation: 'Penambahan air (pengenceran) memperbesar volume larutan sehingga konsentrasi molaritas (mol/L) menurun. Penurunan konsentrasi membuat jarak antarpartikel reaktan semakin renggang sehingga frekuensi tumbukan per satuan waktu berkurang.'
  },
  {
    id: 'kb2-post-1',
    lessonId: 'kb-2',
    testType: 'POST_TEST',
    category: 'HOTS',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 1,
    questionText: 'Diberikan data reaksi Mg(s) + 2HCl(aq) → MgCl2(aq) + H2(g):\n- Percobaan 1: 0.5 g pita Mg + HCl 1 M (Suhu 25°C) -> Waktu: 40 detik\n- Percobaan 2: 0.5 g serbuk Mg + HCl 1 M (Suhu 25°C) -> Waktu: 12 detik\n- Percobaan 3: 0.5 g serbuk Mg + HCl 2 M (Suhu 25°C) -> Waktu: 5 detik\nBerdasarkan data di atas, laju reaksi paling cepat terjadi pada Percobaan 3 karena...',
    options: [
      'A. Penggunaan serbuk memperkecil energi aktivasi dan konsentrasi tinggi memperbanyak partikel.',
      'B. Luas permukaan bidang sentuh maksimum dan kerapatan partikel reaktan tertinggi meningkatkan frekuensi tumbukan efektif.',
      'C. Konsentrasi HCl 2 M meningkatkan energi kinetik partikel Mg.',
      'D. Percobaan 3 menghasilkan jumlah gas H2 yang lebih banyak dibanding percobaan 1.'
    ],
    correctAnswer: 'B',
    explanation: 'Pada Percobaan 3, bentuk serbuk memberikan luas permukaan bidang sentuh maksimum, sementara konsentrasi HCl 2 M memberikan kerapatan ion H+ tertinggi. Kombinasi keduanya memaksimalkan frekuensi tumbukan efektif per satuan waktu sehingga reaksi tuntas dalam waktu tersingkat (5 detik).'
  },
  {
    id: 'kb2-post-2',
    lessonId: 'kb-2',
    testType: 'POST_TEST',
    category: 'APPLICATION',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 2,
    questionText: 'Jelaskan mengapa bahaya kebakaran di gudang penyimpanan tepung halus jauh lebih tinggi dibanding di gudang penyimpanan beras utuh, padahal keduanya sama-sama karbohidrat!',
    options: [
      'A. Karena tepung menghasilkan gas metana saat disimpan di tempat lembab.',
      'B. Karena tepung halus memiliki luas permukaan bidang sentuh yang sangat besar sehingga kontak dengan oksigen sangat masif.',
      'C. Karena beras memiliki energi aktivasi yang jauh lebih rendah daripada tepung.',
      'D. Karena partikel tepung mengandung katalis alami pembakaran.'
    ],
    correctAnswer: 'B',
    explanation: 'Tepung halus memiliki rasio luas permukaan terhadap volume yang sangat besar. Kontak antara butiran tepung dengan oksigen di udara sangat luas dan masif, sehingga jika terjadi percikan api, reaksi pembakaran berantai eksoterm berlangsung dalam hitungan milidetik (ledakan debu).'
  },

  // ================= PERTEMUAN 3 =================
  {
    id: 'kb3-pre-1',
    lessonId: 'kb-3',
    testType: 'PRE_TEST',
    category: 'DIAGNOSTIC',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 1,
    questionText: 'Peningkatan suhu sistem menyebabkan reaksi berjalan lebih cepat terutama karena...',
    options: [
      'A. Nilai Energi Aktivasi (Ea) reaksi menjadi lebih kecil.',
      'B. Energi kinetik rata-rata molekul meningkat sehingga semakin banyak molekul yang melampaui Ea.',
      'C. Ukuran molekul reaktan membesar sehingga mudah bertumbukan.',
      'D. Reaksi berubah dari endoterm menjadi eksoterm.'
    ],
    correctAnswer: 'B',
    explanation: 'Peningkatan suhu tidak mengubah nilai Ea reaksi, melainkan meningkatkan energi kinetik rata-rata molekul. Berdasarkan kurva distribusi Maxwell-Boltzmann, fraksi molekul yang memiliki energi kinetic ≥ Ea meningkat secara drastis.'
  },
  {
    id: 'kb3-pre-2',
    lessonId: 'kb-3',
    testType: 'PRE_TEST',
    category: 'DIAGNOSTIC',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 2,
    questionText: 'Pernyataan yang benar mengenai peran katalis dalam suatu reaksi kimia adalah...',
    options: [
      'A. Katalis menambah jumlah total produk yang dihasilkan di akhir reaksi.',
      'B. Katalis menurunkan Energi Aktivasi dengan menyediakan mekanisme jalur reaksi baru.',
      'C. Katalis ikut terpakai dan habis pada akhir reaksi.',
      'D. Katalis meningkatkan energi kinetik partikel reaktan.'
    ],
    correctAnswer: 'B',
    explanation: 'Katalis bekerja dengan cara menyediakan mekanisme reaksi alternatif yang memiliki Energi Aktivasi (Ea) lebih rendah. Katalis tidak mengubah entalpi reaksi (ΔH), tidak habis terpakai, dan tidak mengubah energi kinetik partikel.'
  },
  {
    id: 'kb3-post-1',
    lessonId: 'kb-3',
    testType: 'POST_TEST',
    category: 'HOTS',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 1,
    questionText: 'Suatu reaksi berlangsung 2 kali lebih cepat setiap kenaikan suhu sebesar 10°C. Jika pada suhu 20°C reaksi tersebut berlangsung selama 32 menit, berapa lama reaksi akan berlangsung pada suhu 50°C?',
    options: [
      'A. 16 menit',
      'B. 8 menit',
      'C. 4 menit',
      'D. 2 menit'
    ],
    correctAnswer: 'C',
    explanation: 'Rumus waktu reaksi: t2 = t1 × (1/n)^((T2 - T1) / ΔT). Diketahui t1 = 32 menit, n = 2, ΔT = 10°C, kenaikan suhu = 50°C - 20°C = 30°C. Pangkat = 30/10 = 3. Maka t2 = 32 × (1/2)^3 = 32 × 1/8 = 4 menit.'
  },
  {
    id: 'kb3-post-2',
    lessonId: 'kb-3',
    testType: 'POST_TEST',
    category: 'VISUAL',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 2,
    questionText: 'Diberikan grafik profil energi reaksi eksoterm: Puncak energi tanpa katalis = 80 kJ/mol, dengan katalis = 50 kJ/mol. Energi reaktan = 30 kJ/mol, Energi produk = 10 kJ/mol. Berapakah nilai Energi Aktivasi (Ea) reaksi dengan bantuan katalis?',
    options: [
      'A. 40 kJ/mol',
      'B. 20 kJ/mol',
      'C. 30 kJ/mol',
      'D. 50 kJ/mol'
    ],
    correctAnswer: 'B',
    explanation: 'Nilai Energi Aktivasi dengan katalis (Ea\') adalah selisih antara puncak energi jalur berkatalis dengan energi reaktan: Ea\' = 50 kJ/mol - 30 kJ/mol = 20 kJ/mol.'
  },

  // ================= PERTEMUAN 4 =================
  {
    id: 'kb4-pre-1',
    lessonId: 'kb-4',
    testType: 'PRE_TEST',
    category: 'DIAGNOSTIC',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 1,
    questionText: 'Apakah orde reaksi selalu sama dengan koefisien reaksi dalam persamaan kimia setara?',
    options: [
      'A. Ya, orde reaksi selalu sama dengan koefisien reaksi reaktan.',
      'B. Tidak, orde reaksi hanya dapat ditentukan melalui data eksperimen.',
      'C. Ya, tetapi hanya untuk reaksi fase gas.',
      'D. Tidak, orde reaksi selalu bernilai 1 untuk semua reaktan.'
    ],
    correctAnswer: 'B',
    explanation: 'Orde reaksi adalah bilangan pangkat yang menunjukkan pengaruh konsentrasi reaktan terhadap laju reaksi, dan hanya dapat ditentukan melalui data hasil percobaan (eksperimen), bukan dari koefisien stoikiometri.'
  },
  {
    id: 'kb4-pre-2',
    lessonId: 'kb-4',
    testType: 'PRE_TEST',
    category: 'MISCONCEPTION',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 2,
    questionText: 'Jika suatu reaksi memiliki orde nol terhadap reaktan A, artinya...',
    options: [
      'A. Reaksi tidak dapat berlangsung.',
      'B. Perubahan konsentrasi A tidak mempengaruhi laju reaksi.',
      'C. Laju reaksi sebanding dengan konsentrasi A.',
      'D. Laju reaksi menjadi nol jika konsentrasi A dinaikkan.'
    ],
    correctAnswer: 'B',
    explanation: 'Pada reaksi berorde nol, persamaan lajunya adalah v = k[A]^0 = k. Karena bilangan dipangkatkan nol sama dengan 1, perubahan konsentrasi zat A sama sekali tidak mengubah laju reaksi.'
  },
  {
    id: 'kb4-post-1',
    lessonId: 'kb-4',
    testType: 'POST_TEST',
    category: 'HOTS',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 1,
    questionText: 'Reaksi 2NO(g) + Cl2(g) → 2NOCl(g) memperoleh data:\n- Exp 1: [NO]=0.1 M, [Cl2]=0.1 M → v = 4 × 10^-3 M/s\n- Exp 2: [NO]=0.1 M, [Cl2]=0.2 M → v = 8 × 10^-3 M/s\n- Exp 3: [NO]=0.2 M, [Cl2]=0.1 M → v = 16 × 10^-3 M/s\nTentukan persamaan laju reaksi dan nilai konstanta k!',
    options: [
      'A. v = k[NO][Cl2] dan k = 0.4',
      'B. v = k[NO]^2[Cl2] dan k = 4.0 M^-2 s^-1',
      'C. v = k[NO][Cl2]^2 dan k = 40',
      'D. v = k[NO]^2[Cl2]^2 dan k = 0.04'
    ],
    correctAnswer: 'B',
    explanation: 'Dari Exp 1 & 2 ([NO] tetap): [Cl2] naik 2x, laju naik 2x (8/4) -> orde Cl2 = 1. Dari Exp 1 & 3 ([Cl2] tetap): [NO] naik 2x, laju naik 4x (16/4) -> (2)^x = 4 -> orde NO = 2. Maka persamaan laju: v = k[NO]^2[Cl2]. Nilai k = (4 × 10^-3) / [(0.1)^2 × (0.1)] = (4 × 10^-3) / (10^-3) = 4.0 M^-2 s^-1.'
  },
  {
    id: 'kb4-post-2',
    lessonId: 'kb-4',
    testType: 'POST_TEST',
    category: 'HOTS',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 2,
    questionText: 'Menggunakan persamaan v = 4.0 [NO]^2[Cl2], hitung laju reaksi jika [NO] = 0.3 M dan [Cl2] = 0.3 M!',
    options: [
      'A. 0.036 M/s',
      'B. 0.108 M/s',
      'C. 0.360 M/s',
      'D. 1.080 M/s'
    ],
    correctAnswer: 'B',
    explanation: 'Perhitungan: v = 4.0 × (0.3)^2 × (0.3) = 4.0 × 0.09 × 0.3 = 4.0 × 0.027 = 0.108 M/s.'
  },

  // ================= PERTEMUAN 5 =================
  {
    id: 'kb5-pre-1',
    lessonId: 'kb-5',
    testType: 'PRE_TEST',
    category: 'DIAGNOSTIC',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 1,
    questionText: 'Mengapa industri kimia tidak selalu menggunakan suhu sangat tinggi untuk mempercepat reaksi eksotermik?',
    options: [
      'A. Suhu tinggi merusak dinding reaktor besi.',
      'B. Suhu tinggi dapat menggeser kesetimbangan dan mengurangi jumlah produk akhir.',
      'C. Katalis tidak dapat bekerja pada suhu di atas 100°C.',
      'D. Suhu tinggi membuat molekul berhenti bertumbukan.'
    ],
    correctAnswer: 'B',
    explanation: 'Pada reaksi eksotermik (seperti Haber-Bosch, ΔH = -92 kJ/mol), peningkatan suhu memang mempercepat laju reaksi, namun menurut asas Le Chatelier akan menggeser posisi kesetimbangan ke arah reaktan, sehingga jumlah rendemen produk amonia yang dihasilkan justru anjlok.'
  },
  {
    id: 'kb5-post-1',
    lessonId: 'kb-5',
    testType: 'POST_TEST',
    category: 'HOTS',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 1,
    questionText: 'Sintesis amonia N2(g) + 3H2(g) ⇌ 2NH3(g) (ΔH = -92 kJ) membutuhkan laju reaksi tinggi dan hasil produk maksimal. Berdasarkan prinsip kinetika dan industri, kondisi paling optimal adalah...',
    options: [
      'A. Suhu sangat tinggi (1000°C) tanpa katalis.',
      'B. Suhu sedang (400-450°C), tekanan tinggi, dan katalis berbasis Besi/Rutenium.',
      'C. Suhu sangat dingin (0°C) dengan tekanan rendah.',
      'D. Tanpa katalis dan hanya mengandalkan luas permukaan reaktor.'
    ],
    correctAnswer: 'B',
    explanation: 'Kondisi optimum industri Haber-Bosch adalah suhu kompromi sedang (400-450°C) agar kesetimbangan tetap menghasilkan amonia, tekanan tinggi (150-200 atm) untuk menggeser reaksi ke arah koefisien lebih kecil (NH3), dan katalis besi untuk menurunkan energi aktivasi agar reaksi berlangsung cepat.'
  },
  {
    id: 'kb5-post-2',
    lessonId: 'kb-5',
    testType: 'POST_TEST',
    category: 'SUBMICROSCOPIC',
    type: 'MULTIPLE_CHOICE',
    orderIndex: 2,
    questionText: 'Jelaskan bagaimana kombinasi peningkatan konsentrasi reaktan, peningkatan suhu, dan penambahan katalis secara bersama-sama bekerja pada tingkat molekuler/submikroskopik untuk meningkatkan laju produksi!',
    options: [
      'A. Mengurangi massa atom reaktan sehingga bergerak lebih ringan di dalam ruang reaktor.',
      'B. Peningkatan konsentrasi menambah frekuensi tumbukan, kenaikan suhu menambah energi kinetik partikel melampaui Ea, dan katalis menurunkan ambang batas Ea.',
      'C. Mengubah reaksi kimia biasa menjadi reaksi nuklir fusi dingin.',
      'D. Mengganti wujud zat dari gas menjadi padat agar ikatan kovalen mudah terurai.'
    ],
    correctAnswer: 'B',
    explanation: 'Pada tingkat submikroskopik: peningkatan konsentrasi meningkatkan kerapatan partikel per volume (menambah frekuensi tumbukan); kenaikan suhu meningkatkan energi kinetik partikel sehingga fraksi partikel dengan energi ≥ Ea bertambah; dan katalis menyediakan jalur alternatif dengan Ea lebih rendah. Ketiganya bersinergi melipatgandakan jumlah tumbukan efektif per satuan waktu.'
  }
];

export const INITIAL_STUDENT_RESULTS: StudentResult[] = [
  {
    id: 'res-demo-1',
    studentId: 'student-1',
    studentName: 'Budi Pratama',
    studentEmail: 'budi@siswa.kinetix.id',
    lessonId: 'kb-1',
    preTestScore: 33.3,
    postTestScore: 100,
    nGain: 1.0, // (100 - 33.3)/(100 - 33.3) = 1.0
    score: 100,
    preAnswers: { 'kb1-pre-1': 'B', 'kb1-pre-2': 'A', 'kb1-pre-3': 'A' },
    postAnswers: { 'kb1-post-1': 'B', 'kb1-post-2': 'B' },
    reflectionAnswers: {
      0: 'Saya baru menyadari bahwa tumbukan belum tentu bereaksi jika arahnya salah.',
      1: 'Reaksi cepat memiliki energi kinetik tinggi dan orientasi tepat, sedangkan reaksi lambat tumbukannya banyak memantul.',
      2: 'Simulasi partikel 2D sangat jelas memperlihatkan molekul yang memantul kembali bila sudutnya meleset.'
    },
    stagesCompleted: ['PRE_TEST', 'ORIENTATION', 'SIMULATION', 'POST_TEST', 'REFLECTION'],
    feedback: 'Peningkatan pemahaman (N-Gain) luar biasa! Semua konsep submikroskopik dikuasai.',
    completedAt: '2026-10-10T09:15:00.000Z'
  },
  {
    id: 'res-demo-2',
    studentId: 'student-2',
    studentName: 'Aulia Zahra',
    studentEmail: 'aulia@siswa.kinetix.id',
    lessonId: 'kb-1',
    preTestScore: 66.7,
    postTestScore: 100,
    nGain: 1.0,
    score: 100,
    preAnswers: { 'kb1-pre-1': 'B', 'kb1-pre-2': 'C', 'kb1-pre-3': 'A' },
    postAnswers: { 'kb1-post-1': 'B', 'kb1-post-2': 'B' },
    reflectionAnswers: {
      0: 'Teori tumbukan efektif dan representasi simbolik koefisien stoikiometri.',
      1: 'Dengan membandingkan frekuensi tumbukan efektif dan besarnya energi aktivasi.',
      2: 'Bagian pergerakan partikel reaktan vs produk saat energi mencapai Ea.'
    },
    stagesCompleted: ['PRE_TEST', 'ORIENTATION', 'SIMULATION', 'POST_TEST', 'REFLECTION'],
    feedback: 'Sangat baik! Penguasaan materi dan analisis grafik sempurna.',
    completedAt: '2026-10-10T10:30:00.000Z'
  },
  {
    id: 'res-demo-3',
    studentId: 'student-3',
    studentName: 'Dimas Wahyu',
    studentEmail: 'dimas@siswa.kinetix.id',
    lessonId: 'kb-2',
    preTestScore: 50,
    postTestScore: 100,
    nGain: 1.0,
    score: 100,
    preAnswers: { 'kb2-pre-1': 'B', 'kb2-pre-2': 'A' },
    postAnswers: { 'kb2-post-1': 'B', 'kb2-post-2': 'B' },
    reflectionAnswers: {
      0: 'Tepung halus ternyata bisa meledak karena luas permukaan yang luar biasa besar!',
      1: 'Saya tadinya mengira serbuk dan kepingan memiliki luas kontak yang sama karena massanya sama.',
      2: 'Obat puyer diserap tubuh lebih cepat karena kontak pelarut lambung langsung masif.'
    },
    stagesCompleted: ['PRE_TEST', 'ORIENTATION', 'SIMULATION', 'POST_TEST', 'REFLECTION'],
    feedback: 'Analisis fenomena kontekstual debu dan obat puyer sangat mendalam.',
    completedAt: '2026-10-11T14:20:00.000Z'
  }
];
