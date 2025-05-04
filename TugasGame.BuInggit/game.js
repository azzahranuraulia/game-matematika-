//aset
const ASSETS = {
    images: {
        backgroundMain: 'assets/bg.png',
        backgroundNext: 'assets/bg_next.png',
        playButton: 'assets/play.png',
        titleGame: 'assets/judul.png',
        creditButton : 'assets/creditButton.png',
        apple: 'assets/apple.png',
        grape: 'assets/grape.png',
        mango: 'assets/mango.png',
        orange: 'assets/orange.png',
        strawberry: 'assets/strawberry.png',
        basket: 'assets/basket.png',
        levelBackground: 'assets/level_bg.png',
        level1Icon: 'assets/level1_icon.png',
        level2Icon: 'assets/level2_icon.png',
        level3Icon: 'assets/level3_icon.png',
        level4Icon: 'assets/level4_icon.png',
        level5Icon: 'assets/level5_icon.png',
        backgroundCongratulations : 'assets/backgroundCongratulations.png',
        backgroudcreadit1 :'assets/backgroudcreadit1.jpg',
        backgroudcreadit2 :'assets/backgroudcreadit2.jpg',
        backgroudcreadit3 :'assets/backgroudcreadit3.jpg',
    },
    audio: {
        playButtonSound: 'assets/play_button.mp3', // Suara tombol mulai
        correctSound: 'assets/correct.mp3',       // Suara jawaban benar
        wrongSound: 'assets/wrong.mp3',           // Suara jawaban salah
        levelUpSound: 'assets/level_up.mp3', //button pencet level 
        gameBackground1: 'assets/game_background1.mp3', // Musik latar Scene Utama
        levelBackground: 'assets/levelbackground.mp3', // Musik latar level
        gameBackground2: 'assets/game_background2.mp3', // Musik latar Scene Permainan
        gameOverSound: 'assets/game_over.mp3', //pada saat game over 
        levelSelectSound: 'assets/level_select.mp3' , // Suara pilihan level
        dragSound: 'assets/dragSound.mp3',  // Suara seret apel
        successSound: 'assets/success.mp3',  // Suara untuk CongratulationsScene
        bgMusic1 : 'assets/backgroundMusic1.mp3',//suara untuk kredit
        bgMusic2 : 'assets/backgroundMusic2.mp3',//suara untuk kredit
        bgMusic3 : 'assets/backgroundMusic3.mp3',//suara untuk kredit
        newAudio :'assets/newAudio.mp3', //suara pada saat jawaaban benar 
        wrongSound :'assets/wrongSound.mp3',//suara pada saat jawaban yag salah 
    }    
};

// Memuat aset
function preloadAssets(scene) {
    // Memuat gambar aset
    Object.keys(ASSETS.images).forEach(key => {
        scene.load.image(key, ASSETS.images[key]);
    });

    // Memuat audio aset
    Object.keys(ASSETS.audio).forEach(key => {
        scene.load.audio(key, ASSETS.audio[key]);
    });
}

// Scene Utama
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        preloadAssets(this);
    }

    create() {
        this.add.image(680, 300, 'backgroundMain').setDisplaySize(1360, 600);

        const titleGame = this.add.image(680, 150, 'titleGame').setScale(0.6);
        this.tweens.add({
            targets: titleGame,
            y: 120,
            ease: 'Sine.easeInOut',
            duration: 1000,
            delay: 300
        });

        const playButton = this.add.sprite(680, 350, 'playButton').setDisplaySize(150, 150).setScale(0.6);
        this.tweens.add({
            targets: playButton,
            scaleX: 0.7,
            scaleY: 0.7,
            ease: 'Sine.easeInOut',
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Tambahkan musik latar
        const gameBackgroundMusic = this.sound.add('gameBackground1', { loop: true, volume: 0.5 });
        gameBackgroundMusic.play();

        const playButtonSound = this.sound.add('playButtonSound');
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            playButtonSound.play();
            gameBackgroundMusic.stop(); // Matikan musik latar sebelum berpindah scene
            this.scene.start('LevelSelectionScene'); // Ganti scene ke Pemilihan Level
        });

        // Tambahkan tombol untuk menuju ke CreditScene1 di pojok kiri atas
        const creditButton = this.add.image(50, 50, 'creditButton') // Ganti 'creditButton' dengan gambar yang sesuai
            .setScale(0.5)
            .setInteractive(); // Membuat gambar interaktif

        creditButton.on('pointerdown', () => {
            gameBackgroundMusic.stop(); // Matikan musik latar sebelum berpindah scene
            this.scene.start('CreditScene1'); // Ganti scene ke CreditScene1
        });
    }
} 

// Scene Pemilihan Level
class LevelSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectionScene' });
    }

    preload() {
        // Memuat gambar latar belakang utama
        this.load.image('levelBackground', 'assets/level_bg.png'); // Menggunakan nama gambar level_bg.png
        preloadAssets(this); // Muat asset lain seperti ikon level, musik, dll.
    }

    create() {
        // Menambahkan latar belakang utama
        this.add.image(680, 300, 'levelBackground').setDisplaySize(1360, 600);

        // Menambahkan teks "Pilih Level"
        const title = this.add.text(680, 100, 'Pilih Level', {
            fontSize: '30px',
            fill: '#fff',
            fontStyle: 'bold',
            align: 'center',
            stroke: '#228B22',
            strokeThickness: 8,
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#000',
                blur: 5,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5);

        // Hitung posisi tengah layar
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Ikon level baris pertama (1, 2, 3)
        const level1Icon = this.add.image(centerX - 200, centerY - 50, 'level1Icon').setScale(0.5).setInteractive();
        const level2Icon = this.add.image(centerX, centerY - 50, 'level2Icon').setScale(0.5).setInteractive();
        const level3Icon = this.add.image(centerX + 200, centerY - 50, 'level3Icon').setScale(0.5).setInteractive();

        // Ikon level baris kedua (4, 5) - Pindah lebih ke bawah
        const level4Icon = this.add.image(centerX - 100, centerY + 150, 'level4Icon').setScale(0.5).setInteractive();
        const level5Icon = this.add.image(centerX + 100, centerY + 150, 'level5Icon').setScale(0.5).setInteractive();

        // Tambahkan musik latar
        const levelBackgroundMusic = this.sound.add('levelBackground', { loop: true, volume: 0.5 });
        levelBackgroundMusic.play();

        const levelSelectSound = this.sound.add('levelSelectSound');

        // Event untuk ikon level
        level1Icon.on('pointerdown', () => {
            levelSelectSound.play();
            levelBackgroundMusic.stop();
            this.scene.start('NextScene', { level: 1 });
        });

        level2Icon.on('pointerdown', () => {
            levelSelectSound.play();
            levelBackgroundMusic.stop();
            this.scene.start('NextScenelevel2', { level: 2 });
        });

        level3Icon.on('pointerdown', () => {
            levelSelectSound.play();
            levelBackgroundMusic.stop();
            this.scene.start('NextScenelevel3', { level: 3 });
        });

        level4Icon.on('pointerdown', () => {
            levelSelectSound.play();
            levelBackgroundMusic.stop();
            this.scene.start('NextScenelevel4', { level: 4 });
        });

        level5Icon.on('pointerdown', () => {
            levelSelectSound.play();
            levelBackgroundMusic.stop();
            this.scene.start('NextScenelevel5', { level: 5 });
        });

        // Tombol "Kembali"
        const backButton = this.add.text(100, 50, '<- Kembali', {
            fontSize: '24px',
            fill: '#fff', // Warna teks putih
            backgroundColor: '#28a745', // Warna hijau
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            align: 'center',
            borderRadius: 5 // Efek sudut melengkung
        }).setInteractive().setOrigin(0.5);

        backButton.on('pointerdown', () => {
            levelBackgroundMusic.stop();
            this.scene.start('MainScene'); // Kembali ke Scene Utama
        });

        // Efek hover pada tombol
        backButton.on('pointerover', () => {
            backButton.setStyle({ backgroundColor: '#218838' }); // Hijau lebih gelap
        });

        backButton.on('pointerout', () => {
            backButton.setStyle({backgroundColor: '#28a745' }); // Hijau normal
        });
    }
}

