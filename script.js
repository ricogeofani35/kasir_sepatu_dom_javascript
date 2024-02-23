const { createApp } = Vue

let id = 0;
let id_penjualan = 0;

createApp({
  data() {
    return {
        barangs: [
            {id: id++, img: 'sepatu.jpg', nama: 'kitacho', stock: 120, harga: 12000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'sasa b kentaki', stock: 150, harga: 22000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'mama suka', stock: 10, harga: 10000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'elips hitam', stock: 20, harga: 11000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'marjan melon', stock: 220, harga: 15000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'marjan jeruk', stock: 320, harga: 13000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'gatsbay parfum', stock: 20, harga: 52000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'indomie goreng', stock: 180, harga: 3000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'kitacho', stock: 120, harga: 12000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'sasa b kentaki', stock: 150, harga: 22000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'mama suka', stock: 10, harga: 10000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'elips hitam', stock: 20, harga: 11000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'marjan melon', stock: 220, harga: 15000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'marjan jeruk', stock: 320, harga: 13000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'gatsbay parfum', stock: 20, harga: 52000, qty: 0},
            {id: id++, img: 'sepatu.jpg', nama: 'indomie goreng', stock: 180, harga: 3000, qty: 0},
        ],
        transaksi: [],
        penjualan: [],
        total_bayar: 0,
        bayar: 0,
        diskon: 0,
        idDetail: 0
    }
  },
  methods: {
    laporanAction() {
        let kasirWrapper = this.$el.querySelector('.kasir-wrapper');
        let transaksiWrapper = this.$el.querySelector('.transaksi-wrapper');
        let laporanWrapper = this.$refs.laporanWrapper;

        kasirWrapper.classList.add('hide');
        transaksiWrapper.classList.add('hide');
        laporanWrapper.classList.remove('hide');
    },
    kasirAction() {
        let kasirWrapper = this.$el.querySelector('.kasir-wrapper');
        let transaksiWrapper = this.$el.querySelector('.transaksi-wrapper');
        let laporanWrapper = this.$refs.laporanWrapper;

        kasirWrapper.classList.remove('hide');
        transaksiWrapper.classList.remove('hide');
        laporanWrapper.classList.add('hide');
    },
    beli(id) {
        return `beli${id}`;
    },
    editIcon(id) {
        return `editIcon${id}`;
    },
    addTransaksi(barang, event) {

        // jika data array tidak ada di array transaksi
        if (this.transaksi.indexOf(barang) === -1) { //menelusuri data array yang pertama
            this.transaksi.push(barang); //jika true

            event.target.parentElement.classList.add('hide');
            
            // total bayar
            this.totalBayar(barang);

        } else {
            //jika false
            event.target.parentElement.classList.add('hide');

            let editIcon = document.querySelector(`.editIcon${barang.id}`);

            console.log(editIcon);

            editIcon.parentElement.classList.toggle('hide');

           this.totalBayar(barang);
        }
    },
    editTransaksi(tran, event) {
        let buy = document.querySelector(`.beli${tran.id}`);

        buy.classList.remove('hide');

        event.target.parentElement.classList.toggle('hide');

        let subTotal = tran.qty * tran.harga;

        this.total_bayar -= subTotal;
        return this.total_bayar
        
    },
    hapusTransaksi(tran) {
        this.transaksi = this.transaksi.filter((t) => t !== tran );

        let buy = document.querySelector(`.beli${tran.id}`);
        buy.classList.toggle('hide');

        let subTotal = tran.qty * tran.harga;

        this.total_bayar -= subTotal;

        tran.qty = 0;

        return this.total_bayar
    },
    totalBayar(barang) {

        let subTotal = barang.qty * barang.harga;

        this.total_bayar += subTotal;
    },
    checkout() {

        if(this.transaksi.length === 0) {
            alert('data masih kosong!');
            return;
        }

        if(this.bayar < this.totalStlhDiskon) {
            alert('bayar tidak cukup!');
            return;
        }

        this.penjualan.push(
                {
                    id: id_penjualan++, 
                    kode: '000' + id_penjualan,
                    barang: this.transaksi, 
                    total: this.total_bayar, 
                    bayar: this.bayar,
                    diskon: this.diskon
                }
            );


        for(let i = 0; i < this.penjualan.length; i++) {
            if(i == (this.penjualan.length - 1)) {
                alert('------------Kode transaksi: ' + this.penjualan[i].kode + '-------------');
            }
        }

        this.transaksi.forEach(tran => {
            let buy = document.querySelector(`.beli${tran.id}`);
            buy.classList.toggle('hide');            

            tran.qty = 0;
        });

        this.transaksi = [];
        this.total_bayar = 0;
        this.bayar = 0;
        this.diskon = 0;

    },
    showModalDetail(id) {
       this.idDetail = id;

       console.log(this.idDetail);
    }
  },
  computed: {
    kembalian() {
       
        return this.bayar - this.totalStlhDiskon;

    }, 
    totalStlhDiskon() {

        if(this.diskon > 100) {
            alert('diskon maks 100');
            return;
        }
        
        let diskon = (this.total_bayar * this.diskon ) / 100;

        return this.total_bayar - diskon;
    }
  }



}).mount('#app')