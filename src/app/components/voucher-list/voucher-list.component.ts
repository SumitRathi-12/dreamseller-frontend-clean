
/*
import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../services/voucher.service';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.css']
})
export class VoucherListComponent implements OnInit {
  vouchers: any[] = [];
  newVoucher = {
    activityType: '',
    category: '',
    description: '',
    expiryDate: '',
    price: 0,
    title: ''
  };

  constructor(private voucherService: VoucherService) {}

  ngOnInit(): void {
    this.fetchVouchers();
  }

  fetchVouchers() {
    this.voucherService.getVouchers().subscribe(
        (data) => {
          this.vouchers = data;
        },
        (error) => {
          console.error('Error fetching vouchers:', error);
        }
    );
  }

  addVoucher() {
    // Call the service to save the new voucher
    this.voucherService.addVoucher(this.newVoucher).subscribe(
        (response) => {
          // Add new voucher to the list
          this.vouchers.push(response);
          // Reset form
          this.newVoucher = {
            activityType: '',
            category: '',
            description: '',
            expiryDate: '',
            price: 0,
            title: ''
          };
        },
        (error) => {
          console.error('Error adding voucher:', error);
        }
    );
  }
}


*/


import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../services/voucher.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-voucher-list',
    templateUrl: './voucher-list.component.html',
    styleUrls: ['./voucher-list.component.css']
})
export class VoucherListComponent implements OnInit {
    vouchers: any[] = [];
    newVoucher = {
        activityType: '',
        category: '',
        description: '',
        expiryDate: '',
        price: 0,
        title: ''
    };
    jsonLdScript: SafeHtml | null = null;

    constructor(
        private voucherService: VoucherService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.fetchVouchers();
    }

    fetchVouchers() {
        this.voucherService.getVouchers().subscribe(
            (data) => {
                this.vouchers = data;
                this.generateJsonLd();
            },
            (error) => {
                console.error('Error fetching vouchers:', error);
            }
        );
    }

    addVoucher() {
        this.voucherService.addVoucher(this.newVoucher).subscribe(
            (response) => {
                this.vouchers.push(response);
                this.generateJsonLd(); // regenerate JSON-LD after adding
                this.newVoucher = {
                    activityType: '',
                    category: '',
                    description: '',
                    expiryDate: '',
                    price: 0,
                    title: ''
                };
            },
            (error) => {
                console.error('Error adding voucher:', error);
            }
        );
    }

    generateJsonLd() {
        const offers = this.vouchers.map(v => ({
            "@type": "Offer",
            "name": v.title,
            "description": v.description,
            "category": v.category,
            "price": v.price,
            "priceCurrency": "USD", // or appropriate currency
            "validThrough": v.expiryDate
        }));

        const jsonLd = {
            "@context": "https://schema.org",
            "@graph": offers
        };

        this.jsonLdScript = this.sanitizer.bypassSecurityTrustHtml(
            `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
        );
    }
}