// Scene Level 1
class NextScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NextScene' });
    }

    create(data) {
        // Menambahkan background ke scene ini dengan posisi (680, 300) dan ukuran 1360x600
        this.add.image(680, 300, 'backgroundNext').setDisplaySize(1360, 600);

        // Menambahkan teks pertanyaan ke scene
        this.add.text(680, 100, 'Berapakah 1 + 2?', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            fill: '#ff6347', // warna merah
            align: 'center',
            stroke: '#000',
            strokeThickness: 4, // memberi tepi hitam pada teks
        }).setOrigin(0.5).setShadow(3, 3, '#32CD32', 5); // Menambahkan efek bayangan berwarna hijau

        // Menambahkan gambar keranjang pada posisi (100, 548) dengan ukuran 200x200
        const keranjang = this.add.image(100, 548, 'basket').setDisplaySize(200, 200).setOrigin(0.5);

        // Menambahkan teks tombol "Benar" dan memberi efek interaktif
        const tombolBenar = this.add.text(250, 531, 'Benar', {
            fontSize: '28px',
            fontFamily: 'Arial',
            fill: '#fff', // teks berwarna putih
            backgroundColor: '#4CAF50', // latar belakang tombol berwarna hijau
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 20, // membuat sudut tombol bulat
            align: 'center',
            stroke: '#3E8E41', // memberi tepi hijau gelap pada teks tombol
            strokeThickness: 4, // ketebalan tepi
        }).setInteractive().setOrigin(0.5); // Mengaktifkan interaktivitas tombol

        // Membuat array berisi objek apel yang akan ditampilkan di scene
        const apples = [
            this.add.image(300, 200, 'apple').setScale(0.3),
            this.add.image(400, 200, 'apple').setScale(0.3),
            this.add.image(500, 200, 'apple').setScale(0.3),
            this.add.image(600, 200, 'apple').setScale(0.3),
            this.add.image(700, 200, 'apple').setScale(0.3),
            this.add.image(800, 200, 'apple').setScale(0.3),
            this.add.image(900, 200, 'apple').setScale(0.3),
            this.add.image(1000, 200, 'apple').setScale(0.3),
            this.add.image(1100, 200, 'apple').setScale(0.3),
            this.add.image(1200, 200, 'apple').setScale(0.3),
            this.add.image(300, 300, 'apple').setScale(0.3),
            this.add.image(400, 300, 'apple').setScale(0.3),
            this.add.image(500, 300, 'apple').setScale(0.3),
            this.add.image(600, 300, 'apple').setScale(0.3),
            this.add.image(700, 300, 'apple').setScale(0.3),
            this.add.image(800, 300, 'apple').setScale(0.3),
            this.add.image(900, 300, 'apple').setScale(0.3),
            this.add.image(1000, 300, 'apple').setScale(0.3),
            this.add.image(1100, 300, 'apple').setScale(0.3),
            this.add.image(1200, 300, 'apple').setScale(0.3),
        ];

        // Variabel untuk menghitung jumlah apel yang sudah terkumpul dan skor
        let apelTerkumpul = 0;
        let skor = 0;

        // Menambahkan musik latar yang dimainkan secara loop
        const musikLatar = this.sound.add('gameBackground2');
        musikLatar.play({ loop: true });

        // Menambahkan suara drag yang diputar ketika pengguna menarik objek apel
        const suaraDrag = this.sound.add('dragSound');

        // Array untuk menyimpan apel kecil yang telah dimasukkan ke dalam keranjang
        let apelKecilArray = [];

        // Menetapkan setiap apel sebagai objek yang dapat diseret (draggable)
        apples.forEach(apel => {
            apel.setInteractive(); // Membuat apel dapat diinteraksi
            apel.telahMasukKeranjang = false; // Menandakan apel belum masuk ke keranjang
            this.input.setDraggable(apel); // Menetapkan apel sebagai objek draggable

            // Ketika drag dimulai
            this.input.on('dragstart', (pointer, gameObject) => {
                // Jika apel sudah ada di keranjang, drag tidak bisa dilakukan
                if (gameObject.telahMasukKeranjang) {
                    gameObject.input.enabled = false;
                    return;
                }
                gameObject.setScale(0.35); // Mengubah ukuran apel saat diseret
                suaraDrag.play(); // Memainkan suara drag
            });

            // Ketika objek sedang diseret (dragging)
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                if (gameObject.telahMasukKeranjang) return;
                gameObject.x = dragX; // Mengatur posisi apel mengikuti posisi drag
                gameObject.y = dragY;
            });

            // Ketika drag selesai (dragend)
            this.input.on('dragend', (pointer, gameObject) => {
                if (gameObject.telahMasukKeranjang) return;
                gameObject.setScale(0.3); // Mengembalikan ukuran apel ke ukuran normal

                // Mendapatkan batas area keranjang dan apel
                const batasKeranjang = keranjang.getBounds();
                const batasApel = gameObject.getBounds();

                // Cek apakah apel berinteraksi dengan keranjang
                if (Phaser.Geom.Intersects.RectangleToRectangle(batasApel, batasKeranjang)) {
                    gameObject.telahMasukKeranjang = true; // Menandakan apel sudah masuk keranjang
                    apelTerkumpul++; // Menambah jumlah apel yang terkumpul
                    skor++; // Menambah skor

                    // Menghapus apel besar yang sedang diseret
                    gameObject.destroy();

                    // Menambahkan apel kecil sesuai jumlah apel yang terkumpul
                    for (let i = 0; i < apelTerkumpul; i++) {
                        // Menghitung posisi apel kecil dengan offset
                        const offsetX = (i % 5) * 30; // Posisi apel kecil secara horizontal (ke samping)
                        const offsetY = Math.floor(i / 5) * 25; // Posisi apel kecil secara vertikal (ke atas)
                        const posisi = { x: keranjang.x - 60 + offsetX, y: keranjang.y - 40 + offsetY };

                        // Membuat apel kecil dan menambahkannya ke dalam array apelKecilArray
                        const apelKecil = this.add.image(posisi.x, posisi.y, 'apple').setScale(0.2);
                        apelKecil.setAlpha(0.8); // Menurunkan transparansi apel kecil sedikit
                        apelKecilArray.push(apelKecil); // Menyimpan apel kecil ke dalam array
                    }
                } else {
                    // Jika apel tidak berada dalam keranjang, kembalikan posisi apel ke posisi awal
                    gameObject.setPosition(gameObject.input.dragStartX, gameObject.input.dragStartY);
                }
            });
        });

        // Ketika tombol "Benar" ditekan
        tombolBenar.on('pointerdown', () => {
            // Mengecek apakah jumlah apel yang terkumpul sesuai dengan jumlah yang benar (3)
            const isJawabanBenar = apelTerkumpul === 3;

            // Menghentikan musik latar
            if (musikLatar.isPlaying) musikLatar.stop();

            // Jika jawaban benar, pergi ke scene lain dengan status benar
            if (isJawabanBenar) {
                this.sound.add('correctSound').play(); // Memainkan suara benar
                this.scene.start('AnotherScene', { apelTerkumpul, skor, isJawabanBenar: true });
            } else {
                this.sound.add('wrongSound').play(); // Memainkan suara salah
                this.scene.start('AnotherScene', { apelTerkumpul, skor, isJawabanBenar: false });
            }
        });

        // Membuat tombol kembali yang mengarah ke scene LevelSelectionScene
        const tombolKembali = this.add.text(100, 50, '<- Kembali', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#8B4513',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            align: 'center',
            borderRadius: 5
        }).setInteractive().setOrigin(0.5);

        // Ketika tombol kembali ditekan
        tombolKembali.on('pointerdown', () => {
            musikLatar.stop(); // Menghentikan musik latar
            this.scene.start('LevelSelectionScene'); // Memulai scene LevelSelectionScene
        });

        // Ketika pointer berada di atas tombol
        tombolKembali.on('pointerover', () => {
            tombolKembali.setStyle({ backgroundColor: '#6B3E2F' }); // Mengubah warna tombol
        });

        // Ketika pointer keluar dari tombol
        tombolKembali.on('pointerout', () => {
            tombolKembali.setStyle({ backgroundColor: '#8B4513' }); // Mengembalikan warna tombol
        });
    }
}

// Tombol Benar dan salah level 1
class AnotherScene extends Phaser.Scene {
    constructor() {
        super({ key: 'AnotherScene' });
    }

