import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  stats: any = {};

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.statisticsService.getStatistics().subscribe(
        (data) => {
          this.stats = data;
        },
        (error) => {
          console.error('Error fetching statistics:', error);
        }
    );
  }
}
