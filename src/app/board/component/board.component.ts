import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleGridComponent } from './article-grid.component';
import { BoardFormComponent } from './board-form.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  drawerVisible = false;

  selectedBoard;

  @ViewChild('boardForm')
  boardForm: BoardFormComponent;

  constructor() { }

  ngOnInit() {
  }

  setBoardSelect(item, grid: ArticleGridComponent) {
    this.selectedBoard = item;
    grid.getArticleList(item);
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

}