    create(data) {
        // Membuat latar belakang gradien warna hijau dan merah
        const graphics = this.add.graphics();
        const gradientRect = new Phaser.Geom.Rectangle(0, 0, 1360, 600);

        // Warna gradien latar (atas ke bawah) hijau ke merah
        graphics.fillGradientStyle(0x008000, 0x008000, 0xff0000, 0xff0000, 1); // Hijau ke Merah
        graphics.fillRectShape(gradientRect);

        // Dekorasi menggunakan bentuk lingkaran warna-warni
        graphics.fillStyle(0xff69b4, 1); // Warna pink
        graphics.fillCircle(300, 150, 50); // Lingkaran besar di kiri atas
        graphics.fillCircle(1060, 450, 50); // Lingkaran besar di kanan bawah

        graphics.fillStyle(0x87ceeb, 1); // Warna biru muda
        graphics.fillCircle(500, 100, 30); // Lingkaran kecil di kiri atas
        graphics.fillCircle(1200, 200, 40); // Lingkaran kecil di kanan atas

        // Tambahkan audio berdasarkan jawaban benar atau salah
        let audioToPlay;
        if (data.isJawabanBenar) {
            audioToPlay = this.sound.add('newAudio'); // Audio untuk jawaban benar
        } else {
            audioToPlay = this.sound.add('wrongSound'); // Audio untuk jawaban salah
        }
        audioToPlay.play(); // Mainkan audio

        // Teks utama
        if (data.isJawabanBenar) {
            this.add.text(680, 300, `🎉 Anda benar! 🎉\nJumlah apel: ${data.apelTerkumpul}\nPoin: ${data.skor}`, {
                fontSize: '36px',
                fontFamily: 'Comic Sans MS',
                fill: '#008000',
                align: 'center',
                stroke: '#fff',
                strokeThickness: 4,
            })
            .setOrigin(0.5)
            .setShadow(2, 2, '#000', 3);
        } else {
            this.add.text(680, 300, `❌ Jawaban salah! ❌\nJumlah apel: ${data.apelTerkumpul}\nPoin: ${data.skor}\nPetunjuk: Pastikan jawabannya dengan teliti`, {
                fontSize: '36px',
                fontFamily: 'Comic Sans MS',
                fill: '#ff0000',
                align: 'center',
                stroke: '#000',
                strokeThickness: 4,
            })
            .setOrigin(0.5);
        }

        // Membuat tombol "Kembali"
        const tombolGrafisKembali = this.add.graphics();
        const tombolLebarKembali = 150;
        const tombolTinggiKembali = 40;
        const tombolXKembali = 100;
        const tombolYKembali = 50;

        // Gambar latar belakang tombol "Kembali"
        tombolGrafisKembali.fillStyle(0x8B4513, 1);
        tombolGrafisKembali.fillRoundedRect(
            tombolXKembali - tombolLebarKembali / 2,
            tombolYKembali - tombolTinggiKembali / 2,
            tombolLebarKembali,
            tombolTinggiKembali,
            5
        );

        // Tambahkan teks di atas tombol "Kembali"
        const tombolTeksKembali = this.add.text(tombolXKembali, tombolYKembali, '<- Kembali', {
            fontSize: '18px',
            fontFamily: 'Arial',
            fill: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        // Event Listener untuk tombol "Kembali"
        tombolTeksKembali.on('pointerdown', () => {
            if (audioToPlay.isPlaying) {
                audioToPlay.stop(); // Hentikan audio
            }
            this.scene.start('NextScene'); // Kembali ke NextScene
        });

        // Hanya tambahkan tombol "Lanjutkan" jika jawaban benar
        if (data.isJawabanBenar) {
            const tombolGrafis = this.add.graphics();
            const tombolLebar = 200;
            const tombolTinggi = 50;

            const tombolX = this.cameras.main.width - tombolLebar - 3;
            const tombolY = this.cameras.main.height - 50;

            tombolGrafis.fillStyle(0x4CAF50, 1);
            tombolGrafis.fillRoundedRect(
                tombolX - tombolLebar / 2,
                tombolY - tombolTinggi / 2,
                tombolLebar,
                tombolTinggi,
                10
            );

            const tombolTeks = this.add.text(tombolX, tombolY, 'Lanjutkan', {
                fontSize: '24px',
                fontFamily: 'Arial',
                fill: '#ffffff',
            }).setOrigin(0.5).setInteractive();

            // Event Listener untuk tombol "Lanjutkan"
            tombolTeks.on('pointerdown', () => {
                if (audioToPlay.isPlaying) {
                    audioToPlay.stop(); // Hentikan audio
                }
                this.scene.start('NextScenelevel2'); // Pindah ke NextScenelevel2
            });
        }
    }
}

// Scene level 2
class NextScenelevel2 extends Phaser.Scene {
    constructor() {
        super({ key: 'NextScenelevel2' });
    }

    create(data) {
        // Menambahkan background ke scene ini
        this.add.image(680, 300, 'backgroundNext').setDisplaySize(1360, 600);

        // Menambahkan teks pertanyaan ke scene
        this.add.text(680, 100, 'Berapakah 10 - 5?', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            fill: '#ff6347', // warna merah
            align: 'center',
            stroke: '#000',
            strokeThickness: 4, // memberi tepi hitam pada teks
        }).setOrigin(0.5).setShadow(3, 3, '#32CD32', 5); // Menambahkan efek bayangan berwarna hijau

        // Menambahkan gambar keranjang pada posisi (100, 548) dengan ukuran 200x200
        const keranjang = this.add.image(100, 548, 'basket').setDisplaySize(200, 200).setOrigin(0.5);

        // Menambahkan teks tombol "Benar" dan memberi efek interaktif
        const tombolBenar = this.add.text(250, 531, 'Benar', {
            fontSize: '28px',
            fontFamily: 'Arial',
            fill: '#fff', // teks berwarna putih
            backgroundColor: '#4CAF50', // latar belakang tombol berwarna hijau
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 20, // membuat sudut tombol bulat
            align: 'center',
            stroke: '#3E8E41', // memberi tepi hijau gelap pada teks tombol
            strokeThickness: 4, // ketebalan tepi
        }).setInteractive().setOrigin(0.5); // Mengaktifkan interaktivitas tombol

        // Membuat array berisi objek grape yang akan ditampilkan di scene
        const grapes = [
            this.add.image(300, 200, 'grape').setScale(0.3),
            this.add.image(400, 200, 'grape').setScale(0.3),
            this.add.image(500, 200, 'grape').setScale(0.3),
            this.add.image(600, 200, 'grape').setScale(0.3),
            this.add.image(700, 200, 'grape').setScale(0.3),
            this.add.image(800, 200, 'grape').setScale(0.3),
            this.add.image(900, 200, 'grape').setScale(0.3),
            this.add.image(1000, 200, 'grape').setScale(0.3),
            this.add.image(1100, 200, 'grape').setScale(0.3),
            this.add.image(1200, 200, 'grape').setScale(0.3),
            this.add.image(300, 300, 'grape').setScale(0.3),
            this.add.image(400, 300, 'grape').setScale(0.3),
            this.add.image(500, 300, 'grape').setScale(0.3),
            this.add.image(600, 300, 'grape').setScale(0.3),
            this.add.image(700, 300, 'grape').setScale(0.3),
            this.add.image(800, 300, 'grape').setScale(0.3),
            this.add.image(900, 300, 'grape').setScale(0.3),
            this.add.image(1000, 300, 'grape').setScale(0.3),
            this.add.image(1100, 300, 'grape').setScale(0.3),
            this.add.image(1200, 300, 'grape').setScale(0.3),
        ];

        // Variabel untuk menghitung jumlah grape yang sudah terkumpul dan skor
        let grapeTerkumpul = 0;
        let skor = 0;

        // Menambahkan musik latar yang dimainkan secara loop
        const musikLatar = this.sound.add('gameBackground2');
        musikLatar.play({ loop: true });

        // Menambahkan suara drag yang diputar ketika pengguna menarik objek grape
        const suaraDrag = this.sound.add('dragSound');

        // Array untuk menyimpan grape kecil yang telah dimasukkan ke dalam keranjang
        let grapeKecilArray = [];

        // Menetapkan setiap grape sebagai objek yang dapat diseret (draggable)
        grapes.forEach(grape => {
            grape.setInteractive(); // Membuat grape dapat diinteraksi
            grape.telahMasukKeranjang = false; // Menandakan grape belum masuk ke keranjang
            this.input.setDraggable(grape); // Menetapkan grape sebagai objek draggable

            // Ketika drag dimulai
            this.input.on('dragstart', (pointer, gameObject) => {
                // Jika grape sudah ada di keranjang, drag tidak bisa dilakukan
                if (gameObject.telahMasukKeranjang) {
                    gameObject.input.enabled = false;
                    return;
                }
                gameObject.setScale(0.35); // Mengubah ukuran grape saat diseret
                suaraDrag.play(); // Memainkan suara drag
            });

            // Ketika objek sedang diseret (dragging)
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                if (gameObject.telahMasukKeranjang) return;
                gameObject.x = dragX; // Mengatur posisi grape mengikuti posisi drag
                gameObject.y = dragY;
            });

            // Ketika drag selesai (dragend)
            this.input.on('dragend', (pointer, gameObject) => {
                if (gameObject.telahMasukKeranjang) return;
                gameObject.setScale(0.3); // Mengembalikan ukuran grape ke ukuran normal

                // Mendapatkan batas area keranjang dan grape
                const batasKeranjang = keranjang.getBounds();
                const batasGrape = gameObject.getBounds();

                // Cek apakah grape berinteraksi dengan keranjang
                if (Phaser.Geom.Intersects.RectangleToRectangle(batasGrape, batasKeranjang)) {
                    gameObject.telahMasukKeranjang = true; // Menandakan grape sudah masuk keranjang
                    grapeTerkumpul++; // Menambah jumlah grape yang terkumpul
                    skor++; // Menambah skor

                    // Menghapus grape besar yang sedang diseret
                    gameObject.destroy();

                    // Menambahkan grape kecil sesuai jumlah grape yang terkumpul
                    for (let i = 0; i < grapeTerkumpul; i++) {
                        // Menghitung posisi grape kecil dengan offset
                        const offsetX = (i % 5) * 30; // Posisi grape kecil secara horizontal (ke samping)
                        const offsetY = Math.floor(i / 5) * 25; // Posisi grape kecil secara vertikal (ke atas)
                        const posisi = { x: keranjang.x - 60 + offsetX, y: keranjang.y - 40 + offsetY };

                        // Membuat grape kecil dan menambahkannya ke dalam array grapeKecilArray
                        const grapeKecil = this.add.image(posisi.x, posisi.y, 'grape').setScale(0.2);
                        grapeKecil.setAlpha(0.8); // Menurunkan transparansi grape kecil sedikit
                        grapeKecilArray.push(grapeKecil); // Menyimpan grape kecil ke dalam array
                    }
                } else {
                    // Jika grape tidak berada dalam keranjang, kembalikan posisi grape ke posisi awal
                    gameObject.setPosition(gameObject.input.dragStartX, gameObject.input.dragStartY);
                }
            });
        });

