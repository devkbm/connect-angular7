import { Component, OnInit } from '@angular/core';
import { ArticleGridComponent } from './article-grid.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  selectedBoard;

  constructor() { }

  ngOnInit() {
  }

  setBoardSelect(item, grid: ArticleGridComponent) {
    this.selectedBoard = item;
    grid.getArticleList(item);
  }

}
