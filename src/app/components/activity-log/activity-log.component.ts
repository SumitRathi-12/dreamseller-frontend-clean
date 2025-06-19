/*
import { Component, OnInit } from '@angular/core';
import { ActivityLogService } from '../../services/activity-log.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  logs: any[] = [];

  constructor(private activityLogService: ActivityLogService) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs() {
    this.activityLogService.getLogs().subscribe(
        (data) => {
          this.logs = data;
        },
        (error) => {
          console.error('Error fetching activity logs:', error);
        }
    );
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { ActivityLogService } from '../../services/activity-log.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  logs: any[] = [];
  jsonLdScript: SafeHtml | null = null;

  constructor(
      private activityLogService: ActivityLogService,
      private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs() {
    this.activityLogService.getLogs().subscribe(
        (data) => {
          this.logs = data;
          this.generateJsonLd(); // Generate JSON-LD after logs are fetched
        },
        (error) => {
          console.error('Error fetching activity logs:', error);
        }
    );
  }

  generateJsonLd() {
    const actions = this.logs.map(log => ({
      "@type": "Action",
      "actionStatus": log.action,
      "startTime": log.timestamp,
      "agent": {
        "@type": "Person",
        "email": log.email
      }
    }));

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": actions
    };

    this.jsonLdScript = this.sanitizer.bypassSecurityTrustHtml(
        `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    );
  }
}