        // Ketika tombol "Benar" ditekan
        tombolBenar.on('pointerdown', () => {
            // Mengecek apakah jumlah grape yang terkumpul sesuai dengan jumlah yang benar (5)
            const isJawabanBenar = grapeTerkumpul === 5;

            // Menghentikan musik latar
            if (musikLatar.isPlaying) musikLatar.stop();

            // Jika jawaban benar, pergi ke scene lain dengan status benar
            if (isJawabanBenar) {
                this.sound.add('correctSound').play(); // Memainkan suara benar
                this.scene.start('AnotherScene1', { grapeTerkumpul, skor, isJawabanBenar: true });
            } else {
                this.sound.add('wrongSound').play(); // Memainkan suara salah
                this.scene.start('AnotherScene1', { grapeTerkumpul, skor, isJawabanBenar: false });
            }
        });

                    // Membuat tombol kembali yang mengarah ke scene LevelSelectionScene
                    const tombolKembali = this.add.text(100, 50, '<- Kembali', {
                        fontSize: '24px',
                        fill: '#fff',
                        backgroundColor: '#8B4513',
                        padding: { left: 10, right: 10, top: 5, bottom: 5 },
                        align: 'center',
                        borderRadius: 5
                    }).setInteractive().setOrigin(0.5);
        
                    // Ketika tombol kembali ditekan
                    tombolKembali.on('pointerdown', () => {
                        musikLatar.stop(); // Menghentikan musik latar
                        this.scene.start('LevelSelectionScene'); // Memulai scene LevelSelectionScene
                    });
        
                    // Ketika pointer berada di atas tombol
                    tombolKembali.on('pointerover', () => {
                        tombolKembali.setStyle({ backgroundColor: '#6B3E2F' }); // Mengubah warna tombol
                    });
        
                    // Ketika pointer keluar dari tombol
                    tombolKembali.on('pointerout', () => {
                        tombolKembali.setStyle({ backgroundColor: '#8B4513' }); // Mengembalikan warna tombol
                    });
                }
}            

// Tombol Benar dan salah level 2
class AnotherScene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'AnotherScene1' });
    }

    create(data) {
        // Membuat latar belakang gradien warna
        const graphics = this.add.graphics();
        const gradientRect = new Phaser.Geom.Rectangle(0, 0, 1360, 600);

        // Warna gradien latar (atas ke bawah)
        graphics.fillGradientStyle(0x8A2BE2, 0x8A2BE2, 0x32CD32, 0x32CD32, 1);
        graphics.fillRectShape(gradientRect);

        // Dekorasi menggunakan bentuk lingkaran warna-warni
        graphics.fillStyle(0x8A2BE2, 1); // Warna ungu
        graphics.fillCircle(300, 150, 50); // Lingkaran besar di kiri atas
        graphics.fillCircle(1060, 450, 50); // Lingkaran besar di kanan bawah

        graphics.fillStyle(0x7FFF00, 1); // Warna hijau muda
        graphics.fillCircle(500, 100, 30); // Lingkaran kecil di kiri atas
        graphics.fillCircle(1200, 200, 40); // Lingkaran kecil di kanan atas

        // Menambahkan audio berdasarkan jawaban benar atau salah
        let audioToPlay;
        if (data.isJawabanBenar) {
            audioToPlay = this.sound.add('newAudio'); // Audio untuk jawaban benar
        } else {
            audioToPlay = this.sound.add('wrongSound'); // Audio untuk jawaban salah
        }
        audioToPlay.play(); // Memainkan audio

        // Teks utama
        if (data.isJawabanBenar) {
            this.add.text(680, 300, `🎉 Anda benar! 🎉\nJumlah grape: ${data.grapeTerkumpul}\nPoin: ${data.skor}`, {
                fontSize: '36px',
                fontFamily: 'Comic Sans MS',
                fill: '#008000',
                align: 'center',
                stroke: '#fff',
                strokeThickness: 4,
            })
            .setOrigin(0.5)
            .setShadow(2, 2, '#000', 3);
        } else {
            this.add.text(680, 300, `❌ Jawaban salah! ❌\nJumlah grape: ${data.grapeTerkumpul}\nPoin: ${data.skor}\nPetunjuk: Pastikan jawabannya dengan teliti`, {
                fontSize: '36px',
                fontFamily: 'Comic Sans MS',
                fill: '#ff0000',
                align: 'center',
                stroke: '#000',
                strokeThickness: 4,
            })
            .setOrigin(0.5);
        }

        // Membuat tombol "Kembali"
        const tombolGrafisKembali = this.add.graphics();
        const tombolLebarKembali = 150;
        const tombolTinggiKembali = 40;
        const tombolXKembali = 100;
        const tombolYKembali = 50;

        // Gambar latar belakang tombol "Kembali"
        tombolGrafisKembali.fillStyle(0x8B4513, 1);
        tombolGrafisKembali.fillRoundedRect(
            tombolXKembali - tombolLebarKembali / 2,
            tombolYKembali - tombolTinggiKembali / 2,
            tombolLebarKembali,
            tombolTinggiKembali,
            5
        );

        // Tambahkan teks di atas tombol "Kembali"
        const tombolTeksKembali = this.add.text(tombolXKembali, tombolYKembali, '<- Kembali', {
            fontSize: '18px',
            fontFamily: 'Arial',
            fill: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        // Event Listener untuk tombol "Kembali"
        tombolTeksKembali.on('pointerdown', () => {
            if (audioToPlay.isPlaying) {
                audioToPlay.stop(); // Hentikan audio
            }
            this.scene.start('NextScenelevel2'); // Kembali ke NextScene
        });

        // Hanya tambahkan tombol "Lanjutkan" jika jawaban benar
        if (data.isJawabanBenar) {
            const tombolGrafis = this.add.graphics();
            const tombolLebar = 200;
            const tombolTinggi = 50;

            const tombolX = this.cameras.main.width - tombolLebar - 3;
            const tombolY = this.cameras.main.height - 50;

            tombolGrafis.fillStyle(0x4CAF50, 1);
            tombolGrafis.fillRoundedRect(
                tombolX - tombolLebar / 2,
                tombolY - tombolTinggi / 2,
                tombolLebar,
                tombolTinggi,
                10
            );

            const tombolTeks = this.add.text(tombolX, tombolY, 'Lanjutkan', {
                fontSize: '24px',
                fontFamily: 'Arial',
                fill: '#ffffff',
            }).setOrigin(0.5).setInteractive();

            // Event Listener untuk tombol "Lanjutkan"
            tombolTeks.on('pointerdown', () => {
                if (audioToPlay.isPlaying) {
                    audioToPlay.stop(); // Hentikan audio
                }
                this.scene.start('NextScenelevel3'); // Pindah ke NextScenelevel3
            });
        }
    }
}

// Scene level 3
class NextScenelevel3 extends Phaser.Scene {
    constructor() {
        super({ key: 'NextScenelevel3' });
    }

    create(data) {
        // Menambahkan background ke scene ini
        this.add.image(680, 300, 'backgroundNext').setDisplaySize(1360, 600);

        // Menambahkan teks pertanyaan ke scene
        this.add.text(680, 100, 'Berapakah 15 - 5?', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            fill: '#ff6347', // warna merah
            align: 'center',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5).setShadow(3, 3, '#32CD32', 5); // Bayangan hijau

        // Menambahkan gambar keranjang pada posisi (100, 548) dengan ukuran 200x200
        const keranjang = this.add.image(100, 548, 'basket').setDisplaySize(200, 200).setOrigin(0.5);

        // Menambahkan teks tombol "Benar" dan memberi efek interaktif
        const tombolBenar = this.add.text(250, 531, 'Benar', {
            fontSize: '28px',
            fontFamily: 'Arial',
            fill: '#fff',
            backgroundColor: '#4CAF50',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 20,
            align: 'center',
            stroke: '#3E8E41',
            strokeThickness: 4,
        }).setInteractive().setOrigin(0.5);

        // Membuat array berisi objek strawberry yang akan ditampilkan
        const strawberries = [
            this.add.image(300, 200, 'strawberry').setScale(0.1),
            this.add.image(400, 200, 'strawberry').setScale(0.1),
            this.add.image(500, 200, 'strawberry').setScale(0.1),
            this.add.image(600, 200, 'strawberry').setScale(0.1),
            this.add.image(700, 200, 'strawberry').setScale(0.1),
            this.add.image(800, 200, 'strawberry').setScale(0.1),
            this.add.image(900, 200, 'strawberry').setScale(0.1),
            this.add.image(1000, 200, 'strawberry').setScale(0.1),
            this.add.image(1100, 200, 'strawberry').setScale(0.1),
            this.add.image(1200, 200, 'strawberry').setScale(0.1),
            this.add.image(300, 300, 'strawberry').setScale(0.1),
            this.add.image(400, 300, 'strawberry').setScale(0.1),
            this.add.image(500, 300, 'strawberry').setScale(0.1),
            this.add.image(600, 300, 'strawberry').setScale(0.1),
            this.add.image(700, 300, 'strawberry').setScale(0.1),
            this.add.image(800, 300, 'strawberry').setScale(0.1),
            this.add.image(900, 300, 'strawberry').setScale(0.1),
            this.add.image(1000, 300, 'strawberry').setScale(0.1),
            this.add.image(1100, 300, 'strawberry').setScale(0.1),
            this.add.image(1200, 300, 'strawberry').setScale(0.1),
        ];
        

        // Variabel untuk menghitung jumlah strawberry yang sudah terkumpul dan skor
        let strawberryTerkumpul = 0;
        let skor = 0;

        // Menambahkan musik latar
        const musikLatar = this.sound.add('gameBackground2');
        musikLatar.play({ loop: true });

        // Suara drag
        const suaraDrag = this.sound.add('dragSound');

        // Array untuk menyimpan strawberry kecil yang telah dimasukkan ke dalam keranjang
        let strawberryKecilArray = [];

        // Menetapkan setiap strawberry sebagai objek draggable
        strawberries.forEach(strawberry => {
            strawberry.setInteractive();
            strawberry.telahMasukKeranjang = false;
            this.input.setDraggable(strawberry);

            this.input.on('dragstart', (pointer, gameObject) => {
                if (gameObject.telahMasukKeranjang) {
                    gameObject.input.enabled = false;
                    return;
                }
                gameObject.setScale(0.10);
                suaraDrag.play();
            });

            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                if (gameObject.telahMasukKeranjang) return;
                gameObject.x = dragX;
                gameObject.y = dragY;
            });

            this.input.on('dragend', (pointer, gameObject) => {
                if (gameObject.telahMasukKeranjang) return;
                gameObject.setScale(0.1);

                const batasKeranjang = keranjang.getBounds();
                const batasStrawberry = gameObject.getBounds();

                if (Phaser.Geom.Intersects.RectangleToRectangle(batasStrawberry, batasKeranjang)) {
                    gameObject.telahMasukKeranjang = true;
                    strawberryTerkumpul++;
                    skor++;

                    gameObject.destroy();

                    for (let i = 0; i < strawberryTerkumpul; i++) {
                        const offsetX = (i % 5) * 30;
                        const offsetY = Math.floor(i / 5) * 25;
                        const posisi = { x: keranjang.x - 60 + offsetX, y: keranjang.y - 40 + offsetY };

                        const strawberryKecil = this.add.image(posisi.x, posisi.y, 'strawberry').setScale(0.1);
                        strawberryKecil.setAlpha(0.8);
                        strawberryKecilArray.push(strawberryKecil);
                    }
                } else {
                    gameObject.setPosition(gameObject.input.dragStartX, gameObject.input.dragStartY);
                }
            });
        });

        tombolBenar.on('pointerdown', () => {
            const isJawabanBenar = strawberryTerkumpul === 10;

            if (musikLatar.isPlaying) musikLatar.stop();

            if (isJawabanBenar) {
                this.sound.add('correctSound').play();
                this.scene.start('AnotherScene2', { strawberryTerkumpul, skor, isJawabanBenar: true });
            } else {
                this.sound.add('wrongSound').play();
                this.scene.start('AnotherScene2', { strawberryTerkumpul, skor, isJawabanBenar: false });
            }
        });

        // Tombol kembali
        const tombolKembali = this.add.text(100, 50, '<- Kembali', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#8B4513',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            align: 'center',
            borderRadius: 5
        }).setInteractive().setOrigin(0.5);

        tombolKembali.on('pointerdown', () => {
            musikLatar.stop();
            this.scene.start('LevelSelectionScene');
        });

        tombolKembali.on('pointerover', () => {
            tombolKembali.setStyle({ backgroundColor: '#6B3E2F' });
        });

        tombolKembali.on('pointerout', () => {
            tombolKembali.setStyle({ backgroundColor: '#8B4513' });
        });
    }
}

// Tombol Benar dan salah level 3
class AnotherScene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'AnotherScene2' });
    }

    create(data) {
        // Membuat latar belakang gradien warna pink ke hijau
        const graphics = this.add.graphics();
        const gradientRect = new Phaser.Geom.Rectangle(0, 0, 1360, 600);

        // Warna gradien latar belakang (dari pink ke hijau)
        graphics.fillGradientStyle(0xff69b4, 0xff69b4, 0x32cd32, 0x32cd32, 1);  // Pink ke Hijau
        graphics.fillRectShape(gradientRect);

        // Dekorasi menggunakan bentuk lingkaran warna-warni
        graphics.fillStyle(0xff1493, 1); // Warna pink lebih gelap
        graphics.fillCircle(300, 150, 70); // Lingkaran besar di kiri atas
        graphics.fillCircle(1060, 450, 70); // Lingkaran besar di kanan bawah

        graphics.fillStyle(0x98fb98, 1); // Warna hijau muda
        graphics.fillCircle(500, 100, 40); // Lingkaran kecil di kiri atas
        graphics.fillCircle(1200, 200, 50); // Lingkaran kecil di kanan atas

        // Tambahkan audio berdasarkan jawaban benar atau salah
        let audioToPlay;
        if (data.isJawabanBenar) {
            audioToPlay = this.sound.add('newAudio'); // Audio untuk jawaban benar
        } else {
            audioToPlay = this.sound.add('wrongSound'); // Audio untuk jawaban salah
        }
        audioToPlay.play(); // Mainkan audio

        // Teks utama
        if (data.isJawabanBenar) {
            this.add.text(680, 300, `🎉 Anda benar! 🎉\nJumlah strawberry: ${data.strawberryTerkumpul}\nPoin: ${data.skor}`, {
                fontSize: '36px',
                fontFamily: 'Comic Sans MS',
                fill: '#008000',
                align: 'center',
                stroke: '#fff',
                strokeThickness: 4,
            })
            .setOrigin(0.5)
            .setShadow(2, 2, '#000', 3);
        } else {
            this.add.text(680, 300, `❌ Jawaban salah! ❌\nJumlah strawberry: ${data.strawberryTerkumpul}\nPoin: ${data.skor}\nPetunjuk: Pastikan jawabannya dengan teliti`, {
                fontSize: '36px',
                fontFamily: 'Comic Sans MS',
                fill: '#ff0000',
                align: 'center',
                stroke: '#000',
                strokeThickness: 4,
            })
            .setOrigin(0.5);
        }

        // Membuat tombol "Kembali"
        const tombolGrafisKembali = this.add.graphics();
        const tombolLebarKembali = 150;
        const tombolTinggiKembali = 40;
        const tombolXKembali = 100;
        const tombolYKembali = 50;

        // Gambar latar belakang tombol "Kembali"
        tombolGrafisKembali.fillStyle(0x8B4513, 1);
        tombolGrafisKembali.fillRoundedRect(
            tombolXKembali - tombolLebarKembali / 2,
            tombolYKembali - tombolTinggiKembali / 2,
            tombolLebarKembali,
            tombolTinggiKembali,
            5
        );

        // Tambahkan teks di atas tombol "Kembali"
        const tombolTeksKembali = this.add.text(tombolXKembali, tombolYKembali, '<- Kembali', {
            fontSize: '18px',
            fontFamily: 'Arial',
            fill: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        // Event Listener untuk tombol "Kembali"
        tombolTeksKembali.on('pointerdown', () => {
            if (audioToPlay.isPlaying) {
                audioToPlay.stop(); // Hentikan audio
            }
            this.scene.start('NextScenelevel3'); // Kembali ke NextScenelevel3
        });

        // Hanya tambahkan tombol "Lanjutkan" jika jawaban benar
        if (data.isJawabanBenar) {
            const tombolGrafis = this.add.graphics();
            const tombolLebar = 200;
            const tombolTinggi = 50;

            const tombolX = this.cameras.main.width - tombolLebar - 3;
            const tombolY = this.cameras.main.height - 50;

            tombolGrafis.fillStyle(0x4CAF50, 1);
            tombolGrafis.fillRoundedRect(
                tombolX - tombolLebar / 2,
                tombolY - tombolTinggi / 2,
                tombolLebar,
                tombolTinggi,
                10
            );

            const tombolTeks = this.add.text(tombolX, tombolY, 'Lanjutkan', {
                fontSize: '24px',
                fontFamily: 'Arial',
                fill: '#ffffff',
            }).setOrigin(0.5).setInteractive();

            // Event Listener untuk tombol "Lanjutkan"
            tombolTeks.on('pointerdown', () => {
                if (audioToPlay.isPlaying) {
                    audioToPlay.stop(); // Hentikan audio
                }
                this.scene.start('NextScenelevel4'); // Pindah ke NextScenelevel4
            });
        }
    }
}

// Scene Level 4
class NextScenelevel4 extends Phaser.Scene {
    constructor() {
        super({ key: 'NextScenelevel4' });
    }

    create(data) {
        // Menambahkan background ke scene ini
        this.add.image(680, 300, 'backgroundNext').setDisplaySize(1360, 600);

        // Menambahkan teks pertanyaan ke scene
        this.add.text(680, 100, 'Berapakah 12 + 2?', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            fill: '#ff6347', // warna merah
            align: 'center',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5).setShadow(3, 3, '#FFA500', 5); // Bayangan warna orange

        // Menambahkan gambar keranjang
        const keranjang = this.add.image(100, 548, 'basket').setDisplaySize(200, 200).setOrigin(0.5);

        // Menambahkan tombol "Benar"
        const tombolBenar = this.add.text(250, 531, 'Benar', {
            fontSize: '28px',
            fontFamily: 'Arial',
            fill: '#fff',
            backgroundColor: '#4CAF50',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 20,
            align: 'center',
            stroke: '#3E8E41',
            strokeThickness: 4,
        }).setInteractive().setOrigin(0.5);

        // Membuat array berisi objek jeruk yang akan ditampilkan di scene
        const oranges = [
            this.add.image(300, 200, 'orange').setScale(0.3),
            this.add.image(400, 200, 'orange').setScale(0.3),
            this.add.image(500, 200, 'orange').setScale(0.3),
            this.add.image(600, 200, 'orange').setScale(0.3),
            this.add.image(700, 200, 'orange').setScale(0.3),
            this.add.image(800, 200, 'orange').setScale(0.3),
            this.add.image(900, 200, 'orange').setScale(0.3),
            this.add.image(1000, 200, 'orange').setScale(0.3),
            this.add.image(1100, 200, 'orange').setScale(0.3),
            this.add.image(1200, 200, 'orange').setScale(0.3),
            this.add.image(300, 300, 'orange').setScale(0.3),
            this.add.image(400, 300, 'orange').setScale(0.3),
            this.add.image(500, 300, 'orange').setScale(0.3),
            this.add.image(600, 300, 'orange').setScale(0.3),
            this.add.image(700, 300, 'orange').setScale(0.3),
            this.add.image(800, 300, 'orange').setScale(0.3),
            this.add.image(900, 300, 'orange').setScale(0.3),
            this.add.image(1000, 300, 'orange').setScale(0.3),
            this.add.image(1100, 300, 'orange').setScale(0.3),
            this.add.image(1200, 300, 'orange').setScale(0.3),
        ];

        let orangeTerkumpul = 0;
        let skor = 0;

        const musikLatar = this.sound.add('gameBackground2');
        musikLatar.play({ loop: true });

        const suaraDrag = this.sound.add('dragSound');
        let orangeKecilArray = [];

        oranges.forEach(orange => {
            orange.setInteractive();
            orange.telahMasukKeranjang = false;
            this.input.setDraggable(orange);

            this.input.on('dragstart', (pointer, gameObject) => {
                if (gameObject.telahMasukKeranjang) {
                    gameObject.input.enabled = false;
                    return;
                }
                gameObject.setScale(0.35);
                suaraDrag.play();
            });

            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                if (gameObject.telahMasukKeranjang) return;
                gameObject.x = dragX;
                gameObject.y = dragY;
            });

            this.input.on('dragend', (pointer, gameObject) => {
                if (gameObject.telahMasukKeranjang) return;
                gameObject.setScale(0.3);

                const batasKeranjang = keranjang.getBounds();
                const batasOrange = gameObject.getBounds();

                if (Phaser.Geom.Intersects.RectangleToRectangle(batasOrange, batasKeranjang)) {
                    gameObject.telahMasukKeranjang = true;
                    orangeTerkumpul++;
                    skor++;

                    gameObject.destroy();

                    for (let i = 0; i < orangeTerkumpul; i++) {
                        const offsetX = (i % 5) * 30;
                        const offsetY = Math.floor(i / 5) * 25;
                        const posisi = { x: keranjang.x - 60 + offsetX, y: keranjang.y - 40 + offsetY };

                        const orangeKecil = this.add.image(posisi.x, posisi.y, 'orange').setScale(0.2);
                        orangeKecil.setAlpha(0.8);
                        orangeKecilArray.push(orangeKecil);
                    }
                } else {
                    gameObject.setPosition(gameObject.input.dragStartX, gameObject.input.dragStartY);
                }
            });
        });

        tombolBenar.on('pointerdown', () => {
            const isJawabanBenar = orangeTerkumpul === 14; // Cek jumlah jeruk yang terkumpul
        
            if (musikLatar.isPlaying) musikLatar.stop();
        
            if (isJawabanBenar) {
                this.sound.add('correctSound').play();
                // Kirim data yang benar ke AnotherScene4
                this.scene.start('AnotherScene4', { orangeTerkumpul, skor, isJawabanBenar: true });
            } else {
                this.sound.add('wrongSound').play();
                // Kirim data yang salah ke AnotherScene4
                this.scene.start('AnotherScene4', { orangeTerkumpul, skor, isJawabanBenar: false });
            }
        });
        
        
        
        // Tombol kembali
        const tombolKembali = this.add.text(100, 50, '<- Kembali', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#8B4513',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            align: 'center',
            borderRadius: 5,
        }).setInteractive().setOrigin(0.5);

        tombolKembali.on('pointerdown', () => {
            musikLatar.stop();
            this.scene.start('LevelSelectionScene');
        });

        tombolKembali.on('pointerover', () => {
            tombolKembali.setStyle({ backgroundColor: '#6B3E2F' });
        });

        tombolKembali.on('pointerout', () => {
            tombolKembali.setStyle({ backgroundColor: '#8B4513' });
        });
    }
}

// Tombol Benar dan salah level 4
class AnotherScene4 extends Phaser.Scene {
    constructor() {
        super({ key: 'AnotherScene4' });
    }

    init(data) {
        // Menerima data yang dikirim dari scene sebelumnya
        this.orangeTerkumpul = data.orangeTerkumpul;
        this.skor = data.skor;
        this.isJawabanBenar = data.isJawabanBenar;
    }

    create() {
        // Membuat latar belakang gradien warna hijau ke kuning
        const graphics = this.add.graphics();
        const gradientRect = new Phaser.Geom.Rectangle(0, 0, 1360, 600);

        // Warna gradien latar belakang (dari hijau ke kuning)
        graphics.fillGradientStyle(0x32cd32, 0x32cd32, 0xffff00, 0xffff00, 1);  // Hijau ke Kuning
        graphics.fillRectShape(gradientRect);

        // Dekorasi menggunakan bentuk lingkaran warna oranye
        graphics.fillStyle(0xffa500, 1); // Warna oranye
        graphics.fillCircle(300, 150, 70); // Lingkaran besar di kiri atas
        graphics.fillCircle(1060, 450, 70); // Lingkaran besar di kanan bawah

        graphics.fillStyle(0xffd700, 1); // Warna kuning
        graphics.fillCircle(500, 100, 40); // Lingkaran kecil di kiri atas
        graphics.fillCircle(1200, 200, 50); // Lingkaran kecil di kanan atas

        // Menentukan audio berdasarkan jawaban benar atau salah
        let audioToPlay;
        if (this.isJawabanBenar) {
            audioToPlay = this.sound.add('newAudio'); // Audio untuk jawaban benar
        } else {
            audioToPlay = this.sound.add('wrongSound'); // Audio untuk jawaban salah
        }
        audioToPlay.play(); // Mainkan audio

        // Teks utama yang menunjukkan hasil
        if (this.isJawabanBenar) {
            this.add.text(680, 300, `🎉 Anda benar! 🎉\nJumlah jeruk: ${this.orangeTerkumpul}\nPoin: ${this.skor}`, {
                fontSize: '36px',
                fontFamily: 'Comic Sans MS',
                fill: '#008000',
                align: 'center',
                stroke: '#fff',
                strokeThickness: 4,
            })
            .setOrigin(0.5)
            .setShadow(2, 2, '#000', 3);
        } else {
            this.add.text(680, 300, `❌ Jawaban salah! ❌\nJumlah jeruk: ${this.orangeTerkumpul}\nPoin: ${this.skor}\nPetunjuk: Pastikan jawabannya dengan teliti`, {
                fontSize: '36px',
                fontFamily: 'Comic Sans MS',
                fill: '#ff0000',
                align: 'center',
                stroke: '#000',
                strokeThickness: 4,
            })
            .setOrigin(0.5);
        }

        // Membuat tombol "Kembali"
        const tombolGrafisKembali = this.add.graphics();
        const tombolLebarKembali = 150;
        const tombolTinggiKembali = 40;
        const tombolXKembali = 100;
        const tombolYKembali = 50;

        // Gambar latar belakang tombol "Kembali"
        tombolGrafisKembali.fillStyle(0x8B4513, 1);
        tombolGrafisKembali.fillRoundedRect(
            tombolXKembali - tombolLebarKembali / 2,
            tombolYKembali - tombolTinggiKembali / 2,
            tombolLebarKembali,
            tombolTinggiKembali,
            5
        );

        // Tambahkan teks di atas tombol "Kembali"
        const tombolTeksKembali = this.add.text(tombolXKembali, tombolYKembali, '<- Kembali', {
            fontSize: '18px',
            fontFamily: 'Arial',
            fill: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        // Event Listener untuk tombol "Kembali"
        tombolTeksKembali.on('pointerdown', () => {
            if (audioToPlay.isPlaying) {
                audioToPlay.stop(); // Hentikan audio jika masih diputar
            }
            this.scene.start('NextScenelevel4'); // Kembali ke scene sebelumnya
        });

        // Tombol "Lanjutkan" hanya tampil jika jawaban benar
        if (this.isJawabanBenar) {
            const tombolGrafis = this.add.graphics();
            const tombolLebar = 200;
            const tombolTinggi = 50;
            const tombolX = this.cameras.main.width - tombolLebar - 3;
            const tombolY = this.cameras.main.height - 50;

            tombolGrafis.fillStyle(0x4CAF50, 1);
            tombolGrafis.fillRoundedRect(
                tombolX - tombolLebar / 2,
                tombolY - tombolTinggi / 2,
                tombolLebar,
                tombolTinggi,
                10
            );

            const tombolTeks = this.add.text(tombolX, tombolY, 'Lanjutkan', {
                fontSize: '24px',
                fontFamily: 'Arial',
                fill: '#ffffff',
            }).setOrigin(0.5).setInteractive();

            // Event Listener untuk tombol "Lanjutkan"
            tombolTeks.on('pointerdown', () => {
                if (audioToPlay.isPlaying) {
                    audioToPlay.stop(); // Hentikan audio jika masih diputar
                }
                this.scene.start('NextScenelevel5'); // Pindah ke NextScenelevel4
            });
        }
    }
}

// Scene Level 5
class NextScenelevel5 extends Phaser.Scene {
    constructor() {
        super({ key: 'NextScenelevel5' });
    }

    create(data) {
        // Menambahkan background ke scene ini
        this.add.image(680, 300, 'backgroundNext').setDisplaySize(1360, 600);

        // Menambahkan teks pertanyaan ke scene
        this.add.text(680, 100, 'Berapakah 10 + 10?', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            fill: '#ff6347', // warna merah
            align: 'center',
            stroke: '#000',
            strokeThickness: 4,
        }).setOrigin(0.5).setShadow(3, 3, '#32CD32', 5);

        // Menambahkan gambar keranjang
        const keranjang = this.add.image(100, 548, 'basket').setDisplaySize(200, 200).setOrigin(0.5);

        // Menambahkan tombol "Benar"
        const tombolBenar = this.add.text(250, 531, 'Benar', {
            fontSize: '28px',
            fontFamily: 'Arial',
            fill: '#fff',
            backgroundColor: '#4CAF50',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 20,
            align: 'center',
            stroke: '#3E8E41',
            strokeThickness: 4,
        }).setInteractive().setOrigin(0.5);

        // Membuat array berisi objek mangga yang akan ditampilkan di scene
        const mangos = [
            this.add.image(300, 200, 'mango').setScale(0.1),
            this.add.image(400, 200, 'mango').setScale(0.1),
            this.add.image(500, 200, 'mango').setScale(0.1),
            this.add.image(600, 200, 'mango').setScale(0.1),
            this.add.image(700, 200, 'mango').setScale(0.1),
            this.add.image(800, 200, 'mango').setScale(0.1),
            this.add.image(900, 200, 'mango').setScale(0.1),
            this.add.image(1000, 200, 'mango').setScale(0.1),
            this.add.image(1100, 200, 'mango').setScale(0.1),
            this.add.image(1200, 200, 'mango').setScale(0.1),
            this.add.image(300, 300, 'mango').setScale(0.1),
            this.add.image(400, 300, 'mango').setScale(0.1),
            this.add.image(500, 300, 'mango').setScale(0.1),
            this.add.image(600, 300, 'mango').setScale(0.1),
            this.add.image(700, 300, 'mango').setScale(0.1),
            this.add.image(800, 300, 'mango').setScale(0.1),
            this.add.image(900, 300, 'mango').setScale(0.1),
            this.add.image(1000, 300, 'mango').setScale(0.1),
            this.add.image(1100, 300, 'mango').setScale(0.1),
            this.add.image(1200, 300, 'mango').setScale(0.1),
        ];

        let mangoTerkumpul = 0;
        let skor = 0;

        const musikLatar = this.sound.add('gameBackground2');
        musikLatar.play({ loop: true });

        const suaraDrag = this.sound.add('dragSound');
        let mangoKecilArray = [];

        mangos.forEach(mango => {
            mango.setInteractive();
            mango.telahMasukKeranjang = false;
            this.input.setDraggable(mango);

            this.input.on('dragstart', (pointer, gameObject) => {
                if (gameObject.telahMasukKeranjang) {
                    gameObject.input.enabled = false;
                    return;
                }
                gameObject.setScale(0.10);
                suaraDrag.play();
            });

            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                if (gameObject.telahMasukKeranjang) return;
                gameObject.x = dragX;
                gameObject.y = dragY;
            });

            this.input.on('dragend', (pointer, gameObject) => {
                if (gameObject.telahMasukKeranjang) return;
                gameObject.setScale(0.1);

                const batasKeranjang = keranjang.getBounds();
                const batasMango = gameObject.getBounds();

                if (Phaser.Geom.Intersects.RectangleToRectangle(batasMango, batasKeranjang)) {
                    gameObject.telahMasukKeranjang = true;
                    mangoTerkumpul++;
                    skor++;

                    gameObject.destroy();

                    for (let i = 0; i < mangoTerkumpul; i++) {
                        const offsetX = (i % 5) * 30;
                        const offsetY = Math.floor(i / 5) * 25;
                        const posisi = { x: keranjang.x - 60 + offsetX, y: keranjang.y - 40 + offsetY };
                        const mangoKecil = this.add.image(posisi.x, posisi.y, 'mango').setScale(0.1);
                        mangoKecil.setAlpha(0.8);
                        mangoKecilArray.push(mangoKecil);
                    }
                } else {
                    gameObject.setPosition(gameObject.input.dragStartX, gameObject.input.dragStartY);
                }
            });
        });

        tombolBenar.on('pointerdown', () => {
            const isJawabanBenar = mangoTerkumpul === 20; // Pastikan 20 mangga terkumpul

            if (musikLatar.isPlaying) musikLatar.stop();

            if (isJawabanBenar) {
                this.sound.add('correctSound').play();
                // Hanya pindah ke CongratulationsScene jika 20 mangga terkumpul
                this.scene.start('AnotherScene3', { mangoTerkumpul, skor, isJawabanBenar: true });
            } else {
                this.sound.add('wrongSound').play();
                this.scene.start('AnotherScene3', { mangoTerkumpul, skor, isJawabanBenar: false });
            }
        });

        const tombolKembali = this.add.text(100, 50, '<- Kembali', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#8B4513',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            align: 'center',
            borderRadius: 5,
        }).setInteractive().setOrigin(0.5);

        tombolKembali.on('pointerdown', () => {
            musikLatar.stop();
            this.scene.start('LevelSelectionScene');
        });

        tombolKembali.on('pointerover', () => {
            tombolKembali.setStyle({ backgroundColor: '#6B3E2F' });
        });

        tombolKembali.on('pointerout', () => {
            tombolKembali.setStyle({ backgroundColor: '#8B4513' });
        });
    }
}

// Tombol Benar dan salah level 5
class AnotherScene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'AnotherScene3' });
    }

    init(data) {
        // Menerima data yang dikirim dari scene sebelumnya
        this.mangoTerkumpul = data.mangoTerkumpul;
        this.skor = data.skor;
        this.isJawabanBenar = data.isJawabanBenar;
    }

    create() {
        // Membuat latar belakang gradien warna hijau ke kuning
        const graphics = this.add.graphics();
        const gradientRect = new Phaser.Geom.Rectangle(0, 0, 1360, 600);

        // Warna gradien latar belakang (dari hijau ke kuning)
        graphics.fillGradientStyle(0x32cd32, 0x32cd32, 0xffff00, 0xffff00, 1);  // Hijau ke Kuning
        graphics.fillRectShape(gradientRect);

        // Dekorasi menggunakan bentuk lingkaran warna hijau dan kuning
        graphics.fillStyle(0x32cd32, 1); // Warna hijau
        graphics.fillCircle(300, 150, 70); // Lingkaran besar di kiri atas
        graphics.fillCircle(1060, 450, 70); // Lingkaran besar di kanan bawah

        graphics.fillStyle(0xffff00, 1); // Warna kuning
        graphics.fillCircle(500, 100, 40); // Lingkaran kecil di kiri atas
        graphics.fillCircle(1200, 200, 50); // Lingkaran kecil di kanan atas

        // Menentukan audio berdasarkan jawaban benar atau salah
        let audioToPlay;
        if (this.isJawabanBenar) {
            audioToPlay = this.sound.add('newAudio'); // Audio untuk jawaban benar
        } else {
            audioToPlay = this.sound.add('wrongSound'); // Audio untuk jawaban salah
        }
        audioToPlay.play(); // Mainkan audio

        // Teks utama yang menunjukkan hasil
        if (this.isJawabanBenar) {
            this.add.text(680, 300, `🎉 Anda benar! 🎉\nJumlah mangga: ${this.mangoTerkumpul}\nPoin: ${this.skor}`, {
                fontSize: '36px',
                fontFamily: 'Comic Sans MS',
                fill: '#008000', // Hijau
                align: 'center',
                stroke: '#fff',
                strokeThickness: 4,
            })
            .setOrigin(0.5)
            .setShadow(2, 2, '#000', 3);
        } else {
            this.add.text(680, 300, `❌ Jawaban salah! ❌\nJumlah mangga: ${this.mangoTerkumpul}\nPoin: ${this.skor}\nPetunjuk: Pastikan jawabannya dengan teliti`, {
                fontSize: '36px',
                fontFamily: 'Comic Sans MS',
                fill: '#ff0000', // Merah
                align: 'center',
                stroke: '#000',
                strokeThickness: 4,
            })
            .setOrigin(0.5);
        }

        // Membuat tombol "Kembali"
        const tombolGrafisKembali = this.add.graphics();
        const tombolLebarKembali = 150;
        const tombolTinggiKembali = 40;
        const tombolXKembali = 100;
        const tombolYKembali = 50;

        // Gambar latar belakang tombol "Kembali"
        tombolGrafisKembali.fillStyle(0x8B4513, 1);
        tombolGrafisKembali.fillRoundedRect(
            tombolXKembali - tombolLebarKembali / 2,
            tombolYKembali - tombolTinggiKembali / 2,
            tombolLebarKembali,
            tombolTinggiKembali,
            5
        );

        // Tambahkan teks di atas tombol "Kembali"
        const tombolTeksKembali = this.add.text(tombolXKembali, tombolYKembali, '<- Kembali', {
            fontSize: '18px',
            fontFamily: 'Arial',
            fill: '#ffffff',
        }).setOrigin(0.5).setInteractive();

        // Event Listener untuk tombol "Kembali"
        tombolTeksKembali.on('pointerdown', () => {
            if (audioToPlay.isPlaying) {
                audioToPlay.stop(); // Hentikan audio jika masih diputar
            }
            this.scene.start('NextScenelevel5'); // Kembali ke scene sebelumnya
        });

        // Tombol "Lanjutkan" hanya tampil jika jawaban benar
        if (this.isJawabanBenar) {
            const tombolGrafis = this.add.graphics();
            const tombolLebar = 200;
            const tombolTinggi = 50;
            const tombolX = this.cameras.main.width - tombolLebar - 3;
            const tombolY = this.cameras.main.height - 50;

            tombolGrafis.fillStyle(0x4CAF50, 1); // Warna hijau
            tombolGrafis.fillRoundedRect(
                tombolX - tombolLebar / 2,
                tombolY - tombolTinggi / 2,
                tombolLebar,
                tombolTinggi,
                10
            );

            const tombolTeks = this.add.text(tombolX, tombolY, 'Lanjutkan', {
                fontSize: '24px',
                fontFamily: 'Arial',
                fill: '#ffffff',
            }).setOrigin(0.5).setInteractive();

            // Event Listener untuk tombol "Lanjutkan"
            tombolTeks.on('pointerdown', () => {
                if (audioToPlay.isPlaying) {
                    audioToPlay.stop(); // Hentikan audio jika masih diputar
                }
                this.scene.start('CongratulationsScene'); // Pindah ke NextScenelevel4
            });
        }
    }
}

//setlah permainan beres akan ke sini 
class CongratulationsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CongratulationsScene' });
        this.successSound = null;
    }

    preload() {
        this.load.audio('successSound', 'assets/success.mp3');
        this.load.image('backgroundCongratulations', 'assets/backgroundCongratulations.jpg');
    }

    create(data) {
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        this.add.image(screenWidth / 2, screenHeight / 2, 'backgroundCongratulations').setDisplaySize(screenWidth, screenHeight);

        // Memutar audio sukses
        this.successSound = this.sound.add('successSound', { volume: 0.7 });
        this.successSound.play();

        // Teks utama
        const message = `🎉 Selamat! Kamu telah berhasil 
        melewati beberapa tantangan game ini.`;

        this.add.text(screenWidth / 2, screenHeight / 2 - 50, message, {
            fontSize: '28px',
            fontFamily: 'Arial',
            fill: '#fff',
            align: 'center',
            stroke: '#000',
            strokeThickness: 4,
            wordWrap: { width: screenWidth - 100, useAdvancedWrap: true },
        }).setOrigin(0.5);

        // Tombol Lanjutkan ke Halaman Berikutnya
        const tombolLanjutkan = this.add.text(screenWidth / 2, screenHeight / 2 + 50, 'Lanjutkan ke Halaman Berikutnya', {
            fontSize: '32px',
            fontFamily: 'Arial',
            fill: '#fff',
            backgroundColor: '#32cd32',
            stroke: '#228B22',
            strokeThickness: 4,
            align: 'center',
            padding: { top: 10, bottom: 10, left: 20, right: 20 },
        }).setOrigin(0.5).setInteractive();

        tombolLanjutkan.on('pointerdown', () => {
            this.scene.start('CreditScene1'); // Ganti 'NextPageScene' dengan scene yang sesuai
        });

        // Tombol Kembali ke Menu Utama
        const tombolKembali = this.add.text(screenWidth / 2, screenHeight / 2 + 120, 'Kembali ke Menu Utama', {
            fontSize: '32px',
            fontFamily: 'Arial',
            fill: '#fff',
            backgroundColor: '#ff6347',
            stroke: '#8B0000',
            strokeThickness: 4,
            align: 'center',
            padding: { top: 10, bottom: 10, left: 20, right: 20 },
        }).setOrigin(0.5).setInteractive();

        tombolKembali.on('pointerdown', () => {
            this.scene.start('MainScene'); // Kembali ke Menu Utama
        });

        // Hentikan audio saat scene ditutup
        this.events.on('shutdown', () => {
            if (this.successSound) {
                this.successSound.stop();
                this.successSound.destroy();
            }
        });
    }
}

//set credit 
class CreditScene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditScene1' });
        this.bgMusic = null;
    }

    preload() {
        this.load.image('backgroundedit1', 'assets/backgroudcreadit1.jpg');

        // Hanya preload audio jika belum dimuat
        if (!this.sound.get('bgMusicGlobal')) {
            this.load.audio('bgMusicGlobal', 'assets/backgroundMusic1.mp3');
        }
    }

    create() {
        this.add.image(680, 300, 'backgroundedit1').setDisplaySize(1360, 600);

        // Putar musik hanya jika belum diputar
        if (!this.sound.get('bgMusicGlobal')) {
            this.bgMusic = this.sound.add('bgMusicGlobal', { loop: true, volume: 0.5 });
            this.bgMusic.play();
        } else {
            this.bgMusic = this.sound.get('bgMusicGlobal');
        }

        const tombolLanjutkan = this.add.text(200, 550, 'Lanjutkan', {
            fontSize: '24px',
            fontFamily: 'Arial',
            fill: '#FFFFFF',
            backgroundColor: '#4CAF50',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
        }).setInteractive().setOrigin(0.5);

        tombolLanjutkan.on('pointerdown', () => {
            this.scene.start('CreditScene2');
        });
    }
}

class CreditScene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditScene2' });
        this.bgMusic = null;
    }

    preload() {
        this.load.image('backgroundedit2', 'assets/backgroudcreadit2.jpg');
    }

    create() {
        this.add.image(680, 300, 'backgroundedit2').setDisplaySize(1360, 600);

        this.bgMusic = this.sound.get('bgMusicGlobal');

        const tombolLanjutkan = this.add.text(200, 550, 'Lanjutkan', {
            fontSize: '24px',
            fontFamily: 'Arial',
            fill: '#FFFFFF',
            backgroundColor: '#4CAF50',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
        }).setInteractive().setOrigin(0.5);

        tombolLanjutkan.on('pointerdown', () => {
            this.scene.start('CreditScene3');
        });

        const tombolKembali = this.add.text(1160, 550, 'Kembali', {
            fontSize: '24px',
            fontFamily: 'Arial',
            fill: '#FFFFFF',
            backgroundColor: '#F44336',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
        }).setInteractive().setOrigin(0.5);

        tombolKembali.on('pointerdown', () => {
            this.scene.start('CreditScene1');
        });
    }
}

class CreditScene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditScene3' });
        this.bgMusic = null;
    }

    preload() {
        this.load.image('backgroundedit3', 'assets/backgroudcreadit3.jpg');
    }

    create() {
        this.add.image(680, 300, 'backgroundedit3').setDisplaySize(1360, 600);

        this.bgMusic = this.sound.get('bgMusicGlobal');

        const tombolKembaliKeMain = this.add.text(200, 550, 'Kembali ke Menu Utama', {
            fontSize: '24px',
            fontFamily: 'Arial',
            fill: '#FFFFFF',
            backgroundColor: '#4CAF50',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
        }).setInteractive().setOrigin(0.5);

        tombolKembaliKeMain.on('pointerdown', () => {
            if (this.bgMusic) {
                this.bgMusic.stop();
                this.bgMusic.destroy();
            }
            this.scene.start('MainScene');
        });

        const tombolKembali = this.add.text(1160, 550, 'Kembali', {
            fontSize: '24px',
            fontFamily: 'Arial',
            fill: '#FFFFFF',
            backgroundColor: '#F44336',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
        }).setInteractive().setOrigin(0.5);

        tombolKembali.on('pointerdown', () => {
            this.scene.start('CreditScene2');
        });
    }
}

// Membuat game
const config = {
    type: Phaser.AUTO,
    width: 1360,
    height: 600,
    scene: [MainScene, LevelSelectionScene, NextScene, AnotherScene, NextScenelevel2, AnotherScene1, NextScenelevel3,  AnotherScene2, NextScenelevel4, AnotherScene3, NextScenelevel5, AnotherScene4,  CongratulationsScene, CreditScene1, CreditScene2, CreditScene3 ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);